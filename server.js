import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ElevenLabsClient } from 'elevenlabs';
// import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY || '';
const elevenlabs = ELEVEN_API_KEY ? new ElevenLabsClient({ apiKey: ELEVEN_API_KEY }) : null;

const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'openrouter/free';
const DEFAULT_VOICE_ID = process.env.ELEVEN_DEFAULT_VOICE_ID || 'weA4Q36twV5kwSaTEL0Q';

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

function buildChronosReportPrompt({ day, month, year }) {
  return `You are the narrative engine of the CHRONOS system.

Generate a historical report for the date: ${day}/${month}/${year}.

Respond ONLY with valid JSON, no markdown, no comments, no extra text:
{
  "summary": "Engaging narrative paragraph (3-5 sentences) about what was happening on this day/month/year. Use dramatic, journalistic language.",
  "facts": [
    {"label": "Main Event",         "value": "Primary historical occurrence"},
    {"label": "Political Context",  "value": "Dominant political situation"},
    {"label": "Technology & Science","value": "State of technology/science"},
    {"label": "Culture & Society",  "value": "How people lived"},
    {"label": "Economy",            "value": "Global economic situation"},
    {"label": "Brazil at the Time", "value": "What was happening in Brazil"}
  ],
  "atmosphere": "2-3 poetic and sensory sentences about what it would feel like to physically be there — sounds, smells, sights."
}`;
}

app.post('/ai/messages', async (req, res) => {
  const day = Number.parseInt(req.body?.day, 10);
  const month = Number.parseInt(req.body?.month, 10);
  const year = Number.parseInt(req.body?.year, 10);

  if (!Number.isInteger(day) || day < 1 || day > 31) {
    return res.status(400).json({ error: 'Invalid day' });
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: 'Invalid month' });
  }

  if (!Number.isInteger(year)) {
    return res.status(400).json({ error: 'Invalid year' });
  }

  const prompt = buildChronosReportPrompt({ day, month, year });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter HTTP error:', response.status, err);
      return res.status(502).json({ error: 'OpenRouter upstream error' });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) return res.status(502).json({ error: 'OpenRouter empty response' });

    return res.json({ content: [{ text: content }] });

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
