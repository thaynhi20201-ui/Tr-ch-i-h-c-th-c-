import React from 'react';
import { GeoQuestion, TeamId, GameMode, BotDifficulty, PlayerMember } from '../types';
import { CheckCircle2, XCircle, Shield, Zap, HelpCircle, Bot } from 'lucide-react';

interface TeamQuizCardProps {
  team: TeamId;
  teamName: string;
  members: PlayerMember[];
  currentQuestion: GeoQuestion;
  questionIndex: number;
  totalQuestions: number;
  isMyTurn: boolean;
  gameMode: GameMode;
  botDifficulty: BotDifficulty;
  countdownTimer: number;
  isEvaluating: boolean;
  selectedAnswer: number | null;
  lastResult: {
    isCorrect: boolean;
    pulledTeam: TeamId;
    strokes: number;
  } | null;
  score: number;
  onAnswer: (selectedIndex: number) => void;
  isMatchFinished: boolean;
}

export const TeamQuizCard: React.FC<TeamQuizCardProps> = ({
  team,
  teamName,
  members,
  currentQuestion,
  questionIndex,
  totalQuestions,
  isMyTurn,
  gameMode,
  botDifficulty,
  countdownTimer,
  isEvaluating,
  selectedAnswer,
  lastResult,
  score,
  onAnswer,
  isMatchFinished,
}) => {
  const isBlue = team === 'blue';
  const isBot = !isBlue && gameMode === 'pve';

  // Option letters
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleOptionClick = (index: number) => {
    if (!isMyTurn || isEvaluating || isMatchFinished || isBot) return;
    onAnswer(index);
  };

  return (
    <div
      id={`team-quiz-card-${team}`}
      className={`relative w-full rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md shadow-2xl ${
        isBlue
          ? isMyTurn && !isEvaluating
            ? 'bg-slate-900/95 border-2 border-blue-400 shadow-blue-500/30 ring-2 ring-blue-400/40'
            : 'bg-slate-900/85 border border-blue-900/50'
          : isMyTurn && !isEvaluating
          ? 'bg-slate-900/95 border-2 border-red-400 shadow-red-500/30 ring-2 ring-red-400/40'
          : 'bg-slate-900/85 border border-red-900/50'
      }`}
    >
      {/* Team Header & Turn Status */}
      <div>
        <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                isBlue ? 'bg-blue-500 shadow-blue-500/50 ring-2 ring-blue-300/40' : 'bg-red-500 shadow-red-500/50 ring-2 ring-red-300/40'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div>
              <h2
                className={`text-lg sm:text-xl font-black tracking-wide ${
                  isBlue ? 'text-blue-400' : 'text-red-400'
                }`}
              >
                {teamName}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>5 thành viên</span>
                <span>•</span>
                <span className="font-bold text-amber-400">Điểm: {score} câu đúng</span>
              </div>
            </div>
          </div>

          {/* Turn Badge */}
          <div>
            {isMyTurn ? (
              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md ${
                  isBlue
                    ? 'bg-blue-600/30 border border-blue-400 text-blue-200 animate-pulse ring-1 ring-blue-400/50'
                    : 'bg-red-600/30 border border-red-400 text-red-200 animate-pulse ring-1 ring-red-400/50'
                }`}
              >
                {isBot ? <Bot className="w-4 h-4 text-red-300" /> : <Zap className="w-4 h-4 text-amber-300" />}
                <span>{isBot ? 'Máy trả lời' : 'LƯỢT TRẢ LỜI'}</span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Phòng thủ</span>
              </div>
            )}
          </div>
        </div>

        {/* 30s Countdown Timer Bar */}
        {isMyTurn && !isEvaluating && !isMatchFinished && (
          <div className="mb-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-semibold flex items-center gap-1">
                ⏱️ Thời gian chọn đáp án:
              </span>
              <span
                className={`font-mono font-black px-2.5 py-0.5 rounded-lg border text-xs sm:text-sm ${
                  countdownTimer <= 7
                    ? 'bg-red-950/90 border-red-500 text-red-300 animate-pulse shadow-sm shadow-red-500/30'
                    : countdownTimer <= 15
                    ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-100'
                }`}
              >
                {countdownTimer}s / 30s
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                  countdownTimer <= 7
                    ? 'bg-red-500'
                    : countdownTimer <= 15
                    ? 'bg-amber-400'
                    : isBlue
                    ? 'bg-blue-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${(countdownTimer / 30) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Defensive notice if not this team's turn */}
        {!isMyTurn && !isEvaluating && (
          <div className="mb-3.5 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-center gap-2">
            <Shield className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Đối thủ đang trả lời. Nếu sai, {teamName} được giật 2 nhịp!</span>
          </div>
        )}

        {/* Question Text Box (Expanded & Readable) */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 sm:p-4 mb-3.5 shadow-inner">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-amber-400">
              <HelpCircle className="w-4 h-4" />
              Câu {questionIndex + 1}/{totalQuestions}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 text-[11px] border border-slate-700">
              {currentQuestion.category}
            </span>
          </div>
          <p className="text-sm sm:text-base font-extrabold text-white leading-snug">
            {currentQuestion.question}
          </p>
        </div>

        {/* 4 Multiple Choice Options (Prominent & Spacious) */}
        <div className="space-y-2.5 mb-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = idx === currentQuestion.correctIndex;
            const isChosen = selectedAnswer === idx;

            let optionStyle = '';
            if (isEvaluating) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-600/35 border-emerald-500 text-emerald-100 ring-2 ring-emerald-400 font-bold';
              } else if (isChosen) {
                optionStyle = 'bg-red-600/35 border-red-500 text-red-100 ring-2 ring-red-400';
              } else {
                optionStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-50';
              }
            } else if (isMyTurn && !isBot && !isMatchFinished) {
              optionStyle = isBlue
                ? 'bg-blue-950/40 border-blue-800/70 hover:border-blue-400 hover:bg-blue-900/50 hover:shadow-md hover:shadow-blue-500/20 text-slate-100 cursor-pointer active:scale-[0.98]'
                : 'bg-red-950/40 border-red-800/70 hover:border-red-400 hover:bg-red-900/50 hover:shadow-md hover:shadow-red-500/20 text-slate-100 cursor-pointer active:scale-[0.98]';
            } else {
              optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-400 cursor-default opacity-80';
            }

            return (
              <button
                key={idx}
                id={`quiz-option-${team}-${idx}`}
                disabled={!isMyTurn || isEvaluating || isMatchFinished || isBot}
                onClick={() => handleOptionClick(idx)}
                className={`w-full p-3 sm:p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shadow-xs ${
                      isEvaluating && isCorrect
                        ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                        : isEvaluating && isChosen
                        ? 'bg-red-500 text-white ring-2 ring-red-300'
                        : isBlue
                        ? 'bg-blue-800/90 text-blue-100 border border-blue-600'
                        : 'bg-red-800/90 text-red-100 border border-red-600'
                    }`}
                  >
                    {optionLetters[idx]}
                  </span>
                  <span className="leading-snug">{option}</span>
                </div>

                {/* Status icon when evaluated */}
                {isEvaluating && (
                  <div className="shrink-0">
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {!isCorrect && isChosen && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bot Thinking Animated Notice */}
        {isMyTurn && isBot && !isEvaluating && (
          <div className="px-3.5 py-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-xs sm:text-sm text-red-200 flex items-center justify-center gap-2 animate-pulse mb-3.5">
            <Bot className="w-4 h-4 text-red-400" />
            <span>Máy đang phân tích câu hỏi & chọn đáp án...</span>
          </div>
        )}
      </div>

      {/* Roster Quick Chips at Card Footer */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>5 VĐV {teamName}:</span>
          <span className="text-slate-400 text-[11px]">Vị trí 1 → 5</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {members.map((m, idx) => (
            <span
              key={m.id}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border shadow-xs ${
                isBlue
                  ? 'bg-blue-950/70 border-blue-800/70 text-blue-200'
                  : 'bg-red-950/70 border-red-800/70 text-red-200'
              }`}
            >
              #{idx + 1} {m.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
