/**
 * TRÒ CHƠI KÉO CO ĐỊA LÝ 5v5
 * 100% Pure Vanilla JavaScript Game Logic
 * GitHub Pages Compatible & Fully Offline Ready
 */

// =============================================================================
// 1. DỮ LIỆU CÂU HỎI MẶC ĐỊNH BAN ĐẦU (10 CÂU HỎI ĐỊA LÝ VIỆT NAM & THẾ GIỚI)
// =============================================================================
const DEFAULT_GEOGRAPHY_QUESTIONS = [
  {
    id: 1,
    question: 'Đỉnh núi nào được mệnh danh là "Nóc nhà Đông Dương" nằm tại Việt Nam?',
    options: ['Fansipan (3.143m)', 'Ngọc Linh (2.605m)', 'Bạch Mộc Lương Tử', 'Pu Si Lung'],
    correctIndex: 0,
    explanation: 'Đỉnh Fansipan cao 3.143m thuộc dãy Hoàng Liên Sơn, tỉnh Lào Cai, là đỉnh núi tự nhiên cao nhất 3 nước Đông Dương (Việt Nam, Lào, Campuchia).'
  },
  {
    id: 2,
    question: 'Hang động tự nhiên lớn nhất thế giới Sơn Đoòng nằm ở tỉnh nào của Việt Nam?',
    options: ['Ninh Bình', 'Quảng Bình', 'Hà Giang', 'Cao Bằng'],
    correctIndex: 1,
    explanation: 'Hang Sơn Đoòng thuộc Vườn quốc gia Phong Nha - Kẻ Bàng (Quảng Bình), được Hiệp hội Nghiên cứu Hang động Hoàng gia Anh khám phá và công nhận là hang tự nhiên lớn nhất thế giới.'
  },
  {
    id: 3,
    question: 'Dòng sông nào dài nhất thế giới, chảy qua phần lớn khu vực Đông Bắc châu Phi?',
    options: ['Sông Amazon', 'Sông Nin (Nile)', 'Sông Mê Kông', 'Sông Dương Tử'],
    correctIndex: 1,
    explanation: 'Sông Nin dài khoảng 6.650 km, bắt nguồn từ hồ Victoria, chảy qua 11 quốc gia châu Phi và đổ ra biển Địa Trung Hải.'
  },
  {
    id: 4,
    question: 'Đại dương nào có diện tích và độ sâu trung bình lớn nhất trên Trái Đất?',
    options: ['Đại Tây Dương', 'Ấn Độ Dương', 'Bắc Băng Dương', 'Thái Bình Dương'],
    correctIndex: 3,
    explanation: 'Thái Bình Dương chiếm hơn 30% diện tích bề mặt Trái Đất, chứa rãnh Mariana sâu kỷ lục gần 11.000m.'
  },
  {
    id: 5,
    question: 'Đảo nào có diện tích tự nhiên lớn nhất tại Việt Nam?',
    options: ['Đảo Phú Quốc', 'Đảo Cát Bà', 'Đảo Lý Sơn', 'Côn Đảo'],
    correctIndex: 0,
    explanation: 'Đảo Phú Quốc (tỉnh Kiên Giang) có diện tích khoảng 589 km², được mệnh danh là Đảo Ngọc và là hòn đảo lớn nhất Việt Nam.'
  },
  {
    id: 6,
    question: 'Sa mạc cát nóng lớn nhất thế giới nằm ở châu lục nào?',
    options: ['Châu Á (Gobi)', 'Châu Phi (Sahara)', 'Châu Úc', 'Châu Mỹ'],
    correctIndex: 1,
    explanation: 'Sa mạc Sahara nằm ở Bắc Phi có diện tích hơn 9 triệu km², gần bằng diện tích của toàn bộ lãnh thổ Hoa Kỳ hoặc Trung Quốc.'
  },
  {
    id: 7,
    question: 'Dãy núi cao nhất hành tinh với đỉnh Everest (8.848m) có tên là gì?',
    options: ['Dãy Andes', 'Dãy Alps', 'Dãy Himalaya', 'Dãy Rocky'],
    correctIndex: 2,
    explanation: 'Dãy Himalaya nằm giữa cao nguyên Tây Tạng và tiểu lục địa Ấn Độ, sở hữu 14 đỉnh núi cao trên 8.000m bao gồm đỉnh Everest huyền thoại.'
  },
  {
    id: 8,
    question: 'Thác nước tự nhiên hùng vĩ nằm trên biên giới giữa Việt Nam và Trung Quốc là thác nào?',
    options: ['Thác Cam Ly', 'Thác Bản Giốc', 'Thác Datanla', 'Thác Pongour'],
    correctIndex: 1,
    explanation: 'Thác Bản Giốc nằm tại xã Đàm Thủy, huyện Trùng Khánh, tỉnh Cao Bằng, là một trong những thác nước biên giới đẹp nhất hành tinh.'
  },
  {
    id: 9,
    question: 'Rừng mưa nhiệt đới lớn nhất thế giới, được coi là "lá phổi xanh của Trái Đất" là gì?',
    options: ['Rừng Cúc Phương', 'Rừng Taiga', 'Rừng Amazon', 'Rừng Đen'],
    correctIndex: 2,
    explanation: 'Rừng nhiệt đới Amazon trải rộng trên lưu vực sông Amazon tại Nam Mỹ, tạo ra khoảng 20% lượng oxy cho toàn hành tinh.'
  },
  {
    id: 10,
    question: 'Hai quần đảo Hoàng Sa và Trường Sa là một phần máu thịt thiêng liêng thuộc chủ quyền của quốc gia nào?',
    options: ['Việt Nam', 'Indonesia', 'Philippines', 'Malaysia'],
    correctIndex: 0,
    explanation: 'Việt Nam có đầy đủ căn cứ lịch sử vững chắc và cơ sở pháp lý theo luật pháp quốc tế để khẳng định chủ quyền không thể tranh cãi đối với Hoàng Sa và Trường Sa.'
  }
];

// =============================================================================
// 2. TEAMS ROSTERS: ĐỘI XANH VÀ ĐỘI ĐỎ (MỖI ĐỘI 5 NGƯỜI)
// =============================================================================
const BLUE_TEAM = [
  { id: 1, name: 'Quá', role: 'Tiên phong', power: 85 },
  { id: 2, name: 'Mập', role: 'Lực sĩ', power: 95 },
  { id: 3, name: 'Nhiên', role: 'Kỹ thuật', power: 88 },
  { id: 4, name: 'Hạo', role: 'Tiếp sức', power: 90 },
  { id: 5, name: 'Lý', role: 'Mỏ neo', power: 92 }
];

const RED_TEAM = [
  { id: 1, name: 'Sơn', role: 'Tiên phong', power: 87 },
  { id: 2, name: 'Hải', role: 'Lực sĩ', power: 94 },
  { id: 3, name: 'Đức', role: 'Kỹ thuật', power: 89 },
  { id: 4, name: 'Cường', role: 'Tiếp sức', power: 91 },
  { id: 5, name: 'Long', role: 'Mỏ neo', power: 93 }
];

// =============================================================================
// 3. QUẢN LÝ LƯU TRỮ CÂU HỎI (LOCALSTORAGE)
// =============================================================================
const STORAGE_KEY_QUESTIONS = 'TUG_WAR_GEOGRAPHY_QUESTIONS_V2';
const STORAGE_KEY_TIMELIMIT = 'TUG_WAR_TIMELIMIT_SECONDS';

let questionsList = [];

function loadQuestionsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUESTIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 2) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Lỗi khi đọc questions từ localStorage', e);
  }
  return [...DEFAULT_GEOGRAPHY_QUESTIONS];
}

function saveQuestionsToStorage(list) {
  questionsList = list;
  try {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(list));
  } catch (e) {
    console.error('Lỗi khi lưu questions vào localStorage', e);
  }
  updateQuestionStatsUI();
}

function updateQuestionStatsUI() {
  const total = questionsList.length;
  const countBadge = document.getElementById('q-count-badge');
  const headerBadge = document.getElementById('header-q-badge');
  const totalText = document.getElementById('q-total-count-text');

  if (countBadge) countBadge.innerText = total;
  if (headerBadge) headerBadge.innerText = `${total} Câu Hỏi`;
  if (totalText) totalText.innerText = total;

  document.querySelectorAll('.total-q-label').forEach(el => {
    el.innerText = total;
  });
}

// =============================================================================
// 4. GAME STATE
// =============================================================================
let currentQuestionIndex = 0;
let currentTeamTurn = 'blue'; // 'blue' | 'red'
let ropePosition = 0; // -100 (Blue win) to +100 (Red win)
let blueScore = 0;
let redScore = 0;
let timeLimit = 30; // 30 | 60 | 90 seconds
let countdown = 30;
let timerInterval = null;
let isEvaluating = false;
let isFinished = false;
let gameMode = 'bot'; // 'bot' | 'pvp'
let soundEnabled = true;
let questionHistory = []; // { isCorrect, team, chosenIdx }

// =============================================================================
// 5. WEB AUDIO API SOUND GENERATOR
// =============================================================================
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && AudioContextClass) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.2) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Autostart audio safe
  }
}

function soundTick() {
  playTone(800, 'sine', 0.05, 0.1);
}

function soundUrgentTick() {
  playTone(1000, 'triangle', 0.08, 0.25);
}

function soundPullRope() {
  playTone(160, 'sawtooth', 0.35, 0.25);
  setTimeout(() => playTone(240, 'triangle', 0.25, 0.2), 120);
}

function soundCorrect() {
  playTone(523.25, 'sine', 0.15, 0.2); // C5
  setTimeout(() => playTone(659.25, 'sine', 0.15, 0.2), 90); // E5
  setTimeout(() => playTone(783.99, 'sine', 0.18, 0.2), 180); // G5
  setTimeout(() => playTone(1046.5, 'sine', 0.3, 0.25), 270); // C6
}

function soundWrong() {
  playTone(220, 'sawtooth', 0.18, 0.25);
  setTimeout(() => playTone(164.81, 'sawtooth', 0.3, 0.25), 150);
}

function soundVictory() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
  notes.forEach((note, i) => {
    setTimeout(() => playTone(note, 'triangle', 0.4, 0.3), i * 140);
  });
}

// =============================================================================
// 6. ATHLETES SPRITE RENDERING (5 BLUE VS 5 RED)
// =============================================================================
function renderAthletes() {
  const blueSquad = document.getElementById('blue-squad-container');
  const redSquad = document.getElementById('red-squad-container');
  if (!blueSquad || !redSquad) return;

  blueSquad.innerHTML = [...BLUE_TEAM].reverse().map(m => `
    <div class="athlete-figure">
      <div class="athlete-nametag nametag-blue">#${m.id} ${m.name}</div>
      <svg viewBox="0 0 40 60" style="width: 28px; height: 42px;">
        <circle cx="20" cy="13" r="8" fill="#3b82f6"/>
        <rect x="12" y="11" width="16" height="3" rx="1.5" fill="#1e3a8a"/>
        <circle cx="18" cy="13" r="1.5" fill="#ffffff"/>
        <circle cx="22" cy="13" r="1.5" fill="#ffffff"/>
        <path d="M13 22 L27 22 L24 43 L14 43 Z" fill="#1d4ed8"/>
        <path d="M14 26 L5 32 L12 35" stroke="#93c5fd" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M26 26 L16 33 L22 36" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M15 43 L9 56 M23 43 L19 56" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    </div>
  `).join('');

  redSquad.innerHTML = RED_TEAM.map(m => `
    <div class="athlete-figure">
      <div class="athlete-nametag nametag-red">#${m.id} ${m.name}</div>
      <svg viewBox="0 0 40 60" style="width: 28px; height: 42px;">
        <circle cx="20" cy="13" r="8" fill="#ef4444"/>
        <rect x="12" y="11" width="16" height="3" rx="1.5" fill="#7f1d1d"/>
        <circle cx="18" cy="13" r="1.5" fill="#ffffff"/>
        <circle cx="22" cy="13" r="1.5" fill="#ffffff"/>
        <path d="M13 22 L27 22 L26 43 L16 43 Z" fill="#b91c1c"/>
        <path d="M27 26 L35 32 L28 35" stroke="#fca5a5" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M15 26 L24 33 L18 36" stroke="#f87171" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M17 43 L21 56 M25 43 L31 56" stroke="#7f1d1d" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    </div>
  `).join('');

  renderRosterChips();
}

function renderRosterChips() {
  const blueChips = document.getElementById('blue-roster-chips');
  const redChips = document.getElementById('red-roster-chips');
  if (blueChips) {
    blueChips.innerHTML = BLUE_TEAM.map(m => `
      <div class="roster-member blue">
        <span>#${m.id} ${m.name}</span>
        <span class="roster-role-sub">${m.role}</span>
      </div>
    `).join('');
  }
  if (redChips) {
    redChips.innerHTML = RED_TEAM.map(m => `
      <div class="roster-member red">
        <span>#${m.id} ${m.name}</span>
        <span class="roster-role-sub">${m.role}</span>
      </div>
    `).join('');
  }
}

// =============================================================================
// 7. QUESTION RENDERING & CONTROLS
// =============================================================================
function renderQuestion() {
  if (currentQuestionIndex >= questionsList.length) {
    finishMatch();
    return;
  }

  const q = questionsList[currentQuestionIndex];
  const isBlue = currentTeamTurn === 'blue';
  const total = questionsList.length;

  document.getElementById('blue-q-current').innerText = currentQuestionIndex + 1;
  document.getElementById('red-q-current').innerText = currentQuestionIndex + 1;

  document.getElementById('blue-q-text').innerText = q.question;
  document.getElementById('red-q-text').innerText = q.question;

  const bluePanel = document.getElementById('blue-panel');
  const redPanel = document.getElementById('red-panel');
  const blueStatus = document.getElementById('blue-status-pill');
  const redStatus = document.getElementById('red-status-pill');

  if (isBlue) {
    bluePanel.className = 'quiz-panel blue-active';
    redPanel.className = 'quiz-panel inactive';
    blueStatus.className = 'status-pill active-blue';
    blueStatus.innerText = 'LƯỢT TRẢ LỜI';
    redStatus.className = 'status-pill wait';
    redStatus.innerText = 'CHỜ LƯỢT';
  } else {
    redPanel.className = 'quiz-panel red-active';
    bluePanel.className = 'quiz-panel inactive';
    redStatus.className = 'status-pill active-red';
    redStatus.innerText = gameMode === 'bot' ? 'MÁY SUY NGHĨ...' : 'LƯỢT TRẢ LỜI';
    blueStatus.className = 'status-pill wait';
    blueStatus.innerText = 'CHỜ LƯỢT';
  }

  const blueContainer = document.getElementById('blue-options-container');
  blueContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="ans-btn" onclick="handleSelectAnswer('blue', ${idx})" ${!isBlue || isEvaluating ? 'disabled' : ''}>
      <span class="ans-key key-blue">${['A','B','C','D'][idx]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  const redContainer = document.getElementById('red-options-container');
  redContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="ans-btn" onclick="handleSelectAnswer('red', ${idx})" ${isBlue || isEvaluating || (gameMode === 'bot') ? 'disabled' : ''}>
      <span class="ans-key key-red">${['A','B','C','D'][idx]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  renderProgressDots();
  startTimer();

  if (!isBlue && gameMode === 'bot' && !isEvaluating && !isFinished) {
    setTimeout(() => {
      if (currentTeamTurn === 'red' && !isEvaluating && !isFinished) {
        const willBeCorrect = Math.random() < 0.70;
        const botChoice = willBeCorrect ? q.correctIndex : (q.correctIndex + 1) % q.options.length;
        window.handleSelectAnswer('red', botChoice);
      }
    }, 1800);
  }
}

function renderProgressDots() {
  const container = document.getElementById('dots-stepper');
  if (!container) return;

  const total = questionsList.length;
  container.innerHTML = Array.from({ length: total }).map((_, idx) => {
    const hist = questionHistory[idx];
    let cls = 'step-bubble';
    let icon = `${idx + 1}`;
    if (hist) {
      cls += hist.isCorrect ? ' correct' : ' wrong';
      icon = hist.isCorrect ? '✓' : '✗';
    } else if (idx === currentQuestionIndex) {
      cls += ' active';
    }
    return `<div class="${cls}">${icon}</div>`;
  }).join('');
}

// =============================================================================
// 8. TIMER 30S, 60S, 90S LOGIC
// =============================================================================
function startTimer() {
  clearInterval(timerInterval);
  countdown = timeLimit;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    if (isEvaluating || isFinished) return;
    countdown--;
    updateTimerDisplay();

    if (countdown <= 5 && countdown > 0) {
      soundUrgentTick();
    } else if (countdown > 5 && countdown % 5 === 0) {
      soundTick();
    }

    if (countdown <= 0) {
      clearInterval(timerInterval);
      window.handleSelectAnswer(currentTeamTurn, -1);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const isBlue = currentTeamTurn === 'blue';
  const pct = Math.max(0, (countdown / timeLimit) * 100);

  const blueCountdown = document.getElementById('blue-countdown');
  const blueBar = document.getElementById('blue-timer-bar');
  const redCountdown = document.getElementById('red-countdown');
  const redBar = document.getElementById('red-timer-bar');

  if (isBlue) {
    blueCountdown.innerText = `${countdown}s`;
    blueBar.style.width = `${pct}%`;
    blueBar.className = countdown <= 5 ? 'timer-bar-inner timer-bar-urgent' : 'timer-bar-inner timer-bar-blue';
    redCountdown.innerText = `${timeLimit}s`;
    redBar.style.width = '100%';
    redBar.className = 'timer-bar-inner timer-bar-red';
  } else {
    redCountdown.innerText = `${countdown}s`;
    redBar.style.width = `${pct}%`;
    redBar.className = countdown <= 5 ? 'timer-bar-inner timer-bar-urgent' : 'timer-bar-inner timer-bar-red';
    blueCountdown.innerText = `${timeLimit}s`;
    blueBar.style.width = '100%';
    blueBar.className = 'timer-bar-inner timer-bar-blue';
  }
}

// =============================================================================
// 9. EVALUATION & TUG-OF-WAR PULL ACTION
// =============================================================================
window.handleSelectAnswer = function(team, chosenIdx) {
  if (isEvaluating || isFinished || team !== currentTeamTurn) return;
  isEvaluating = true;
  clearInterval(timerInterval);

  const q = questionsList[currentQuestionIndex];
  const isCorrect = chosenIdx === q.correctIndex;
  let pullTeam = team;
  let strokes = 1;

  if (isCorrect) {
    pullTeam = team;
    strokes = 1;
    soundCorrect();
    if (team === 'blue') blueScore++; else redScore++;
  } else {
    pullTeam = team === 'blue' ? 'red' : 'blue';
    strokes = 2;
    soundWrong();
  }

  questionHistory[currentQuestionIndex] = { isCorrect, team, chosenIdx };

  const shiftAmount = (pullTeam === 'blue' ? -15 : 15) * strokes;
  ropePosition = Math.max(-100, Math.min(100, ropePosition + shiftAmount));

  setTimeout(soundPullRope, 250);
  updateArenaPosition();
  showEvaluationCard(isCorrect, pullTeam, strokes, q);

  if (ropePosition <= -100 || ropePosition >= 100 || currentQuestionIndex === questionsList.length - 1) {
    setTimeout(finishMatch, 1600);
  }
};

function updateArenaPosition() {
  const maxPx = 60;
  const pixelOffset = (ropePosition / 100) * maxPx;
  const stage = document.getElementById('pull-stage-canvas');
  if (stage) {
    stage.style.transform = `translateX(${pixelOffset}px)`;
  }

  const bluePercent = Math.round(50 - (ropePosition / 2));
  const redPercent = 100 - bluePercent;

  document.getElementById('gauge-fill-blue').style.width = `${bluePercent}%`;
  document.getElementById('gauge-fill-red').style.width = `${redPercent}%`;
  document.getElementById('gauge-label-blue').innerText = `Xanh ${bluePercent}%`;
  document.getElementById('gauge-label-red').innerText = `Đỏ ${redPercent}%`;

  document.getElementById('blue-score-num').innerText = blueScore;
  document.getElementById('red-score-num').innerText = redScore;
}

function showEvaluationCard(isCorrect, pullTeam, strokes, q) {
  const card = document.getElementById('evaluation-card');
  const header = document.getElementById('eval-header-text');
  const details = document.getElementById('eval-details-text');
  const expl = document.getElementById('eval-explanation-text');

  card.style.display = 'flex';
  if (isCorrect) {
    card.className = 'eval-card correct';
    header.innerHTML = `✅ TRẢ LỜI CHÍNH XÁC!`;
    details.innerHTML = `Đội <strong>${pullTeam === 'blue' ? 'Xanh' : 'Đỏ'}</strong> xuất sắc kéo <strong>${strokes} nhịp</strong> (+15%)!`;
  } else {
    card.className = 'eval-card wrong';
    header.innerHTML = `❌ TRẢ LỜI CHƯA ĐÚNG!`;
    details.innerHTML = `Đối thủ <strong>${pullTeam === 'blue' ? 'Xanh' : 'Đỏ'}</strong> được kéo <strong>${strokes} nhịp</strong> (+30%)!`;
  }

  const correctText = q.options[q.correctIndex] || 'Đáp án đúng';
  expl.innerHTML = `<strong>Đáp án đúng:</strong> ${correctText}<br><span style="display:inline-block; margin-top:4px;">${q.explanation || 'Không có giải thích chi tiết.'}</span>`;
}

function proceedToNext() {
  if (isFinished) return;
  document.getElementById('evaluation-card').style.display = 'none';
  isEvaluating = false;

  if (currentQuestionIndex < questionsList.length - 1) {
    currentQuestionIndex++;
    currentTeamTurn = currentTeamTurn === 'blue' ? 'red' : 'blue';
    renderQuestion();
  } else {
    finishMatch();
  }
}

// =============================================================================
// 10. VICTORY & RESTART
// =============================================================================
function finishMatch() {
  isFinished = true;
  clearInterval(timerInterval);
  soundVictory();

  let winner = 'draw';
  if (ropePosition <= -100) winner = 'blue';
  else if (ropePosition >= 100) winner = 'red';
  else if (ropePosition < 0) winner = 'blue';
  else if (ropePosition > 0) winner = 'red';

  const modal = document.getElementById('victory-modal');
  const title = document.getElementById('modal-winner-title');
  const sub = document.getElementById('modal-winner-sub');

  modal.style.display = 'flex';
  if (winner === 'blue') {
    title.innerText = '🏆 ĐỘI XANH VÔ ĐỊCH!';
    title.style.color = '#60a5fa';
    sub.innerText = 'Quá, Mập, Nhiên, Hạo và Lý đã kéo dây qua vạch và giành chiến thắng!';
  } else if (winner === 'red') {
    title.innerText = '🏆 ĐỘI ĐỎ VÔ ĐỊCH!';
    title.style.color = '#f87171';
    sub.innerText = 'Sơn, Hải, Đức, Cường và Long đã kéo dây qua vạch và giành chiến thắng!';
  } else {
    title.innerText = '🤝 KẾT QUẢ HÒA!';
    title.style.color = '#fbbf24';
    sub.innerText = 'Hai đội ngang tài ngang sức trên từng mét dây!';
  }

  const total = questionsList.length;
  document.getElementById('final-score-blue').innerText = `${blueScore}/${total}`;
  document.getElementById('final-score-red').innerText = `${redScore}/${total}`;
}

function resetGame() {
  currentQuestionIndex = 0;
  currentTeamTurn = 'blue';
  ropePosition = 0;
  blueScore = 0;
  redScore = 0;
  isEvaluating = false;
  isFinished = false;
  questionHistory = [];

  const evalCard = document.getElementById('evaluation-card');
  if (evalCard) evalCard.style.display = 'none';
  const victoryModal = document.getElementById('victory-modal');
  if (victoryModal) victoryModal.style.display = 'none';

  updateArenaPosition();
  renderQuestion();
}

// =============================================================================
// 11. QUẢN LÝ CÂU HỎI (THÊM / SỬA / XÓA / RESET)
// =============================================================================
function renderQuestionsManager() {
  const container = document.getElementById('q-items-container');
  if (!container) return;

  if (questionsList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        Chưa có câu hỏi nào. Hãy nhấn <strong>Thêm câu hỏi mới</strong> hoặc <strong>Khôi phục 10 câu gốc</strong>.
      </div>
    `;
    return;
  }

  container.innerHTML = questionsList.map((q, idx) => `
    <div class="q-item-card" id="q-card-${q.id}">
      <div class="q-item-header">
        <div class="q-item-title">
          <strong style="color: var(--gold-light);">#${idx + 1}.</strong> ${escapeHtml(q.question)}
        </div>
        <div class="q-item-actions">
          <button class="q-btn-icon" onclick="openEditQuestion(${q.id})" title="Chỉnh sửa câu hỏi này">
            ✏️ Sửa
          </button>
          <button class="q-btn-icon q-btn-delete" onclick="handleDeleteQuestion(${q.id})" title="Xóa câu hỏi này">
            🗑️ Xóa
          </button>
        </div>
      </div>

      <div class="q-options-preview">
        ${q.options.map((opt, oIdx) => `
          <div class="q-opt-chip ${oIdx === q.correctIndex ? 'correct-chip' : ''}">
            <strong>${['A','B','C','D'][oIdx]}:</strong> ${escapeHtml(opt)}
            ${oIdx === q.correctIndex ? ' (Đúng ✓)' : ''}
          </div>
        `).join('')}
      </div>

      ${q.explanation ? `
        <div class="q-explanation-preview">
          <strong>💡 Giải thích:</strong> ${escapeHtml(q.explanation)}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function openAddQuestionModal() {
  document.getElementById('q-form-modal-title').innerHTML = `<span>➕</span> Thêm câu hỏi mới`;
  document.getElementById('form-q-id').value = '';
  document.getElementById('form-q-text').value = '';
  document.getElementById('form-opt-0').value = '';
  document.getElementById('form-opt-1').value = '';
  document.getElementById('form-opt-2').value = '';
  document.getElementById('form-opt-3').value = '';
  document.getElementById('form-q-correct').value = '0';
  document.getElementById('form-q-explanation').value = '';

  document.getElementById('q-form-modal').style.display = 'flex';
}

window.openEditQuestion = function(id) {
  const q = questionsList.find(item => item.id === id);
  if (!q) return;

  document.getElementById('q-form-modal-title').innerHTML = `<span>✏️</span> Chỉnh sửa câu hỏi`;
  document.getElementById('form-q-id').value = q.id;
  document.getElementById('form-q-text').value = q.question;
  document.getElementById('form-opt-0').value = q.options[0] || '';
  document.getElementById('form-opt-1').value = q.options[1] || '';
  document.getElementById('form-opt-2').value = q.options[2] || '';
  document.getElementById('form-opt-3').value = q.options[3] || '';
  document.getElementById('form-q-correct').value = q.correctIndex;
  document.getElementById('form-q-explanation').value = q.explanation || '';

  document.getElementById('q-form-modal').style.display = 'flex';
};

window.handleDeleteQuestion = function(id) {
  if (questionsList.length <= 2) {
    alert('Cần giữ lại tối thiểu 2 câu hỏi để đảm bảo trận đấu diễn ra bình thường!');
    return;
  }

  const confirmDelete = confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?');
  if (!confirmDelete) return;

  const updated = questionsList.filter(item => item.id !== id);
  saveQuestionsToStorage(updated);
  renderQuestionsManager();
  resetGame();
};

function handleSaveQuestionForm(e) {
  e.preventDefault();
  const idVal = document.getElementById('form-q-id').value;
  const questionText = document.getElementById('form-q-text').value.trim();
  const opt0 = document.getElementById('form-opt-0').value.trim();
  const opt1 = document.getElementById('form-opt-1').value.trim();
  const opt2 = document.getElementById('form-opt-2').value.trim();
  const opt3 = document.getElementById('form-opt-3').value.trim();
  const correctIdx = parseInt(document.getElementById('form-q-correct').value, 10);
  const explanation = document.getElementById('form-q-explanation').value.trim();

  if (!questionText || !opt0 || !opt1 || !opt2 || !opt3) {
    alert('Vui lòng điền đầy đủ câu hỏi và 4 phương án trả lời!');
    return;
  }

  const newOptions = [opt0, opt1, opt2, opt3];

  if (idVal) {
    // Chỉnh sửa câu hỏi hiện có
    const targetId = parseInt(idVal, 10);
    const updated = questionsList.map(item => {
      if (item.id === targetId) {
        return {
          ...item,
          question: questionText,
          options: newOptions,
          correctIndex: correctIdx,
          explanation: explanation
        };
      }
      return item;
    });
    saveQuestionsToStorage(updated);
  } else {
    // Thêm câu hỏi mới
    const nextId = questionsList.length > 0 ? Math.max(...questionsList.map(q => q.id)) + 1 : 1;
    const newQuestion = {
      id: nextId,
      question: questionText,
      options: newOptions,
      correctIndex: correctIdx,
      explanation: explanation
    };
    saveQuestionsToStorage([...questionsList, newQuestion]);
  }

  document.getElementById('q-form-modal').style.display = 'none';
  renderQuestionsManager();
  resetGame();
}

function handleResetDefaultQuestions() {
  const ok = confirm('Bạn có chắc chắn muốn khôi phục lại danh sách 10 câu hỏi Địa lý mặc định ban đầu không?');
  if (!ok) return;

  saveQuestionsToStorage([...DEFAULT_GEOGRAPHY_QUESTIONS]);
  renderQuestionsManager();
  resetGame();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// =============================================================================
// 12. INITIALIZATION & EVENT LISTENERS
// =============================================================================
window.addEventListener('DOMContentLoaded', () => {
  // Load questions
  questionsList = loadQuestionsFromStorage();
  updateQuestionStatsUI();

  // Load time limit setting
  const savedTime = localStorage.getItem(STORAGE_KEY_TIMELIMIT);
  if (savedTime && ['30', '60', '90'].includes(savedTime)) {
    timeLimit = parseInt(savedTime, 10);
  }
  const selectTurnTime = document.getElementById('select-turn-time');
  if (selectTurnTime) {
    selectTurnTime.value = String(timeLimit);
    selectTurnTime.addEventListener('change', (e) => {
      timeLimit = parseInt(e.target.value, 10);
      try {
        localStorage.setItem(STORAGE_KEY_TIMELIMIT, String(timeLimit));
      } catch (err) {}
      startTimer();
    });
  }

  // Render Athletes, initial question and arena
  renderAthletes();
  renderQuestion();
  updateArenaPosition();

  // Next step button
  const nextBtn = document.getElementById('btn-next-step');
  if (nextBtn) {
    nextBtn.addEventListener('click', proceedToNext);
  }

  // Reset Game
  const btnRestart = document.getElementById('btn-reset-game');
  if (btnRestart) btnRestart.addEventListener('click', resetGame);

  const btnPlayAgain = document.getElementById('btn-modal-play-again');
  if (btnPlayAgain) btnPlayAgain.addEventListener('click', resetGame);

  // Game mode select (Bot vs PvP)
  const modeSelect = document.getElementById('select-game-mode');
  if (modeSelect) {
    modeSelect.addEventListener('change', (e) => {
      gameMode = e.target.value;
      resetGame();
    });
  }

  // Sound toggle
  const soundBtn = document.getElementById('btn-toggle-sound');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      document.getElementById('sound-status-text').innerText = soundEnabled ? 'Bật' : 'Tắt';
      if (soundEnabled) soundTick();
    });
  }

  // Rules Modal
  const rulesBtn = document.getElementById('btn-show-rules');
  const rulesModal = document.getElementById('rules-modal');
  const closeRulesBtn = document.getElementById('btn-close-rules');
  if (rulesBtn && rulesModal) {
    rulesBtn.addEventListener('click', () => { rulesModal.style.display = 'flex'; });
  }
  if (closeRulesBtn && rulesModal) {
    closeRulesBtn.addEventListener('click', () => { rulesModal.style.display = 'none'; });
  }

  // Rosters Modal
  const rosterBtn = document.getElementById('btn-show-roster');
  const rosterModal = document.getElementById('roster-modal');
  const closeRosterBtn = document.getElementById('btn-close-roster');
  if (rosterBtn && rosterModal) {
    rosterBtn.addEventListener('click', () => { rosterModal.style.display = 'flex'; });
  }
  if (closeRosterBtn && rosterModal) {
    closeRosterBtn.addEventListener('click', () => { rosterModal.style.display = 'none'; });
  }

  // Questions Manager Modal
  const qManagerBtn = document.getElementById('btn-manage-questions');
  const qManagerModal = document.getElementById('questions-modal');
  const closeQModalBtn = document.getElementById('btn-close-q-modal');
  if (qManagerBtn && qManagerModal) {
    qManagerBtn.addEventListener('click', () => {
      renderQuestionsManager();
      qManagerModal.style.display = 'flex';
    });
  }
  if (closeQModalBtn && qManagerModal) {
    closeQModalBtn.addEventListener('click', () => {
      qManagerModal.style.display = 'none';
    });
  }

  // Add Question Button
  const btnOpenAddQ = document.getElementById('btn-open-add-q');
  if (btnOpenAddQ) {
    btnOpenAddQ.addEventListener('click', openAddQuestionModal);
  }

  // Reset Default Questions Button
  const btnResetDefault = document.getElementById('btn-reset-default-q');
  if (btnResetDefault) {
    btnResetDefault.addEventListener('click', handleResetDefaultQuestions);
  }

  // Form Question Modal
  const formQuestion = document.getElementById('form-question');
  if (formQuestion) {
    formQuestion.addEventListener('submit', handleSaveQuestionForm);
  }

  const btnCancelForm = document.getElementById('btn-cancel-form');
  const btnCloseFormModal = document.getElementById('btn-close-form-modal');
  const qFormModal = document.getElementById('q-form-modal');
  if (btnCancelForm && qFormModal) {
    btnCancelForm.addEventListener('click', () => { qFormModal.style.display = 'none'; });
  }
  if (btnCloseFormModal && qFormModal) {
    btnCloseFormModal.addEventListener('click', () => { qFormModal.style.display = 'none'; });
  }

  // Close modals on clicking background backdrop
  [rulesModal, rosterModal, qManagerModal, qFormModal, document.getElementById('victory-modal')].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m && m.id !== 'victory-modal') {
          m.style.display = 'none';
        }
      });
    }
  });
});
