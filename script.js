// ─── Stars ───────────────────────────────────────────────
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2 + 0.5;
  s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--d:${2 + Math.random() * 4}s;animation-delay:${Math.random() * 5}s;`;
  starsEl.appendChild(s);
}

// ─── Clock ring ticks ────────────────────────────────────
const ring = document.getElementById('clockRing');
for (let i = 0; i < 60; i++) {
  const tick = document.createElement('div');
  tick.className = 'clock-tick';
  tick.style.transform = `rotate(${i * 6}deg) translateX(-50%)`;
  tick.style.height = i % 5 === 0 ? '20px' : '10px';
  tick.style.opacity = i % 5 === 0 ? '0.5' : '0.15';
  ring.appendChild(tick);
}

// ─── State ───────────────────────────────────────────────
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let clockInterval = null;
let isInPast = false;
let traveledDate = null; // { day, month, year }

// ─── Live present clock ──────────────────────────────────
function updatePresentClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock-display').textContent = `${h}:${m}:${s}`;
  document.getElementById('date-display').textContent =
    `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

function startPresentClock() {
  stopClock();
  isInPast = false;
  document.getElementById('clockLabel').textContent = '◆ PRESENT ◆';
  document.getElementById('liveClock').classList.remove('traveling', 'in-past');
  updatePresentClock();
  clockInterval = setInterval(updatePresentClock, 1000);
}

function stopClock() {
  if (clockInterval) { clearInterval(clockInterval); clockInterval = null; }
}

startPresentClock();

// ─── Quick date set ──────────────────────────────────────
window.setDate = function (d, m, y) {
  document.getElementById('day').value = d;
  document.getElementById('month').value = m;
  document.getElementById('year').value = y;
}

// ─── Helpers ─────────────────────────────────────────────
function getEraInfo(year) {
  if (year < -2999) return { era: 'Prehistory', badge: 'Paleolithic' };
  if (year < -500) return { era: 'Antiquity', badge: 'Ancient World' };
  if (year < 500) return { era: 'Classical Antiquity', badge: 'Greeks & Romans' };
  if (year < 1400) return { era: 'Middle Ages', badge: 'Medieval Era' };
  if (year < 1600) return { era: 'Renaissance', badge: 'Early Modern Era' };
  if (year < 1800) return { era: 'Age of Enlightenment', badge: '17th-18th Century' };
  if (year < 1900) return { era: '19th Century', badge: 'Industrial Era' };
  if (year < 1945) return { era: 'Early 20th Century', badge: 'World Wars' };
  if (year < 1990) return { era: 'Cold War', badge: '20th Century' };
  if (year < 2000) return { era: 'End of Millennium', badge: '90s' };
  return { era: '21st Century', badge: 'Digital Era' };
}

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return (s[(v - 20) % 10] || s[v] || s[0]);
}

function getCentury(year) {
  if (year <= 0) return `${Math.abs(year - 99)} BC`;
  const c = Math.ceil(year / 100);
  return `${c}${getOrdinal(c)} Century`;
}

function getDayOfWeek(day, month, year) {
  if (year < 1582) return ''; // Julian calendar edge case
  try {
    const d = new Date(year, month - 1, day);
    return DAYS[d.getDay()];
  } catch (e) { return ''; }
}

// ─── Typewriter ──────────────────────────────────────────
function typeWriter(el, text, speed = 18) {
  el.innerHTML = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.className = 'typewriter-char';
      span.textContent = text[i];
      el.appendChild(span);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// ─── CLOCK ROLLING ANIMATION ─────────────────────────────
// Animates the clock panel counting from present year down to target
function animateTravelClock(targetDay, targetMonth, targetYear, durationMs) {
  stopClock();
  const clock = document.getElementById('liveClock');
  const display = document.getElementById('clock-display');
  const dateDisp = document.getElementById('date-display');
  const label = document.getElementById('clockLabel');

  clock.classList.add('traveling');
  label.textContent = '⧖ TRAVELING ⧖';

  const startYear = new Date().getFullYear();
  const startMs = performance.now();

  // Random time digits flickering
  let timeFlickInterval = setInterval(() => {
    const rh = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const rm = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const rs = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    display.textContent = `${rh}:${rm}:${rs}`;
    display.style.textShadow = `0 0 ${10 + Math.random() * 30}px rgba(201,168,76,0.8)`;
  }, 60);

  // Year rolling
  let yearRollInterval = setInterval(() => {
    const elapsed = performance.now() - startMs;
    const progress = Math.min(elapsed / durationMs, 1);
    // easeInOutQuad
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    const currentYear = Math.round(startYear + (targetYear - startYear) * ease);
    const currentMonth = Math.round(1 + (targetMonth - 1) * ease);
    const currentDay = Math.round(1 + (targetDay - 1) * ease);

    dateDisp.textContent = `${String(currentDay).padStart(2, '0')} / ${String(currentMonth).padStart(2, '0')} / ${currentYear}`;
    dateDisp.style.fontSize = '1rem';
    dateDisp.style.opacity = '1';
    dateDisp.style.letterSpacing = '0.25em';

    if (progress >= 1) {
      clearInterval(yearRollInterval);
      clearInterval(timeFlickInterval);

      // Settle on target time: use current real H:M but freeze with dramatic effect
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      display.textContent = `${h}:${m}:${s}`;
      display.style.textShadow = '0 0 20px rgba(201,168,76,0.9)';

      // Final settled date
      const weekDay = getDayOfWeek(targetDay, targetMonth, targetYear);
      dateDisp.textContent = `${String(targetDay).padStart(2, '0')} / ${String(targetMonth).padStart(2, '0')} / ${targetYear}`;
      clock.classList.remove('traveling');
      clock.classList.add('in-past');
      label.textContent = `◆ ${targetYear < 0 ? Math.abs(targetYear) + ' BC' : targetYear} ◆`;

      // Start ticking in the past (same H:M:S rhythm, frozen date)
      startPastClock(targetDay, targetMonth, targetYear);
    }
  }, 30);
}

// Ticks seconds but keeps the historical date frozen
function startPastClock(day, month, year) {
  stopClock();
  isInPast = true;
  traveledDate = { day, month, year };

  const display = document.getElementById('clock-display');
  const dateDisp = document.getElementById('date-display');
  const label = document.getElementById('clockLabel');
  const clock = document.getElementById('liveClock');

  // base the seconds off real time so it feels live
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    display.textContent = `${h}:${m}:${s}`;
    display.style.textShadow = '0 0 20px rgba(201,168,76,0.5)';

    const weekDay = getDayOfWeek(day, month, year);
    const wdStr = weekDay ? `${weekDay}, ` : '';
    dateDisp.textContent = `${wdStr}${MONTHS[month - 1]} ${String(day).padStart(2, '0')}, ${year}`;
    dateDisp.style.fontSize = '0.75rem';
    dateDisp.style.opacity = '0.85';
    dateDisp.style.letterSpacing = '0.15em';
  }

  tick();
  clockInterval = setInterval(tick, 1000);
  label.textContent = `◆ ${year < 0 ? Math.abs(year) + ' BC' : year} ◆`;
  clock.classList.add('in-past');
}

// ─── MAIN TRAVEL FUNCTION ────────────────────────────────
window.startTravel = async function () {
  const day = parseInt(document.getElementById('day').value) || 1;
  const month = parseInt(document.getElementById('month').value) || 1;
  const year = parseInt(document.getElementById('year').value) || 1900;

  if (year > new Date().getFullYear()) {
    alert('⚠️ Cannot travel to the future... yet.');
    return;
  }

  const btn = document.getElementById('travelBtn');
  btn.disabled = true;

  // Vortex overlay
  const vortex = document.getElementById('vortex');
  const vortexText = document.getElementById('vortexText');
  vortex.classList.add('active');

  const yearDiff = new Date().getFullYear() - year;
  const messages = [
    `⧖ CALCULATING TEMPORAL VECTOR ⧗`,
    `⧖ ${Math.abs(yearDiff)} YEARS AWAY ⧗`,
    `⧖ CROSSING THE CONTINUUM ⧗`,
    `⧖ ARRIVING IN ${year < 0 ? Math.abs(year) + ' BC' : year} ⧗`
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
    const resp = await fetch("/ai/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day, month, year })
    });

    if (!resp.ok) throw new Error(`AI error: ${resp.status}`);
    const data = await resp.json();
    const raw = data.content?.map(i => i.text || '').join('') || '';
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    aiSummary = parsed.summary || '';
    aiFacts = parsed.facts || [];
    aiAtmosphere = parsed.atmosphere || '';
  } catch (e) {
    aiSummary = `On ${monthName} ${day}, ${year}, the world was going through a unique moment. This period was marked by events that would shape the course of humanity.`;
    aiFacts = [{ label: 'Period', value: `${year} — ${getEraInfo(year).era}` }];
    aiAtmosphere = `The air of ${year} carried the weight of an era in transformation...`;
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
    `${String(day).padStart(2, '0')} ${monthName.substring(0, 3).toUpperCase()} ${year < 0 ? Math.abs(year) + ' BC' : year}`;
  document.getElementById('eraBadge').textContent = eraInfo.badge;

  const summaryEl = document.getElementById('summaryText');
  summaryEl.innerHTML = '';
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
  setTimeout(() => fetchTTS(narrationText, year), 900);
}

// ─── ElevenLabs TTS ──────────────────────────────────────
const ELEVEN_MODEL = 'eleven_multilingual_v2';
const VOICE_ID = 'uYXf8XasLslADfZ2MB4u'; // (Robotized)

function getDynamicVoiceId(year) {
  return VOICE_ID;
}

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

async function fetchTTS(text, year = new Date().getFullYear()) {
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
      body: JSON.stringify({
        text,
        voiceId: getDynamicVoiceId(year),
        modelId: ELEVEN_MODEL
      })
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
    console.error('TTS error:', err);
    ttsLoading.classList.remove('visible');
    ttsLoading.innerHTML = '<span style="color:rgba(201,168,76,0.5);font-size:0.58rem;letter-spacing:0.15em">Narration unavailable</span>';
    ttsLoading.classList.add('visible');
  }
}

function playAudio() {
  if (!currentAudio) return;
  currentAudio.play();
  isPlaying = true;
  setWaveformActive(true);
  document.getElementById('playPauseBtn').textContent = '⏸';
}

function pauseAudio() {
  if (!currentAudio) return;
  currentAudio.pause();
  isPlaying = false;
  setWaveformActive(false);
  document.getElementById('playPauseBtn').textContent = '▶';
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
  isPlaying = false;
  setWaveformActive(false);
  document.getElementById('playPauseBtn').textContent = '▶';
}

window.toggleAudio = function () {
  if (isPlaying) pauseAudio();
  else playAudio();
}

// ─── RETURN TO PRESENT ───────────────────────────────────
window.returnToPresent = function () {
  stopAudio();
  document.getElementById('audioBar').classList.remove('visible');

  const card = document.getElementById('resultCard');
  const vortex = document.getElementById('vortex');
  const vortexText = document.getElementById('vortexText');
  const clock = document.getElementById('liveClock');

  vortexText.textContent = '⧖ RETURNING TO PRESENT ⧗';
  vortex.classList.add('active');

  // Reverse-roll the clock back to now
  const { day, month, year } = traveledDate || { day: 1, month: 1, year: 1900 };
  const nowYear = new Date().getFullYear();
  const startMs = performance.now();
  const dur = 1400;

  stopClock();
  const display = document.getElementById('clock-display');
  const dateDisp = document.getElementById('date-display');
  const label = document.getElementById('clockLabel');
  clock.classList.add('traveling');
  clock.classList.remove('in-past');

  let flickBack = setInterval(() => {
    const rh = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const rm = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const rs = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    display.textContent = `${rh}:${rm}:${rs}`;
    display.style.textShadow = `0 0 ${10 + Math.random() * 30}px rgba(201,168,76,0.8)`;
  }, 50);

  let rollBack = setInterval(() => {
    const elapsed = performance.now() - startMs;
    const progress = Math.min(elapsed / dur, 1);
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    const cy = Math.round(year + (nowYear - year) * ease);
    dateDisp.textContent = String(cy);
    dateDisp.style.fontSize = '1.4rem';
    dateDisp.style.opacity = '1';
    dateDisp.style.letterSpacing = '0.3em';

    if (progress >= 1) {
      clearInterval(rollBack);
      clearInterval(flickBack);
      vortex.classList.remove('active');
      card.classList.remove('visible');
      clock.classList.remove('traveling');
      setTimeout(() => { card.style.display = 'none'; }, 800);
      startPresentClock();
      document.getElementById('inputPanel').scrollIntoView({ behavior: 'smooth' });
    }
  }, 30);
}
