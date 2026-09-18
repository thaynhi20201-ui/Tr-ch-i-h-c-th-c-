/**
 * TRÒ CHƠI KÉO CO ĐỊA LÝ 5v5
 * 100% Pure Vanilla JavaScript Game Logic
 * No Frameworks, No Dependencies
 */

// =============================================================================
// 1. DATA: 10 CÂU HỎI ĐỊA LÝ CHỌN LỌC (VIỆT NAM & THẾ GIỚI)
// =============================================================================
const GEOGRAPHY_QUESTIONS = [
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
// 3. GAME STATE
// =============================================================================
let currentQuestionIndex = 0;
let currentTeamTurn = 'blue'; // 'blue' | 'red'
let ropePosition = 0; // -100 (Blue win) to +100 (Red win)
let blueScore = 0;
let redScore = 0;
let countdown = 30;
let timerInterval = null;
let isEvaluating = false;
let isFinished = false;
let gameMode = 'bot'; // 'bot' | 'pvp'
let soundEnabled = true;
let questionHistory = []; // { isCorrect, team, chosenIdx }

// =============================================================================
// 4. WEB AUDIO API SOUND GENERATOR (ZERO ASSET DEPENDENCIES)
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
    // Audio autostart policy safe
  }
}

function soundTick() {
  playTone(800, 'sine', 0.05, 0.1);
}

function soundUrgentTick() {
  playTone(1000, 'triangle', 0.08, 0.25);
}

function soundPullRope() {
  // Heave "Hò-zô" sound effect
  playTone(160, 'sawtooth', 0.35, 0.25);
  setTimeout(() => playTone(240, 'triangle', 0.25, 0.2), 120);
}

function soundCorrect() {
  // Bright arpeggio chime
  playTone(523.25, 'sine', 0.15, 0.2); // C5
  setTimeout(() => playTone(659.25, 'sine', 0.15, 0.2), 90); // E5
  setTimeout(() => playTone(783.99, 'sine', 0.18, 0.2), 180); // G5
  setTimeout(() => playTone(1046.5, 'sine', 0.3, 0.25), 270); // C6
}

function soundWrong() {
  // Low buzzer
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
// 5. ATHLETES SPRITE RENDERING (5 BLUE VS 5 RED)
// =============================================================================
function renderAthletes() {
  const blueSquad = document.getElementById('blue-squad-container');
  const redSquad = document.getElementById('red-squad-container');
  if (!blueSquad || !redSquad) return;

  // Blue squad (reversed order so anchor #5 Lý is furthest left, pioneer #1 Quá is closest to rope knot)
  blueSquad.innerHTML = [...BLUE_TEAM].reverse().map(m => `
    <div class="athlete-figure">
      <div class="athlete-nametag nametag-blue">#${m.id} ${m.name}</div>
      <svg viewBox="0 0 40 60" style="width: 28px; height: 42px;">
        <!-- Head with blue headband -->
        <circle cx="20" cy="13" r="8" fill="#3b82f6"/>
        <rect x="12" y="11" width="16" height="3" rx="1.5" fill="#1e3a8a"/>
        <!-- Eyes -->
        <circle cx="18" cy="13" r="1.5" fill="#ffffff"/>
        <circle cx="22" cy="13" r="1.5" fill="#ffffff"/>
        <!-- Torso pulling back left -->
        <path d="M13 22 L27 22 L24 43 L14 43 Z" fill="#1d4ed8"/>
        <!-- Arms grabbing rope -->
        <path d="M14 26 L5 32 L12 35" stroke="#93c5fd" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M26 26 L16 33 L22 36" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- Legs braced back -->
        <path d="M15 43 L9 56 M23 43 L19 56" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    </div>
  `).join('');

  // Red squad (Anchor #5 Long is furthest right, pioneer #1 Sơn is closest to rope knot)
  redSquad.innerHTML = RED_TEAM.map(m => `
    <div class="athlete-figure">
      <div class="athlete-nametag nametag-red">#${m.id} ${m.name}</div>
      <svg viewBox="0 0 40 60" style="width: 28px; height: 42px;">
        <!-- Head with red headband -->
        <circle cx="20" cy="13" r="8" fill="#ef4444"/>
        <rect x="12" y="11" width="16" height="3" rx="1.5" fill="#7f1d1d"/>
        <!-- Eyes -->
        <circle cx="18" cy="13" r="1.5" fill="#ffffff"/>
        <circle cx="22" cy="13" r="1.5" fill="#ffffff"/>
        <!-- Torso pulling back right -->
        <path d="M13 22 L27 22 L26 43 L16 43 Z" fill="#b91c1c"/>
        <!-- Arms grabbing rope -->
        <path d="M27 26 L35 32 L28 35" stroke="#fca5a5" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M15 26 L24 33 L18 36" stroke="#f87171" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- Legs braced back -->
        <path d="M17 43 L21 56 M25 43 L31 56" stroke="#7f1d1d" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    </div>
  `).join('');

  // Render Roster mini lists
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
// 6. QUESTION RENDERING & CONTROLS
// =============================================================================
function renderQuestion() {
  const q = GEOGRAPHY_QUESTIONS[currentQuestionIndex];
  const isBlue = currentTeamTurn === 'blue';

  // Numbers
  document.getElementById('blue-q-current').innerText = currentQuestionIndex + 1;
  document.getElementById('red-q-current').innerText = currentQuestionIndex + 1;

  // Text
  document.getElementById('blue-q-text').innerText = q.question;
  document.getElementById('red-q-text').innerText = q.question;

  // Active status styles
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

  // Blue options
  const blueContainer = document.getElementById('blue-options-container');
  blueContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="ans-btn" onclick="handleSelectAnswer('blue', ${idx})" ${!isBlue || isEvaluating ? 'disabled' : ''}>
      <span class="ans-key key-blue">${['A','B','C','D'][idx]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  // Red options
  const redContainer = document.getElementById('red-options-container');
  redContainer.innerHTML = q.options.map((opt, idx) => `
    <button class="ans-btn" onclick="handleSelectAnswer('red', ${idx})" ${isBlue || isEvaluating || (gameMode === 'bot') ? 'disabled' : ''}>
      <span class="ans-key key-red">${['A','B','C','D'][idx]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  renderProgressDots();
  startTimer();

  // If Red's turn in Bot Mode, simulate thinking and answering
  if (!isBlue && gameMode === 'bot' && !isEvaluating && !isFinished) {
    setTimeout(() => {
      if (currentTeamTurn === 'red' && !isEvaluating && !isFinished) {
        const willBeCorrect = Math.random() < 0.72; // Bot has 72% accuracy
        const botChoice = willBeCorrect ? q.correctIndex : (q.correctIndex + 1) % 4;
        handleSelectAnswer('red', botChoice);
      }
    }, 1600);
  }
}

// Progress Stepper 10 Questions
function renderProgressDots() {
  const container = document.getElementById('dots-stepper');
  if (!container) return;

  container.innerHTML = Array.from({ length: 10 }).map((_, idx) => {
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
// 7. TIMER 30S LOGIC
// =============================================================================
function startTimer() {
  clearInterval(timerInterval);
  countdown = 30;
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
      // Timeout counts as wrong answer
      handleSelectAnswer(currentTeamTurn, -1);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const isBlue = currentTeamTurn === 'blue';
  const pct = (countdown / 30) * 100;

  const blueCountdown = document.getElementById('blue-countdown');
  const blueBar = document.getElementById('blue-timer-bar');
  const redCountdown = document.getElementById('red-countdown');
  const redBar = document.getElementById('red-timer-bar');

  if (isBlue) {
    blueCountdown.innerText = `${countdown}s`;
    blueBar.style.width = `${pct}%`;
    blueBar.className = countdown <= 5 ? 'timer-bar-inner timer-bar-urgent' : 'timer-bar-inner timer-bar-blue';
    redCountdown.innerText = '30s';
    redBar.style.width = '100%';
    redBar.className = 'timer-bar-inner timer-bar-red';
  } else {
    redCountdown.innerText = `${countdown}s`;
    redBar.style.width = `${pct}%`;
    redBar.className = countdown <= 5 ? 'timer-bar-inner timer-bar-urgent' : 'timer-bar-inner timer-bar-red';
    blueCountdown.innerText = '30s';
    blueBar.style.width = '100%';
    blueBar.className = 'timer-bar-inner timer-bar-blue';
  }
}

// =============================================================================
// 8. EVALUATION & TUG-OF-WAR PULL ACTION
// =============================================================================
window.handleSelectAnswer = function(team, chosenIdx) {
  if (isEvaluating || isFinished || team !== currentTeamTurn) return;
  isEvaluating = true;
  clearInterval(timerInterval);

  const q = GEOGRAPHY_QUESTIONS[currentQuestionIndex];
  const isCorrect = chosenIdx === q.correctIndex;
  let pullTeam = team;
  let strokes = 1;

  if (isCorrect) {
    // Correct: current team pulls 1 stroke
    pullTeam = team;
    strokes = 1;
    soundCorrect();
    if (team === 'blue') blueScore++; else redScore++;
  } else {
    // Wrong: opponent team pulls 2 strokes
    pullTeam = team === 'blue' ? 'red' : 'blue';
    strokes = 2;
    soundWrong();
  }

  questionHistory[currentQuestionIndex] = { isCorrect, team, chosenIdx };

  // Calculate rope displacement: Blue shifts negative (-), Red shifts positive (+)
  // 1 stroke = 15%, 2 strokes = 30%
  const shiftAmount = (pullTeam === 'blue' ? -15 : 15) * strokes;
  ropePosition = Math.max(-100, Math.min(100, ropePosition + shiftAmount));

  // Update arena visual & audio
  setTimeout(soundPullRope, 250);
  updateArenaPosition();
  showEvaluationCard(isCorrect, pullTeam, strokes, q);

  // Check early victory if rope reached threshold
  if (ropePosition <= -100 || ropePosition >= 100 || currentQuestionIndex === 9) {
    setTimeout(finishMatch, 1600);
  }
};

function updateArenaPosition() {
  // Max pixel offset on stage
  const maxPx = 60;
  const pixelOffset = (ropePosition / 100) * maxPx;
  const stage = document.getElementById('pull-stage-canvas');
  if (stage) {
    stage.style.transform = `translateX(${pixelOffset}px)`;
  }

  // Advantage percentages
  const bluePercent = Math.round(50 - (ropePosition / 2));
  const redPercent = 100 - bluePercent;

  document.getElementById('gauge-fill-blue').style.width = `${bluePercent}%`;
  document.getElementById('gauge-fill-red').style.width = `${redPercent}%`;
  document.getElementById('gauge-label-blue').innerText = `Xanh ${bluePercent}%`;
  document.getElementById('gauge-label-red').innerText = `Đỏ ${redPercent}%`;

  // Score text
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

  expl.innerHTML = `<strong>Đáp án đúng:</strong> ${q.options[q.correctIndex]}<br><span style="display:inline-block; margin-top:4px;">${q.explanation}</span>`;
}

// Next Question button listener
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('btn-next-step');
  if (nextBtn) {
    nextBtn.addEventListener('click', proceedToNext);
  }
});

function proceedToNext() {
  if (isFinished) return;
  document.getElementById('evaluation-card').style.display = 'none';
  isEvaluating = false;

  if (currentQuestionIndex < 9) {
    currentQuestionIndex++;
    // Alternate turn between Blue and Red
    currentTeamTurn = currentTeamTurn === 'blue' ? 'red' : 'blue';
    renderQuestion();
  } else {
    finishMatch();
  }
}

// =============================================================================
// 9. VICTORY & RESTART
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
    sub.innerText = 'Quá, Mập, Nhiên, Hạo và Lý đã kéo dây qua vạch và giành chiến thắng ngoạn mục!';
  } else if (winner === 'red') {
    title.innerText = '🏆 ĐỘI ĐỎ VÔ ĐỊCH!';
    title.style.color = '#f87171';
    sub.innerText = 'Sơn, Hải, Đức, Cường và Long đã kéo dây qua vạch và giành chiến thắng ngoạn mục!';
  } else {
    title.innerText = '🤝 KẾT QUẢ HÒA!';
    title.style.color = '#fbbf24';
    sub.innerText = 'Hai đội ngang tài ngang sức trên từng mét dây!';
  }

  document.getElementById('final-score-blue').innerText = `${blueScore}/10`;
  document.getElementById('final-score-red').innerText = `${redScore}/10`;
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

  document.getElementById('evaluation-card').style.display = 'none';
  document.getElementById('victory-modal').style.display = 'none';
  updateArenaPosition();
  renderQuestion();
}

// =============================================================================
// 10. MODAL TOGGLES & TOOLBAR LISTENERS
// =============================================================================
window.addEventListener('DOMContentLoaded', () => {
  renderAthletes();
  renderQuestion();
  updateArenaPosition();

  // Reset Button
  const btnRestart = document.getElementById('btn-reset-game');
  if (btnRestart) btnRestart.addEventListener('click', resetGame);

  const btnPlayAgain = document.getElementById('btn-modal-play-again');
  if (btnPlayAgain) btnPlayAgain.addEventListener('click', resetGame);

  // Mode select
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

  // Close modals on clicking backdrop
  [rulesModal, rosterModal, document.getElementById('victory-modal')].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m && m.id !== 'victory-modal') {
          m.style.display = 'none';
        }
      });
    }
  });
});
