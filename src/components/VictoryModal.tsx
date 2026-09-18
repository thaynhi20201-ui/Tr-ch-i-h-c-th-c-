import React from 'react';
import { Trophy, RotateCcw, Play, Zap, Flame, HelpCircle } from 'lucide-react';
import { TeamId, GamePlayType } from '../types';

interface VictoryModalProps {
  winner: TeamId | null;
  isMatchOver: boolean;
  gamePlayType: GamePlayType;
  blueScore: number;
  redScore: number;
  bestOf: 1 | 3 | 5;
  bluePulls: number;
  redPulls: number;
  quizCorrectCount?: { blue: number; red: number };
  winReason?: string;
  onNextRound: () => void;
  onNewMatch: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  winner,
  isMatchOver,
  gamePlayType,
  blueScore,
  redScore,
  bestOf,
  bluePulls,
  redPulls,
  quizCorrectCount,
  winReason,
  onNextRound,
  onNewMatch,
}) => {
  if (!winner) return null;

  const isBlue = winner === 'blue';

  return (
    <div
      id="victory-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      {/* Confetti / Particle effect elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-sm animate-ping"
            style={{
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
              width: `${6 + (i % 4) * 3}px`,
              height: `${6 + (i % 4) * 3}px`,
              backgroundColor:
                i % 3 === 0
                  ? isBlue
                    ? '#60a5fa'
                    : '#f87171'
                  : i % 3 === 1
                  ? '#fbbf24'
                  : '#34d399',
              animationDuration: `${1 + (i % 3) * 0.5}s`,
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      <div className="relative bg-slate-900 border-2 border-amber-400/80 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl text-center text-white z-10 overflow-hidden">
        {/* Glow behind trophy */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none ${
            isBlue ? 'bg-blue-600' : 'bg-red-600'
          }`}
        />

        {/* Trophy icon */}
        <div className="relative inline-flex items-center justify-center p-4 rounded-3xl bg-amber-500/20 border border-amber-400 text-amber-400 mb-4 shadow-lg animate-bounce">
          <Trophy className="w-12 h-12" />
        </div>

        <div className="text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
          {isMatchOver ? 'CHUNG CUỘC TRẬN ĐẤU' : 'KẾT THÚC VÁN ĐẤU'}
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-black mb-2 ${
            isBlue ? 'text-blue-400' : 'text-red-400'
          }`}
        >
          {isBlue ? 'ĐỘI XANH CHIẾN THẮNG!' : 'ĐỘI ĐỎ CHIẾN THẮNG!'}
        </h2>

        <p className="text-sm text-slate-300 mb-6">
          {winReason ||
            (isBlue
              ? 'Cả 5 thành viên Đội Xanh đã xuất sắc giành ưu thế tuyệt đối!'
              : 'Cả 5 thành viên Đội Đỏ đã áp đảo và giành trọn chiến thắng!')}
        </p>

        {/* Current Match Standing */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 mb-6">
          <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider mb-2">
            Tỉ Số Toàn Trận (Bo{bestOf})
          </div>
          <div className="flex items-center justify-center gap-4 text-3xl font-black">
            <span className="text-blue-400">{blueScore}</span>
            <span className="text-slate-600">-</span>
            <span className="text-red-400">{redScore}</span>
          </div>

          {gamePlayType === 'quiz' && quizCorrectCount ? (
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-xs font-semibold">
              <div className="flex items-center justify-center gap-1.5 text-blue-300">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Đội Xanh: Đúng {quizCorrectCount.blue} câu</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-red-300">
                <HelpCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Đội Đỏ: Đúng {quizCorrectCount.red} câu</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-700/60 text-xs font-semibold">
              <div className="flex items-center justify-center gap-1 text-blue-300">
                <Flame className="w-3.5 h-3.5" />
                <span>Lực kéo Xanh: {bluePulls} lần</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-red-300">
                <Zap className="w-3.5 h-3.5" />
                <span>Lực kéo Đỏ: {redPulls} lần</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {!isMatchOver ? (
            <button
              id="next-round-modal-btn"
              type="button"
              onClick={onNextRound}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>ĐẤU VÁN TIẾP THEO</span>
            </button>
          ) : (
            <button
              id="new-match-modal-btn"
              type="button"
              onClick={onNewMatch}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-base shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>BẮT ĐẦU TRẬN MỚI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
