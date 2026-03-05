<!-- SCRIPT.js -->

diff --git a/script.js b/script.js
index 706fb590283d0c8a8f2419b7d42bc228aca5e8b2..c4e75816dcad6476d51795614af1a6e8b61f873e 100644
--- a/script.js
+++ b/script.js
@@ -223,71 +223,58 @@ window.startTravel = async function() {
   const vortex = document.getElementById('vortex');
   const vortexText = document.getElementById('vortexText');
   vortex.classList.add('active');
 
   const yearDiff = new Date().getFullYear() - year;
   const messages = [
     `⧖ CALCULANDO VETOR TEMPORAL ⧗`,
     `⧖ ${Math.abs(yearDiff)} ANOS DE DISTÂNCIA ⧗`,
     `⧖ ATRAVESSANDO O CONTINUUM ⧗`,
     `⧖ CHEGANDO EM ${year < 0 ? Math.abs(year) + ' a.C.' : year} ⧗`
   ];
   let mi = 0;
   const msgInterval = setInterval(() => {
     vortexText.textContent = messages[mi % messages.length];
     mi++;
   }, 650);
 
   // Start clock animation (2.5s)
   animateTravelClock(day, month, year, 2400);
 
   // AI call in parallel
   const monthName = MONTHS[month - 1];
   let aiSummary = '', aiFacts = [], aiAtmosphere = '';
 
   try {
-    const prompt = `Você é um historiador especialista. O usuário viajou no tempo para: ${day} de ${monthName} de ${year}.
-
-Responda APENAS com JSON válido, sem markdown, sem explicações:
-{
-  "summary": "Parágrafo narrativo e envolvente (3-5 frases) sobre o que acontecia nesse dia/mês/ano. Use linguagem dramática e jornalística.",
-  "facts": [
-    {"label": "Evento Principal",    "value": "Principal acontecimento histórico"},
-    {"label": "Contexto Político",   "value": "Situação política dominante"},
-    {"label": "Tecnologia & Ciência","value": "Estado da tecnologia/ciência"},
-    {"label": "Cultura & Sociedade", "value": "Como as pessoas viviam"},
-    {"label": "Economia",            "value": "Situação econômica global"},
-    {"label": "Brasil na Época",     "value": "O que ocorria no Brasil"}
-  ],
-  "atmosphere": "2-3 frases poéticas e sensoriais sobre como seria estar fisicamente lá — sons, cheiros, visões."
-}`;
-
     const resp = await fetch("/ai/messages", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
-      body: JSON.stringify({ prompt })
+      body: JSON.stringify({ day, month, year })
     });
+
+    if (!resp.ok) throw new Error(`AI error: ${resp.status}`);
+
     const data = await resp.json();
     const raw = data.content?.map(i => i.text || '').join('') || '';
     const clean = raw.replace(/```json|```/g, '').trim();
     const parsed = JSON.parse(clean);
     aiSummary = parsed.summary || '';
     aiFacts = parsed.facts || [];
     aiAtmosphere = parsed.atmosphere || '';
   } catch (e) {
     aiSummary = `Em ${day} de ${monthName} de ${year}, o mundo atravessava um momento singular. Este período foi marcado por eventos que moldariam o curso da humanidade.`;
     aiFacts = [{ label: 'Período', value: `${year} — ${getEraInfo(year).era}` }];
     aiAtmosphere = `O ar de ${year} carregava o peso de uma era em transformação...`;
   }
 
   // Wait minimum 2.8s total for drama
   await new Promise(r => setTimeout(r, 2800));
 
   clearInterval(msgInterval);
   vortex.classList.remove('active');
   btn.disabled = false;
 
   // Populate result card
   const eraInfo = getEraInfo(year);
   document.getElementById('resultEra').textContent = getCentury(year);
   document.getElementById('resultDateBig').textContent =
     `${String(day).padStart(2, '0')} ${monthName.substring(0, 3).toUpperCase()} ${year < 0 ? Math.abs(year) + ' a.C.' : year}`;
@@ -298,102 +285,116 @@ Responda APENAS com JSON válido, sem markdown, sem explicações:
   typeWriter(summaryEl, aiSummary, 20);
 
   const grid = document.getElementById('factsGrid');
   grid.innerHTML = '';
   aiFacts.forEach(f => {
     const div = document.createElement('div');
     div.className = 'fact-item';
     div.innerHTML = `<strong>${f.label}</strong>${f.value}`;
     grid.appendChild(div);
   });
 
   document.getElementById('atmosphereText').textContent = aiAtmosphere;
 
   // Reset audio bar
   const audioBar = document.getElementById('audioBar');
   audioBar.classList.remove('visible');
   stopAudio();
 
   const card = document.getElementById('resultCard');
   card.style.display = 'block';
   setTimeout(() => card.classList.add('visible'), 50);
   card.scrollIntoView({ behavior: 'smooth', block: 'start' });
 
   // Delay then speak: summary + atmosphere
   const narrationText = `${aiSummary} ... ${aiAtmosphere}`;
-  setTimeout(() => fetchTTS(narrationText), 900);
+  setTimeout(() => fetchTTS(narrationText, year), 900);
 }
 
 // ─── ElevenLabs TTS ──────────────────────────────────────
-const ELEVEN_VOICE_ID = 'pNInz6obpgDQGcFmaJgB';
 const ELEVEN_MODEL = 'eleven_multilingual_v2';
+const VOICE_BY_ERA = [
+  { until: 500, voiceId: 'pNInz6obpgDQGcFmaJgB' },      // Adam
+  { until: 1800, voiceId: 'VR6AewLTigWG4xSOukaG' },     // Arnold
+  { until: 1945, voiceId: 'TxGEqnHWrfWFTfGW9XjX' },     // Josh
+  { until: 2100, voiceId: 'EXAVITQu4vr4xnSDxMaL' }      // Bella
+];
+
+function getDynamicVoiceId(year) {
+  const eraVoice = VOICE_BY_ERA.find(v => year <= v.until);
+  return eraVoice?.voiceId || VOICE_BY_ERA[VOICE_BY_ERA.length - 1].voiceId;
+}
 
 let currentAudio = null;
 let isPlaying = false;
 let waveInterval = null;
 
 // Build waveform bars
 function buildWaveform() {
   const wf = document.getElementById('waveform');
   wf.innerHTML = '';
   for (let i = 0; i < 38; i++) {
     const bar = document.createElement('div');
     bar.className = 'wave-bar';
     bar.style.setProperty('--spd', `${0.3 + Math.random() * 0.5}s`);
     bar.style.setProperty('--h', `${6 + Math.random() * 18}px`);
     bar.style.animationDelay = `${Math.random() * 0.5}s`;
     wf.appendChild(bar);
   }
 }
 
 function setWaveformActive(active) {
   document.querySelectorAll('.wave-bar').forEach(b => {
     if (active) b.classList.add('active');
     else b.classList.remove('active');
   });
 }
 
-async function fetchTTS(text) {
+async function fetchTTS(text, year = new Date().getFullYear()) {
   // Show loading state
   const audioBar = document.getElementById('audioBar');
   const ttsLoading = document.getElementById('ttsLoading');
   const playBtn = document.getElementById('playPauseBtn');
 
   audioBar.classList.add('visible');
   ttsLoading.classList.add('visible');
   playBtn.disabled = true;
   buildWaveform();
 
   // Small delay so UI renders before the request
   await new Promise(r => setTimeout(r, 400));
 
   try {
     // Calls local proxy server at /tts — avoids CORS entirely
     const response = await fetch('/tts', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
-      body: JSON.stringify({ text, voiceId: ELEVEN_VOICE_ID })
+      body: JSON.stringify({
+        text,
+        voiceId: getDynamicVoiceId(year),
+        modelId: ELEVEN_MODEL
+      })
     });
 
     if (!response.ok) throw new Error(`ElevenLabs error: ${response.status}`);
 
     const blob = await response.blob();
     const url = URL.createObjectURL(blob);
 
     // Stop any previous audio
     stopAudio();
 
     currentAudio = new Audio(url);
     currentAudio.onended = () => {
       isPlaying = false;
       setWaveformActive(false);
       playBtn.textContent = '▶';
     };
 
     ttsLoading.classList.remove('visible');
     playBtn.disabled = false;
 
     // Auto-play with a small delay for drama
     await new Promise(r => setTimeout(r, 600));
     playAudio();
 
   } catch (err) {

<!-- -------------------------------- -->

<!-- SERVER.js -->

diff --git a/server.js b/server.js
index 76693c0048977280faf2b87969aecfbe939ec85b..4ba03fce611b0216fe9bd130438de3e72e26d5af 100644
--- a/server.js
+++ b/server.js
@@ -1,113 +1,174 @@
 import 'dotenv/config';
 import express from 'express';
 import path from 'path';
 import { fileURLToPath } from 'url';
 import { ElevenLabsClient } from 'elevenlabs';
-// import Anthropic from '@anthropic-ai/sdk';
 import { OpenRouter } from '@openrouter/sdk';
 
 const __dirname = path.dirname(fileURLToPath(import.meta.url));
 const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY || '';
 const elevenlabs = ELEVEN_API_KEY ? new ElevenLabsClient({ apiKey: ELEVEN_API_KEY }) : null;
 
+const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-lite-preview-02-05:free';
+const DEFAULT_VOICE_ID = process.env.ELEVEN_DEFAULT_VOICE_ID || 'weA4Q36twV5kwSaTEL0Q';
+
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
 
+function extractTextFromResponse(fullResponse) {
+  if (!fullResponse) return '';
+
+  if (typeof fullResponse.output_text === 'string' && fullResponse.output_text.trim()) {
+    return fullResponse.output_text;
+  }
+
+  if (Array.isArray(fullResponse.output)) {
+    const text = fullResponse.output
+      .flatMap(item => item?.content || [])
+      .filter(content => content?.type === 'output_text' && typeof content?.text === 'string')
+      .map(content => content.text)
+      .join('')
+      .trim();
+
+    if (text) return text;
+  }
+
+  return fullResponse.choices?.[0]?.message?.content || '';
+}
+
+function buildChronosReportPrompt({ day, month, year }) {
+  return `Você é o motor narrativo do sistema CHRONOS.
+
+Gere um relatório histórico para a data: ${day}/${month}/${year}.
+
+Responda APENAS com JSON válido, sem markdown, sem comentários, sem texto extra:
+{
+  "summary": "Parágrafo narrativo e envolvente (3-5 frases) sobre o que acontecia nesse dia/mês/ano. Use linguagem dramática e jornalística.",
+  "facts": [
+    {"label": "Evento Principal",    "value": "Principal acontecimento histórico"},
+    {"label": "Contexto Político",   "value": "Situação política dominante"},
+    {"label": "Tecnologia & Ciência","value": "Estado da tecnologia/ciência"},
+    {"label": "Cultura & Sociedade", "value": "Como as pessoas viviam"},
+    {"label": "Economia",            "value": "Situação econômica global"},
+    {"label": "Brasil na Época",     "value": "O que ocorria no Brasil"}
+  ],
+  "atmosphere": "2-3 frases poéticas e sensoriais sobre como seria estar fisicamente lá — sons, cheiros, visões."
+}`;
+}
+
 app.post('/ai/messages', async (req, res) => {
-  const { prompt } = req.body || {};
-  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
+  const day = Number.parseInt(req.body?.day, 10);
+  const month = Number.parseInt(req.body?.month, 10);
+  const year = Number.parseInt(req.body?.year, 10);
+
+  if (!Number.isInteger(day) || day < 1 || day > 31) {
+    return res.status(400).json({ error: 'Invalid day' });
+  }
+
+  if (!Number.isInteger(month) || month < 1 || month > 12) {
+    return res.status(400).json({ error: 'Invalid month' });
+  }
+
+  if (!Number.isInteger(year)) {
+    return res.status(400).json({ error: 'Invalid year' });
+  }
+
+  const systemPrompt = buildChronosReportPrompt({ day, month, year });
 
   try {
     const response = await openrouter.callModel({
-      model: 'google/gemini-2.0-flash-lite-preview-02-05:free', // OpenRouter model ID
-      messages: [{ role: 'user', content: prompt }]
+      model: OPENROUTER_MODEL,
+      input: systemPrompt
     });
-    
-    // The callModel function returns a ModelResult object, not a direct API response.
-    // We need to await .getText() or .getResponse() to get the content.
-    // https://github.com/OpenRouterTeam/openrouter-runner/blob/main/packages/sdk/src/lib/model-result.ts
-    
-    let content = "";
-    
+
+    let content = '';
+
     try {
-      // Try to get just the text content
-      content = await response.getText();
+      content = (await response.getText())?.trim() || '';
     } catch (textError) {
-       console.error('Error getting text from OpenRouter response:', textError);
-       // Fallback: try to get full response object
-       try {
-         const fullResponse = await response.getResponse();
-         content = fullResponse.choices?.[0]?.message?.content || "";
-       } catch (respError) {
-         console.error('Error getting full response:', respError);
-       }
+      console.error('Error getting text from OpenRouter response:', textError);
+    }
+
+    if (!content) {
+      try {
+        const fullResponse = await response.getResponse();
+        content = extractTextFromResponse(fullResponse);
+      } catch (respError) {
+        console.error('Error getting full response:', respError);
+      }
     }
 
     if (!content) {
-        console.warn('Empty content received from OpenRouter');
+      console.warn('Empty content received from OpenRouter');
+      return res.status(502).json({ error: 'OpenRouter empty response' });
     }
 
-    res.json({
+    return res.json({
       content: [{ text: content }]
     });
-
   } catch (err) {
     console.error('OpenRouter Error:', err);
-    res.status(502).json({ error: 'OpenRouter upstream error', detail: String(err) });
+    return res.status(502).json({ error: 'OpenRouter upstream error' });
   }
 });
 
 app.post('/tts', async (req, res) => {
-  const { text, voiceId } = req.body;
+  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
+  const voiceId = typeof req.body?.voiceId === 'string' && req.body.voiceId.trim()
+    ? req.body.voiceId.trim()
+    : DEFAULT_VOICE_ID;
+  const modelId = typeof req.body?.modelId === 'string' && req.body.modelId.trim()
+    ? req.body.modelId.trim()
+    : 'eleven_multilingual_v2';
+
   if (!text) return res.status(400).json({ error: 'Missing text' });
   if (!elevenlabs) return res.status(500).json({ error: 'Missing ELEVEN_API_KEY' });
 
   try {
     const audioStream = await elevenlabs.generate({
-      voice: voiceId || 'weA4Q36twV5kwSaTEL0Q',
+      voice: voiceId,
       text,
-      model_id: 'eleven_multilingual_v2',
+      model_id: modelId,
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
-
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
