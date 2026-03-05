import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ElevenLabsClient } from 'elevenlabs';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY || '';
const elevenlabs = ELEVEN_API_KEY ? new ElevenLabsClient({ apiKey: ELEVEN_API_KEY }) : null;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const msg = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    });
    res.json(msg);
  } catch (err) {
    res.status(502).json({ error: 'Anthropic upstream error', detail: String(err) });
  }
});

app.post('/tts', async (req, res) => {
  const { text, voiceId } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  if (!elevenlabs) return res.status(500).json({ error: 'Missing ELEVEN_API_KEY' });

  try {
    const audioStream = await elevenlabs.generate({
      voice: voiceId || 'pNInz6obpgDQGcFmaJgB',
      text,
      model_id: 'eleven_multilingual_v2',
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
