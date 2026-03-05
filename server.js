import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ElevenLabsClient } from 'elevenlabs';
// import Anthropic from '@anthropic-ai/sdk';
import { OpenRouter } from '@openrouter/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY || '';
const elevenlabs = ELEVEN_API_KEY ? new ElevenLabsClient({ apiKey: ELEVEN_API_KEY }) : null;

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-lite-preview-02-05:free';
const DEFAULT_VOICE_ID = process.env.ELEVEN_DEFAULT_VOICE_ID || 'weA4Q36twV5kwSaTEL0Q';

// Initialize OpenRouter client
const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.post('/ai/messages', async (req, res) => {
  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const completion = await openrouter.chat.send({
      model: OPENROUTER_MODEL,
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ]
    });

    const content = completion?.choices?.[0]?.message?.content || '';

    if (!content) {
      console.warn('Empty content received from OpenRouter');
      return res.status(502).json({ error: 'OpenRouter empty response' });
    }

    return res.json({
      content: [{ text: content }]
    });
  } catch (err) {
    console.error('OpenRouter Error:', err);
    return res.status(502).json({ error: 'OpenRouter upstream error' });
  }
});

app.post('/tts', async (req, res) => {
  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  const voiceId = typeof req.body?.voiceId === 'string' && req.body.voiceId.trim()
    ? req.body.voiceId.trim()
    : DEFAULT_VOICE_ID;
  const modelId = typeof req.body?.modelId === 'string' && req.body.modelId.trim()
    ? req.body.modelId.trim()
    : 'eleven_multilingual_v2';

  if (!text) return res.status(400).json({ error: 'Missing text' });
  if (!elevenlabs) return res.status(500).json({ error: 'Missing ELEVEN_API_KEY' });

  try {
    const audioStream = await elevenlabs.generate({
      voice: voiceId,
      text,
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true
      }
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of audioStream) {
      res.write(chunk);
    }
    res.end();
  } catch (err) {
    const status = err?.statusCode || 500;
    const detail = err?.response?.data || err?.message || 'Unknown error';
    res.status(status).json({ error: 'ElevenLabs error', detail });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════════════╗`);
  console.log(`║   CHRONOS — Máquina do Tempo             ║`);
  console.log(`║   http://localhost:${PORT}                  ║`);
  console.log(`╚══════════════════════════════════════════╝\n`);
});
