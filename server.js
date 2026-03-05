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
  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const response = await openrouter.callModel({
      model: 'google/gemini-2.0-flash-lite-preview-02-05:free', // OpenRouter model ID
      messages: [{ role: 'user', content: prompt }]
    });
    
    // The callModel function returns a ModelResult object, not a direct API response.
    // We need to await .getText() or .getResponse() to get the content.
    // https://github.com/OpenRouterTeam/openrouter-runner/blob/main/packages/sdk/src/lib/model-result.ts
    
    let content = "";
    
    try {
      // Try to get just the text content
      content = await response.getText();
    } catch (textError) {
       console.error('Error getting text from OpenRouter response:', textError);
       // Fallback: try to get full response object
       try {
         const fullResponse = await response.getResponse();
         content = fullResponse.choices?.[0]?.message?.content || "";
       } catch (respError) {
         console.error('Error getting full response:', respError);
       }
    }

    if (!content) {
        console.warn('Empty content received from OpenRouter');
    }

    res.json({
      content: [{ text: content }]
    });

  } catch (err) {
    console.error('OpenRouter Error:', err);
    res.status(502).json({ error: 'OpenRouter upstream error', detail: String(err) });
  }
});

app.post('/tts', async (req, res) => {
  const { text, voiceId } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  if (!elevenlabs) return res.status(500).json({ error: 'Missing ELEVEN_API_KEY' });

  try {
    const audioStream = await elevenlabs.generate({
      voice: voiceId || 'weA4Q36twV5kwSaTEL0Q',
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
