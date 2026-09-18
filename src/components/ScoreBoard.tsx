import React from 'react';
import { GameMode, BotDifficulty, GamePlayType, QuizTurnMode } from '../types';
import { Volume2, VolumeX, RotateCcw, Users, Bot, UserCheck, HelpCircle, Flame } from 'lucide-react';

interface ScoreBoardProps {
  gamePlayType: GamePlayType;
  quizTurnMode: QuizTurnMode;
  blueScore: number;
  redScore: number;
  currentRound: number;
  bestOf: 1 | 3 | 5;
  gameMode: GameMode;
  botDifficulty: BotDifficulty;
  soundEnabled: boolean;
  onSetGamePlayType: (type: GamePlayType) => void;
  onSetQuizTurnMode: (mode: QuizTurnMode) => void;
  onSetGameMode: (mode: GameMode) => void;
  onSetBotDifficulty: (diff: BotDifficulty) => void;
  onSetBestOf: (count: 1 | 3 | 5) => void;
  onToggleSound: () => void;
  onResetMatch: () => void;
  onOpenRoster: () => void;
  isPlaying: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  gamePlayType,
  quizTurnMode,
  blueScore,
  redScore,
  currentRound,
  bestOf,
  gameMode,
  botDifficulty,
  soundEnabled,
  onSetGamePlayType,
  onSetQuizTurnMode,
  onSetGameMode,
  onSetBotDifficulty,
  onSetBestOf,
  onToggleSound,
  onResetMatch,
  onOpenRoster,
  isPlaying,
}) => {
  return (
    <div
      id="scoreboard-header"
      className="w-full bg-slate-900/90 text-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-700/80 backdrop-blur-md"
    >
      {/* Top Banner: Switch Between 10 Câu Hỏi Địa Lý vs Kéo Co Tốc Độ */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/70 pb-3 mb-3">
        {/* Game Mode Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-700">
          <button
            id="playtype-quiz-btn"
            type="button"
            disabled={isPlaying}
            onClick={() => onSetGamePlayType('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              gamePlayType === 'quiz'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            } ${isPlaying ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            title="Trả lời 10 câu hỏi Địa lý: Đúng kéo 1 nhịp, Sai đội kia kéo 2 nhịp"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>10 CÂU HỎI ĐỊA LÝ</span>
            <span className="text-[10px] bg-slate-900/40 text-current px-1.5 py-0.2 rounded font-extrabold ml-0.5">
              HOT
            </span>
          </button>

          <button
            id="playtype-speed-btn"
            type="button"
            disabled={isPlaying}
            onClick={() => onSetGamePlayType('speed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              gamePlayType === 'speed'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            } ${isPlaying ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            title="Kéo co tự do bấm nút / nhịp điệu tốc độ"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>KÉO CO TỐC ĐỘ</span>
          </button>
        </div>

        {/* Turn mode selector for Quiz or PvP/PvE */}
        <div className="flex items-center gap-2">
          {gamePlayType === 'quiz' ? (
            <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-1 rounded-xl text-xs border border-slate-700">
              <span className="text-slate-400 font-medium">Hình thức:</span>
              <select
                id="quiz-turn-mode-select"
                disabled={isPlaying}
                value={quizTurnMode}
                onChange={(e) => onSetQuizTurnMode(e.target.value as QuizTurnMode)}
                className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="alternate" className="bg-slate-900 text-white">
                  2 Đội luân phiên (10 câu)
                </option>
                <option value="blue_solo" className="bg-slate-900 text-white">
                  Đội Xanh trả lời (10 câu)
                </option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                disabled={isPlaying}
                onClick={() => onSetGameMode('pvp')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                  gameMode === 'pvp'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>2 Người</span>
              </button>
              <button
                type="button"
                disabled={isPlaying}
                onClick={() => onSetGameMode('pve')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                  gameMode === 'pve'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Bot className="w-3 h-3" />
                <span>Đấu Máy</span>
              </button>
            </div>
          )}

          {/* Bot difficulty if PvE and alternate */}
          {gameMode === 'pve' && gamePlayType === 'quiz' && quizTurnMode === 'alternate' && (
            <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-1 rounded-xl text-xs border border-slate-700">
              <span className="text-slate-400 font-medium">Máy:</span>
              <select
                disabled={isPlaying}
                value={botDifficulty}
                onChange={(e) => onSetBotDifficulty(e.target.value as BotDifficulty)}
                className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="easy" className="bg-slate-900 text-white">Dễ (50%)</option>
                <option value="medium" className="bg-slate-900 text-white">Vừa (72%)</option>
                <option value="hard" className="bg-slate-900 text-white">Khó (90%)</option>
              </select>
            </div>
          )}

          {/* Series format */}
          <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-1 rounded-xl text-xs border border-slate-700">
            <span className="text-slate-400 font-medium">Thể thức:</span>
            <select
              id="best-of-select"
              disabled={isPlaying}
              value={bestOf}
              onChange={(e) => onSetBestOf(Number(e.target.value) as 1 | 3 | 5)}
              className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer"
            >
              <option value="1" className="bg-slate-900 text-white">1 Ván (10 câu)</option>
              <option value="3" className="bg-slate-900 text-white">Bo3 (Thắng 2 ván)</option>
              <option value="5" className="bg-slate-900 text-white">Bo5 (Thắng 3 ván)</option>
            </select>
          </div>

          {/* View Roster */}
          <button
            id="view-roster-btn"
            type="button"
            onClick={onOpenRoster}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            title="Xem danh sách 5 thành viên mỗi đội"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Thành viên 2 Đội</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="toggle-sound-btn"
            type="button"
            onClick={onToggleSound}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-800/50 text-slate-500 border-slate-700 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset */}
          <button
            id="reset-match-btn"
            type="button"
            onClick={onResetMatch}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-900/60 text-slate-300 hover:text-red-300 border border-slate-700 transition-colors cursor-pointer"
            title="Thiết lập lại trận đấu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Score & Teams Headline */}
      <div className="grid grid-cols-3 items-center pt-1">
        {/* Đội Xanh Info */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50 animate-pulse" />
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-blue-400">
              Đội Xanh
            </span>
          </div>
          <span className="text-xs text-blue-300/80 font-medium">5 Thành viên</span>
        </div>

        {/* Big Score Center */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <span
              id="blue-score-display"
              className="text-3xl sm:text-4xl font-black text-blue-400 drop-shadow-md"
            >
              {blueScore}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-500">-</span>
            <span
              id="red-score-display"
              className="text-3xl sm:text-4xl font-black text-red-400 drop-shadow-md"
            >
              {redScore}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
            {bestOf === 1 ? 'Ván Đấu 10 Câu' : `Hiệp ${currentRound} / Bo${bestOf}`}
          </div>
        </div>

        {/* Đội Đỏ Info */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-red-400">
              Đội Đỏ
            </span>
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50 animate-pulse" />
          </div>
          <span className="text-xs text-red-300/80 font-medium">5 Thành viên</span>
        </div>
      </div>
    </div>
  );
};
