/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameMode,
  GameStatus,
  BotDifficulty,
  PlayerMember,
  TeamId,
  GamePlayType,
  QuizTurnMode,
  GeoQuestion,
} from './types';
import { DEFAULT_BLUE_TEAM, DEFAULT_RED_TEAM } from './data/roster';
import { getRandom10Questions } from './data/geographyQuestions';
import { soundFx } from './utils/audio';
import { RopeArena } from './components/RopeArena';
import { ScoreBoard } from './components/ScoreBoard';
import { ControlPanel } from './components/ControlPanel';
import { GeographyQuizPanel } from './components/GeographyQuizPanel';
import { TeamRosterModal } from './components/TeamRosterModal';
import { VictoryModal } from './components/VictoryModal';
import { Trophy, Swords, HelpCircle, RotateCcw, FileCode, Download } from 'lucide-react';

export default function App() {
  // Team Rosters (5 members each)
  const [blueTeam, setBlueTeam] = useState<PlayerMember[]>(DEFAULT_BLUE_TEAM);
  const [redTeam, setRedTeam] = useState<PlayerMember[]>(DEFAULT_RED_TEAM);

  // Match settings
  const [gamePlayType, setGamePlayType] = useState<GamePlayType>('quiz');
  const [quizTurnMode, setQuizTurnMode] = useState<QuizTurnMode>('alternate');
  const [gameMode, setGameMode] = useState<GameMode>('pve');
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium');
  const [bestOf, setBestOf] = useState<1 | 3 | 5>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Match progression
  const [status, setStatus] = useState<GameStatus>('playing');
  const [countdown, setCountdown] = useState(3);
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundWinner, setRoundWinner] = useState<TeamId | null>(null);
  const [winReason, setWinReason] = useState<string>('');

  // Tug physics state: -100 (Blue Win) to +100 (Red Win)
  const [ropePosition, setRopePosition] = useState(0);
  const ropePosRef = useRef(0);
  const velocityRef = useRef(0);

  // Real-time statistics & visual states
  const [bluePulls, setBluePulls] = useState(0);
  const [redPulls, setRedPulls] = useState(0);
  const [isBluePulling, setIsBluePulling] = useState(false);
  const [isRedPulling, setIsRedPulling] = useState(false);
  const [blueCps, setBlueCps] = useState(0);
  const [redCps, setRedCps] = useState(0);

  // Rhythm bar state (for Speed mode)
  const [rhythmPosition, setRhythmPosition] = useState(50);
  const rhythmDirectionRef = useRef(1);

  // 10 Geography Questions State
  const [questions, setQuestions] = useState<GeoQuestion[]>(() => getRandom10Questions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState<{
    isCorrect: boolean;
    pulledTeam: TeamId;
    strokes: number;
  } | null>(null);
  const [quizHistory, setQuizHistory] = useState<
    Array<{
      questionIndex: number;
      team: TeamId;
      isCorrect: boolean;
    }>
  >([]);
  const [quizCorrectCount, setQuizCorrectCount] = useState<{ blue: number; red: number }>({
    blue: 0,
    red: 0,
  });

  // Modals
  const [isRosterOpen, setIsRosterOpen] = useState(false);

  // Pull timestamps for CPS calculation in speed mode
  const blueClickTimesRef = useRef<number[]>([]);
  const redClickTimesRef = useRef<number[]>([]);

  // Sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setEnabled(next);
  };

  // Rhythm sweet spot (for Speed mode)
  const isSweetSpot = rhythmPosition >= 40 && rhythmPosition <= 60;

  // Strength multiplier from 5 team members
  const blueStrengthFactor =
    blueTeam.reduce((acc, cur) => acc + cur.strength, 0) / (blueTeam.length * 85);
  const redStrengthFactor =
    redTeam.reduce((acc, cur) => acc + cur.strength, 0) / (redTeam.length * 85);

  // Current answering team for Quiz
  const currentQuizTeamTurn: TeamId =
    quizTurnMode === 'blue_solo'
      ? 'blue'
      : currentQuestionIndex % 2 === 0
      ? 'blue'
      : 'red';

  // Manual speed pulls
  const handleBluePull = useCallback(() => {
    if (status !== 'playing') return;
    const now = performance.now();
    blueClickTimesRef.current.push(now);

    setBluePulls((prev) => prev + 1);
    setIsBluePulling(true);
    setTimeout(() => setIsBluePulling(false), 120);

    const bonus = isSweetSpot ? 1.5 : 1.0;
    soundFx.playPull(isSweetSpot);

    const pullForce = 3.6 * bonus * blueStrengthFactor;
    velocityRef.current -= pullForce;
  }, [status, isSweetSpot, blueStrengthFactor]);

  const handleRedPull = useCallback(() => {
    if (status !== 'playing') return;
    const now = performance.now();
    redClickTimesRef.current.push(now);

    setRedPulls((prev) => prev + 1);
    setIsRedPulling(true);
    setTimeout(() => setIsRedPulling(false), 120);

    const bonus = isSweetSpot ? 1.5 : 1.0;
    soundFx.playPull(isSweetSpot);

    const pullForce = 3.6 * bonus * redStrengthFactor;
    velocityRef.current += pullForce;
  }, [status, isSweetSpot, redStrengthFactor]);

  // Execute distinct strokes for Quiz: 1 stroke if correct, 2 strokes if wrong!
  const executeQuizStrokes = useCallback(
    (pullingTeam: TeamId, strokes: number) => {
      // 1 stroke moves rope by approximately ~14%
      const forcePerStroke = 26;

      for (let i = 0; i < strokes; i++) {
        setTimeout(() => {
          if (pullingTeam === 'blue') {
            setIsBluePulling(true);
            setTimeout(() => setIsBluePulling(false), 240);
            soundFx.playPull(true);
            velocityRef.current -= forcePerStroke * blueStrengthFactor;
            setBluePulls((prev) => prev + 1);
          } else {
            setIsRedPulling(true);
            setTimeout(() => setIsRedPulling(false), 240);
            soundFx.playPull(true);
            velocityRef.current += forcePerStroke * redStrengthFactor;
            setRedPulls((prev) => prev + 1);
          }
        }, i * 360);
      }
    },
    [blueStrengthFactor, redStrengthFactor]
  );

  // Finish match / round
  const handleEndRound = useCallback(
    (winner: TeamId, reason?: string) => {
      setStatus('ended');
      setRoundWinner(winner);
      setWinReason(
        reason ||
          (winner === 'blue'
            ? 'Đội Xanh đã xuất sắc kéo dây vượt qua vạch mốc!'
            : 'Đội Đỏ đã xuất sắc kéo dây vượt qua vạch mốc!')
      );
      soundFx.playWin();

      if (winner === 'blue') {
        setBlueScore((prev) => prev + 1);
      } else {
        setRedScore((prev) => prev + 1);
      }
    },
    []
  );

  // Handling Geography Quiz Answer
  const handleQuizAnswer = useCallback(
    (selectedIndex: number) => {
      if (isEvaluating || status === 'ended') return;

      const currentQ = questions[currentQuestionIndex];
      if (!currentQ) return;

      setIsEvaluating(true);
      setSelectedAnswer(selectedIndex);

      const isCorrect = selectedIndex === currentQ.correctIndex;
      const answeringTeam = currentQuizTeamTurn;

      // RULE:
      // Trả lời đúng -> Kéo 1 nhịp
      // Trả lời sai -> Đội còn lại kéo 2 nhịp
      let pulledTeam: TeamId;
      let strokes: number;

      if (isCorrect) {
        pulledTeam = answeringTeam;
        strokes = 1;
        soundFx.playCorrect();
        setQuizCorrectCount((prev) => ({
          ...prev,
          [answeringTeam]: prev[answeringTeam] + 1,
        }));
      } else {
        pulledTeam = answeringTeam === 'blue' ? 'red' : 'blue';
        strokes = 2;
        soundFx.playWrong();
      }

      setLastQuizResult({
        isCorrect,
        pulledTeam,
        strokes,
      });

      setQuizHistory((prev) => [
        ...prev,
        {
          questionIndex: currentQuestionIndex,
          team: answeringTeam,
          isCorrect,
        },
      ]);

      // Trigger the physics stroke(s)
      executeQuizStrokes(pulledTeam, strokes);
    },
    [isEvaluating, status, questions, currentQuestionIndex, currentQuizTeamTurn, executeQuizStrokes]
  );

  // Next Question or end of 10 questions
  const handleNextQuestion = () => {
    if (status === 'ended') return;

    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsEvaluating(false);
      setLastQuizResult(null);
    } else {
      // 10 questions completed! Check rope position to decide winner
      setIsEvaluating(false);
      if (ropePosRef.current < -5) {
        handleEndRound(
          'blue',
          `Sau 10 câu hỏi Địa lý, Đội Xanh đã chiếm ưu thế với ${quizCorrectCount.blue} câu đúng và kéo mốc về phía mình!`
        );
      } else if (ropePosRef.current > 5) {
        handleEndRound(
          'red',
          `Sau 10 câu hỏi Địa lý, Đội Đỏ đã chiếm ưu thế với ${quizCorrectCount.red} câu đúng và kéo mốc về phía mình!`
        );
      } else {
        // Tie or slight edge
        const winner = quizCorrectCount.blue >= quizCorrectCount.red ? 'blue' : 'red';
        handleEndRound(
          winner,
          `Trận đấu 10 câu hỏi vô cùng kịch tính! ${
            winner === 'blue' ? 'Đội Xanh' : 'Đội Đỏ'
          } giành chiến thắng chung cuộc!`
        );
      }
    }
  };

  // Start new round / game
  const startRound = () => {
    setRopePosition(0);
    ropePosRef.current = 0;
    velocityRef.current = 0;
    setBluePulls(0);
    setRedPulls(0);
    blueClickTimesRef.current = [];
    redClickTimesRef.current = [];
    setRoundWinner(null);
    setWinReason('');

    // Quiz reset
    setQuestions(getRandom10Questions());
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsEvaluating(false);
    setLastQuizResult(null);
    setQuizHistory([]);
    setQuizCorrectCount({ blue: 0, red: 0 });

    if (gamePlayType === 'speed') {
      setStatus('countdown');
      setCountdown(3);
      soundFx.playCountdown(false);
    } else {
      setStatus('playing');
      soundFx.playWhistle();
    }
  };

  // Handle countdown for Speed mode
  useEffect(() => {
    if (status !== 'countdown') return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          soundFx.playCountdown(false);
          return prev - 1;
        } else if (prev === 1) {
          soundFx.playCountdown(true);
          soundFx.playWhistle();
          return 0;
        } else {
          clearInterval(timer);
          setStatus('playing');
          return 0;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, [status]);

  // Rhythm oscillator animation in Speed mode
  useEffect(() => {
    if (status !== 'playing' || gamePlayType !== 'speed') return;

    const rhythmInterval = setInterval(() => {
      setRhythmPosition((prev) => {
        let next = prev + rhythmDirectionRef.current * 4;
        if (next >= 100) {
          next = 100;
          rhythmDirectionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          rhythmDirectionRef.current = 1;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(rhythmInterval);
  }, [status, gamePlayType]);

  // Bot AI Controller in Speed mode
  useEffect(() => {
    if (status !== 'playing' || gamePlayType !== 'speed') return;

    let botIntervalTime = 250;
    let variationRate = 0.25;

    if (botDifficulty === 'easy') {
      botIntervalTime = 380;
    } else if (botDifficulty === 'hard') {
      botIntervalTime = 165;
    }

    const botInterval = setInterval(() => {
      if (gameMode === 'pve' || gameMode === 'auto') {
        const randomChance = Math.random();
        if (randomChance > 0.1) {
          handleRedPull();
        }
      }

      if (gameMode === 'auto') {
        if (Math.random() > 0.12) {
          handleBluePull();
        }
      }
    }, botIntervalTime * (1 + (Math.random() - 0.5) * variationRate));

    return () => clearInterval(botInterval);
  }, [status, gamePlayType, gameMode, botDifficulty, handleRedPull, handleBluePull]);

  // Physics loop (Rope friction, velocity integration, boundary check)
  useEffect(() => {
    if (status !== 'playing') return;

    let animId: number;

    const tick = () => {
      // Natural rope drag
      velocityRef.current *= 0.88;

      // Integrate position
      ropePosRef.current += velocityRef.current * 0.12;

      // Clamp position between -100 and +100
      if (ropePosRef.current <= -100) {
        ropePosRef.current = -100;
        setRopePosition(-100);
        handleEndRound('blue', 'Đội Xanh đã kéo dây cán đích thành công!');
        return;
      } else if (ropePosRef.current >= 100) {
        ropePosRef.current = 100;
        setRopePosition(100);
        handleEndRound('red', 'Đội Đỏ đã kéo dây cán đích thành công!');
        return;
      }

      setRopePosition(ropePosRef.current);

      // CPS Calculation for speed mode
      if (gamePlayType === 'speed') {
        const now = performance.now();
        blueClickTimesRef.current = blueClickTimesRef.current.filter((t) => now - t <= 1000);
        redClickTimesRef.current = redClickTimesRef.current.filter((t) => now - t <= 1000);

        setBlueCps(blueClickTimesRef.current.length);
        setRedCps(redClickTimesRef.current.length);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [status, gamePlayType, handleEndRound]);

  // Check if entire match is finished according to bestOf
  const winsNeeded = Math.ceil(bestOf / 2);
  const isMatchOver =
    roundWinner !== null && (blueScore >= winsNeeded || redScore >= winsNeeded);

  // Next round
  const handleNextRound = () => {
    setRoundWinner(null);
    setWinReason('');
    setCurrentRound((prev) => prev + 1);
    startRound();
  };

  // Full reset match
  const handleResetMatch = () => {
    setStatus('playing');
    setRopePosition(0);
    ropePosRef.current = 0;
    velocityRef.current = 0;
    setBlueScore(0);
    setRedScore(0);
    setCurrentRound(1);
    setBluePulls(0);
    setRedPulls(0);
    setRoundWinner(null);
    setWinReason('');

    // Reset questions
    setQuestions(getRandom10Questions());
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsEvaluating(false);
    setLastQuizResult(null);
    setQuizHistory([]);
    setQuizCorrectCount({ blue: 0, red: 0 });
  };

  // Update custom member name
  const handleUpdateMemberName = (team: 'blue' | 'red', id: number, newName: string) => {
    if (team === 'blue') {
      setBlueTeam((prev) =>
        prev.map((m) => (m.id === id ? { ...m, name: newName } : m))
      );
    } else {
      setRedTeam((prev) =>
        prev.map((m) => (m.id === id ? { ...m, name: newName } : m))
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-3 sm:p-6 lg:p-8 selection:bg-amber-500 selection:text-slate-950">
      {/* Title & Badge */}
      <header className="w-full max-w-[1560px] flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20">
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>TRÒ CHƠI KÉO CO</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                5 vs 5
              </span>
              {gamePlayType === 'quiz' && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700">
                  10 Câu Hỏi Địa Lý
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400">
              Đội Xanh (5 người) và Đội Đỏ (5 người) • Trả lời đúng kéo 1 nhịp, trả lời sai đối thủ kéo 2 nhịp!
            </p>
          </div>
        </div>

        {/* 2 Teams Quick Pill & Export HTML/JS/CSS buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-800 text-blue-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-400" />
            <span>Đội 1: Màu Xanh (5 người)</span>
          </div>
          <span className="text-slate-600 font-black">VS</span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-400" />
            <span>Đội 2: Màu Đỏ (5 người)</span>
          </div>

          <a
            href="/game_keo_co.html"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 transition-all shadow-xs"
            title="Mở phiên bản HTML/JS/CSS độc lập (Chạy trực tiếp, không cần Node/Vite)"
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mở bản HTML/JS/CSS</span>
          </a>

          <a
            href="/game_keo_co.html"
            download="tro-choi-keo-co-dia-ly.html"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-700 text-amber-300 transition-all shadow-xs"
            title="Tải trực tiếp file HTML về máy tính để mở offline"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Tải .HTML Offline</span>
          </a>
        </div>
      </header>

      {/* Center Main Stage */}
      <div className="w-full max-w-[1560px] flex flex-col gap-4">
        {/* Score Board & Controls Header */}
        <ScoreBoard
          gamePlayType={gamePlayType}
          quizTurnMode={quizTurnMode}
          blueScore={blueScore}
          redScore={redScore}
          currentRound={currentRound}
          bestOf={bestOf}
          gameMode={gameMode}
          botDifficulty={botDifficulty}
          soundEnabled={soundEnabled}
          onSetGamePlayType={(type) => {
            setGamePlayType(type);
            handleResetMatch();
          }}
          onSetQuizTurnMode={(mode) => {
            setQuizTurnMode(mode);
            handleResetMatch();
          }}
          onSetGameMode={setGameMode}
          onSetBotDifficulty={setBotDifficulty}
          onSetBestOf={setBestOf}
          onToggleSound={handleToggleSound}
          onResetMatch={handleResetMatch}
          onOpenRoster={() => setIsRosterOpen(true)}
          isPlaying={status === 'countdown'}
        />

        {/* Mode-Specific Interaction Stage */}
        {gamePlayType === 'quiz' ? (
          /* Câu hỏi hai bên, bảng kéo co ở giữa */
          <GeographyQuizPanel
            arenaElement={
              <RopeArena
                blueTeam={blueTeam}
                redTeam={redTeam}
                ropePosition={ropePosition}
                status={status}
                winner={roundWinner}
                isBluePulling={isBluePulling}
                isRedPulling={isRedPulling}
                blueAdvantageScore={Math.round(ropePosition)}
              />
            }
            blueTeam={blueTeam}
            redTeam={redTeam}
            currentQuestion={questions[currentQuestionIndex] || questions[0]}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            currentTeamTurn={currentQuizTeamTurn}
            gameMode={gameMode}
            botDifficulty={botDifficulty}
            isEvaluating={isEvaluating}
            selectedAnswer={selectedAnswer}
            lastResult={lastQuizResult}
            history={quizHistory}
            quizCorrectCount={quizCorrectCount}
            onAnswer={handleQuizAnswer}
            onNextQuestion={handleNextQuestion}
            isMatchFinished={status === 'ended'}
          />
        ) : (
          /* Chế độ kéo co tốc độ truyền thống */
          <div className="flex flex-col gap-4">
            <RopeArena
              blueTeam={blueTeam}
              redTeam={redTeam}
              ropePosition={ropePosition}
              status={status}
              winner={roundWinner}
              isBluePulling={isBluePulling}
              isRedPulling={isRedPulling}
              blueAdvantageScore={Math.round(ropePosition)}
            />
            <ControlPanel
              status={status}
              gameMode={gameMode}
              countdown={countdown}
              rhythmPosition={rhythmPosition}
              isSweetSpot={isSweetSpot}
              bluePulls={bluePulls}
              redPulls={redPulls}
              blueCps={blueCps}
              redCps={redCps}
              onStartRound={startRound}
              onBluePull={handleBluePull}
              onRedPull={handleRedPull}
            />
          </div>
        )}
      </div>

      {/* Bottom Footer / Info */}
      <footer className="w-full max-w-[1560px] mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>
            Luật Kéo Co Địa Lý: Trả lời Đúng = Đội kéo 1 nhịp • Trả lời Sai = Đội còn lại kéo 2 nhịp
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetMatch}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới ván đấu (10 câu mới)</span>
          </button>
        </div>
      </footer>

      {/* Modals */}
      <TeamRosterModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        blueTeam={blueTeam}
        redTeam={redTeam}
        onUpdateMemberName={handleUpdateMemberName}
      />

      <VictoryModal
        winner={roundWinner}
        isMatchOver={isMatchOver}
        gamePlayType={gamePlayType}
        blueScore={blueScore}
        redScore={redScore}
        bestOf={bestOf}
        bluePulls={bluePulls}
        redPulls={redPulls}
        quizCorrectCount={quizCorrectCount}
        winReason={winReason}
        onNextRound={handleNextRound}
        onNewMatch={handleResetMatch}
      />
    </main>
  );
}
