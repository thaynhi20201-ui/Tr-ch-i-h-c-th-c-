/**
 * JavaScript Game Logic for Trò Chơi Kéo Co Địa Lý 5v5
 * Supports 10 questions, 30s timer, rope pull mechanics, and Web Audio API
 */

// 1. DATA: 10 CÂU HỎI ĐỊA LÝ
const GEOGRAPHY_QUESTIONS = [
  {
    question: 'Đỉnh núi nào được mệnh danh là "Nóc nhà Đông Dương" nằm tại Việt Nam?',
    options: ['Fansipan', 'Ngọc Linh', 'Bạch Mộc Lương Tử', 'Pu Si Lung'],
    correctIndex: 0,
    explanation: 'Đỉnh Fansipan cao 3.143m thuộc dãy Hoàng Liên Sơn, tỉnh Lào Cai, là đỉnh núi cao nhất 3 nước Đông Dương.'
  },
  {
    question: 'Hang động tự nhiên lớn nhất thế giới Sơn Đoòng nằm ở tỉnh nào của Việt Nam?',
    options: ['Ninh Bình', 'Quảng Bình', 'Hà Giang', 'Cao Bằng'],
    correctIndex: 1,
    explanation: 'Hang Sơn Đoòng thuộc Vườn quốc gia Phong Nha - Kẻ Bàng, tỉnh Quảng Bình, là hang động tự nhiên kỳ vĩ nhất thế giới.'
  },
  {
    question: 'Dòng sông nào dài nhất thế giới, chảy qua phần lớn khu vực Đông Bắc châu Phi?',
    options: ['Sông Amazon', 'Sông Nin (Nile)', 'Sông Mê Kông', 'Sông Dương Tử'],
    correctIndex: 1,
    explanation: 'Sông Nin dài khoảng 6.650 km, chảy qua 11 quốc gia châu Phi và đổ ra Địa Trung Hải.'
  },
  {
    question: 'Đại dương nào có diện tích và độ sâu trung bình lớn nhất trên Trái Đất?',
    options: ['Đại Tây Dương', 'Ấn Độ Dương', 'Bắc Băng Dương', 'Thái Bình Dương'],
    correctIndex: 3,
    explanation: 'Thái Bình Dương chiếm hơn 30% diện tích bề mặt Trái Đất và chứa rãnh Mariana sâu gần 11.000m.'
  },
  {
    question: 'Đảo nào có diện tích tự nhiên lớn nhất tại Việt Nam?',
    options: ['Đảo Phú Quốc', 'Đảo Cát Bà', 'Đảo Lý Sơn', 'Côn Đảo'],
    correctIndex: 0,
    explanation: 'Đảo Phú Quốc (Kiên Giang) có diện tích khoảng 589 km², là hòn đảo lớn nhất Việt Nam.'
  },
  {
    question: 'Sa mạc cát nóng lớn nhất thế giới nằm ở châu lục nào?',
    options: ['Châu Á (Gobi)', 'Châu Phi (Sahara)', 'Châu Úc', 'Châu Mỹ'],
    correctIndex: 1,
    explanation: 'Sa mạc Sahara nằm ở Bắc Phi có diện tích hơn 9 triệu km², gần bằng diện tích cả Hoa Kỳ.'
  },
  {
    question: 'Dãy núi cao nhất hành tinh với đỉnh Everest (8.848m) có tên là gì?',
    options: ['Dãy Andes', 'Dãy Alps', 'Dãy Himalaya', 'Dãy Rocky'],
    correctIndex: 2,
    explanation: 'Dãy Himalaya nằm giữa cao nguyên Tây Tạng và tiểu lục địa Ấn Độ, có đỉnh Everest cao nhất thế giới.'
  },
  {
    question: 'Thác nước tự nhiên hùng vĩ nằm trên biên giới giữa Việt Nam và Trung Quốc là thác nào?',
    options: ['Thác Cam Ly', 'Thác Bản Giốc', 'Thác Datanla', 'Thác Pongour'],
    correctIndex: 1,
    explanation: 'Thác Bản Giốc nằm tại huyện Trùng Khánh, tỉnh Cao Bằng, là một trong những thác biên giới đẹp nhất hành tinh.'
  },
  {
    question: 'Rừng mưa nhiệt đới lớn nhất thế giới, được coi là "lá phổi xanh của Trái Đất" là gì?',
    options: ['Rừng Cúc Phương', 'Rừng Taiga', 'Rừng Amazon', 'Rừng Đen'],
    correctIndex: 2,
    explanation: 'Rừng nhiệt đới Amazon trải rộng khắp Nam Mỹ, tạo ra lượng oxy và là nơi cư trú sinh thái khổng lồ.'
  },
  {
    question: 'Hai quần đảo Hoàng Sa và Trường Sa là một phần máu thịt thiêng liêng thuộc chủ quyền của quốc gia nào?',
    options: ['Việt Nam', 'Indonesia', 'Philippines', 'Malaysia'],
    correctIndex: 0,
    explanation: 'Việt Nam có đầy đủ bằng chứng lịch sử và căn cứ pháp lý khẳng định chủ quyền đối với Hoàng Sa và Trường Sa.'
  }
];

// 2. TEAMS ROSTER
const BLUE_TEAM = [
  { id: 1, name: 'Quá' },
  { id: 2, name: 'Mập' },
  { id: 3, name: 'Nhiên' },
  { id: 4, name: 'Hạo' },
  { id: 5, name: 'Lý' }
];

const RED_TEAM = [
  { id: 1, name: 'Sơn' },
  { id: 2, name: 'Hải' },
  { id: 3, name: 'Đức' },
  { id: 4, name: 'Cường' },
  { id: 5, name: 'Long' }
];

// 3. GAME STATE
let currentQuestionIndex = 0;
let currentTeamTurn = 'blue';
let ropePosition = 0; // -100 to +100
let blueScore = 0;
let redScore = 0;
let countdown = 30;
let timerInterval = null;
let isEvaluating = false;
let isFinished = false;
let gameMode = 'bot';
let soundEnabled = true;
let questionHistory = [];

// Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playTone(freq, type = 'sine', duration = 0.2) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function soundPull() { playTone(180, 'sawtooth', 0.25); }
function soundCorrect() {
  playTone(523.25, 'sine', 0.15);
  setTimeout(() => playTone(659.25, 'sine', 0.15), 100);
  setTimeout(() => playTone(783.99, 'sine', 0.3), 200);
}
function soundWrong() {
  playTone(220, 'sawtooth', 0.2);
  setTimeout(() => playTone(174.6, 'sawtooth', 0.35), 180);
}
function soundVictory() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    setTimeout(() => playTone(f, 'triangle', 0.4), i * 150);
  });
}

// 4. RENDERING SPRITES
function renderSprites() {
  const blueBox = document.getElementById('blue-team-sprites');
  const redBox = document.getElementById('red-team-sprites');
  if (!blueBox || !redBox) return;

  blueBox.innerHTML = [...BLUE_TEAM].reverse().map(m => `
    <div class="player-sprite">
      <div class="player-tag tag-blue">#${m.id} ${m.name}</div>
      <svg viewBox="0 0 40 60" style="width: 26px; height: 38px;">
        <circle cx="20" cy="14" r="8" fill="#3b82f6"/>
        <circle cx="18" cy="13" r="1.5" fill="#fff"/>
        <circle cx="22" cy="13" r="1.5" fill="#fff"/>
        <path d="M12 24 L28 24 L25 45 L15 45 Z" fill="#1d4ed8"/>
        <path d="M14 28 L6 34 L12 36" stroke="#93c5fd" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M16 45 L12 58 M24 45 L22 58" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    </div>
  `).join('');

  redBox.innerHTML = RED_TEAM.map(m => `
    <div class="player-sprite">
      <div class="player-tag tag-red">#${m.id} ${m.name}</div>
      <svg viewBox="0 0 40 60" style="width: 26px; height: 38px;">
        <circle cx="20" cy="14" r="8" fill="#ef4444"/>
        <circle cx="18" cy="13" r="1.5" fill="#fff"/>
        <circle cx="22" cy="13" r="1.5" fill="#fff"/>
        <path d="M12 24 L28 24 L25 45 L15 45 Z" fill="#b91c1c"/>
        <path d="M26 28 L34 34 L28 36" stroke="#fca5a5" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M16 45 L18 58 M24 45 L28 58" stroke="#7f1d1d" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    </div>
  `).join('');
}

// 5. RENDERING QUESTION
function renderQuestion() {
  const q = GEOGRAPHY_QUESTIONS[currentQuestionIndex];
  const isBlue = currentTeamTurn === 'blue';

  document.getElementById('blue-q-num').innerText = currentQuestionIndex + 1;
  document.getElementById('red-q-num').innerText = currentQuestionIndex + 1;
  document.getElementById('blue-question-text').innerText = q.question;
  document.getElementById('red-question-text').innerText = q.question;

  const bluePanel = document.getElementById('blue-panel');
  const redPanel = document.getElementById('red-panel');
  const blueBadge = document.getElementById('blue-turn-badge');
  const redBadge = document.getElementById('red-turn-badge');

  if (isBlue) {
    bluePanel.className = 'quiz-panel blue-active';
    redPanel.className = 'quiz-panel inactive';
    blueBadge.className = 'turn-pill active-blue';
    blueBadge.innerText = 'LƯỢT TRẢ LỜI';
    redBadge.className = 'turn-pill wait';
    redBadge.innerText = 'CHỜ LƯỢT';
  } else {
    redPanel.className = 'quiz-panel red-active';
    bluePanel.className = 'quiz-panel inactive';
    redBadge.className = 'turn-pill active-red';
    redBadge.innerText = gameMode === 'bot' ? 'MÁY SUY NGHĨ...' : 'LƯỢT TRẢ LỜI';
    blueBadge.className = 'turn-pill wait';
    blueBadge.innerText = 'CHỜ LƯỢT';
  }

  // Options Blue
  document.getElementById('blue-options-container').innerHTML = q.options.map((opt, idx) => `
    <button class="opt-btn" onclick="handleAnswer('blue', ${idx})" ${!isBlue || isEvaluating ? 'disabled' : ''}>
      <span class="opt-key key-blue">${['A','B','C','D'][idx]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  // Options Red
  document.getElementById('red-options-container').innerHTML = q.options.map((opt, idx) => `
    <button class="opt-btn" onclick="handleAnswer('red', ${idx})" ${isBlue || isEvaluating || (gameMode === 'bot') ? 'disabled' : ''}>
      <span class="opt-key key-red">${['A','B','C','D'][idx]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  renderDots();
  resetTimer();

  // Bot response
  if (!isBlue && gameMode === 'bot' && !isEvaluating && !isFinished) {
    setTimeout(() => {
      if (currentTeamTurn === 'red' && !isEvaluating && !isFinished) {
        const willBeCorrect = Math.random() < 0.7;
        const botChoice = willBeCorrect ? q.correctIndex : (q.correctIndex + 1) % 4;
        handleAnswer('red', botChoice);
      }
    }, 1500);
  }
}

function renderDots() {
  const container = document.getElementById('dots-progress');
  if (!container) return;
  container.innerHTML = Array.from({ length: 10 }).map((_, i) => {
    const h = questionHistory[i];
    let cls = 'dot-step';
    if (h) {
      cls += h.isCorrect ? ' correct' : ' wrong';
    } else if (i === currentQuestionIndex) {
      cls += ' active';
    }
    return `<div class="${cls}">${i + 1}</div>`;
  }).join('');
}

// 6. TIMER 30S
function resetTimer() {
  clearInterval(timerInterval);
  countdown = 30;
  updateTimerUI();

  timerInterval = setInterval(() => {
    if (isEvaluating || isFinished) return;
    countdown--;
    updateTimerUI();

    if (countdown <= 5 && countdown > 0) {
      playTone(440, 'sine', 0.05);
    }
    if (countdown <= 0) {
      clearInterval(timerInterval);
      handleAnswer(currentTeamTurn, -1);
    }
  }, 1000);
}

function updateTimerUI() {
  const isBlue = currentTeamTurn === 'blue';
  const pct = (countdown / 30) * 100;

  const blueCount = document.getElementById('blue-countdown');
  const blueBar = document.getElementById('blue-timer-bar');
  const redCount = document.getElementById('red-countdown');
  const redBar = document.getElementById('red-timer-bar');

  if (isBlue) {
    blueCount.innerText = `${countdown}s`;
    blueBar.style.width = `${pct}%`;
    blueBar.className = countdown <= 5 ? 'timer-bar-fill bar-urgent' : 'timer-bar-fill bar-blue';
    redCount.innerText = '30s';
    redBar.style.width = '100%';
  } else {
    redCount.innerText = `${countdown}s`;
    redBar.style.width = `${pct}%`;
    redBar.className = countdown <= 5 ? 'timer-bar-fill bar-urgent' : 'timer-bar-fill bar-red';
    blueCount.innerText = '30s';
    blueBar.style.width = '100%';
  }
}

// 7. ANSWER HANDLER
window.handleAnswer = function(team, chosenIdx) {
  if (isEvaluating || isFinished || team !== currentTeamTurn) return;
  isEvaluating = true;
  clearInterval(timerInterval);

  const q = GEOGRAPHY_QUESTIONS[currentQuestionIndex];
  const isCorrect = chosenIdx === q.correctIndex;
  let pulledTeam = team;
  let strokeCount = 1;

  if (isCorrect) {
    pulledTeam = team;
    strokeCount = 1;
    soundCorrect();
    if (team === 'blue') blueScore++; else redScore++;
  } else {
    pulledTeam = team === 'blue' ? 'red' : 'blue';
    strokeCount = 2;
    soundWrong();
  }

  questionHistory[currentQuestionIndex] = { isCorrect, team };

  const delta = (pulledTeam === 'blue' ? -15 : 15) * strokeCount;
  ropePosition = Math.max(-100, Math.min(100, ropePosition + delta));
  updateArenaUI();

  setTimeout(soundPull, 200);
  showResultCard(isCorrect, pulledTeam, strokeCount, q);

  if (ropePosition <= -100 || ropePosition >= 100 || currentQuestionIndex === 9) {
    setTimeout(checkVictory, 1500);
  }
};

function updateArenaUI() {
  const maxShiftPx = 50;
  const px = (ropePosition / 100) * maxShiftPx;
  document.getElementById('dynamic-pull-stage').style.transform = `translateX(${px}px)`;

  const bluePct = Math.round(50 - (ropePosition / 2));
  const redPct = 100 - bluePct;
  document.getElementById('gauge-blue').style.width = `${bluePct}%`;
  document.getElementById('gauge-red').style.width = `${redPct}%`;
  document.getElementById('gauge-blue-text').innerText = `Xanh ${bluePct}%`;
  document.getElementById('gauge-red-text').innerText = `Đỏ ${redPct}%`;

  document.getElementById('blue-score').innerText = blueScore;
  document.getElementById('red-score').innerText = redScore;
}

function showResultCard(isCorrect, pulledTeam, strokeCount, q) {
  const card = document.getElementById('result-card');
  const badge = document.getElementById('result-badge');
  const expl = document.getElementById('result-explanation');

  card.style.display = 'block';
  if (isCorrect) {
    card.className = 'explanation-banner exp-correct';
    badge.innerHTML = `✅ TRẢ LỜI ĐÚNG! Đội ${pulledTeam === 'blue' ? 'Xanh' : 'Đỏ'} kéo 1 nhịp`;
  } else {
    card.className = 'explanation-banner exp-wrong';
    badge.innerHTML = `❌ TRẢ LỜI CHƯA ĐÚNG! Đội ${pulledTeam === 'blue' ? 'Xanh' : 'Đỏ'} kéo 2 nhịp!`;
  }

  expl.innerHTML = `<strong>Đáp án đúng:</strong> ${q.options[q.correctIndex]}<br><span style="display:inline-block; margin-top:4px;">${q.explanation}</span>`;
}

// Next question
document.getElementById('btn-next-question').addEventListener('click', () => {
  if (isFinished) return;
  document.getElementById('result-card').style.display = 'none';
  isEvaluating = false;

  if (currentQuestionIndex < 9) {
    currentQuestionIndex++;
    currentTeamTurn = currentTeamTurn === 'blue' ? 'red' : 'blue';
    renderQuestion();
  } else {
    checkVictory();
  }
});

function checkVictory() {
  isFinished = true;
  clearInterval(timerInterval);
  soundVictory();

  let winner = 'draw';
  if (ropePosition <= -100) winner = 'blue';
  else if (ropePosition >= 100) winner = 'red';
  else if (ropePosition < 0) winner = 'blue';
  else if (ropePosition > 0) winner = 'red';

  const modal = document.getElementById('victory-modal');
  const title = document.getElementById('victory-title');
  const sub = document.getElementById('victory-subtitle');

  modal.style.display = 'flex';
  if (winner === 'blue') {
    title.innerText = '🏆 ĐỘI XANH VÔ ĐỊCH!';
    title.style.color = '#60a5fa';
    sub.innerText = 'Chúc mừng Quá, Mập, Nhiên, Hạo và Lý đã xuất sắc chiến thắng!';
  } else if (winner === 'red') {
    title.innerText = '🏆 ĐỘI ĐỎ VÔ ĐỊCH!';
    title.style.color = '#f87171';
    sub.innerText = 'Chúc mừng Sơn, Hải, Đức, Cường và Long đã xuất sắc chiến thắng!';
  } else {
    title.innerText = '🤝 KẾT QUẢ HÒA!';
    title.style.color = '#fbbf24';
    sub.innerText = 'Cả hai đội đều ngang tài ngang sức!';
  }

  document.getElementById('final-blue-score').innerText = `${blueScore}/10`;
  document.getElementById('final-red-score').innerText = `${redScore}/10`;
}

function restartGame() {
  currentQuestionIndex = 0;
  currentTeamTurn = 'blue';
  ropePosition = 0;
  blueScore = 0;
  redScore = 0;
  isEvaluating = false;
  isFinished = false;
  questionHistory = [];
  document.getElementById('result-card').style.display = 'none';
  document.getElementById('victory-modal').style.display = 'none';
  updateArenaUI();
  renderQuestion();
}

document.getElementById('btn-restart-match').addEventListener('click', restartGame);
document.getElementById('btn-play-again').addEventListener('click', restartGame);

document.getElementById('game-mode-select').addEventListener('change', (e) => {
  gameMode = e.target.value;
  restartGame();
});

document.getElementById('btn-sound-toggle').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  document.getElementById('sound-label').innerText = soundEnabled ? 'Bật' : 'Tắt';
});

// Boot
window.addEventListener('DOMContentLoaded', () => {
  renderSprites();
  renderQuestion();
  updateArenaUI();
});
