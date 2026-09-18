import React, { useEffect, useState } from 'react';
import { GameMode, GameStatus } from '../types';
import { Zap, Play, Flame, ShieldAlert } from 'lucide-react';

interface ControlPanelProps {
  status: GameStatus;
  gameMode: GameMode;
  countdown: number;
  rhythmPosition: number; // 0 to 100
  isSweetSpot: boolean;
  bluePulls: number;
  redPulls: number;
  blueCps: number;
  redCps: number;
  onStartRound: () => void;
  onBluePull: () => void;
  onRedPull: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  status,
  gameMode,
  countdown,
  rhythmPosition,
  isSweetSpot,
  bluePulls,
  redPulls,
  blueCps,
  redCps,
  onStartRound,
  onBluePull,
  onRedPull,
}) => {
  const [bluePressed, setBluePressed] = useState(false);
  const [redPressed, setRedPressed] = useState(false);

  // Trigger feedback
  const handleBlueClick = () => {
    if (status !== 'playing') return;
    setBluePressed(true);
    setTimeout(() => setBluePressed(false), 90);
    onBluePull();
  };

  const handleRedClick = () => {
    if (status !== 'playing' || gameMode === 'pve' || gameMode === 'auto') return;
    setRedPressed(true);
    setTimeout(() => setRedPressed(false), 90);
    onRedPull();
  };

  // Keyboard shortcut hints
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'playing') return;
      if (e.key === 'a' || e.key === 'A' || e.key === 'w' || e.key === 'W') {
        handleBlueClick();
      }
      if (
        (e.key === 'l' || e.key === 'L' || e.key === 'p' || e.key === 'P') &&
        gameMode === 'pvp'
      ) {
        handleRedClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div
      id="tug-control-panel"
      className="w-full bg-slate-900/95 border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md"
    >
      {/* Rhythm Bar: '1 - 2 - KÉO!' Cadence */}
      {status === 'playing' && (
        <div className="mb-4 bg-slate-800/90 rounded-xl p-2.5 border border-slate-700">
          <div className="flex items-center justify-between text-xs mb-1.5 px-1">
            <span className="flex items-center gap-1 font-bold text-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Nhịp Kéo Đồng Lòng (1 - 2 - KÉO!)</span>
            </span>
            <span
              className={`font-extrabold text-[11px] px-2 py-0.5 rounded ${
                isSweetSpot
                  ? 'bg-amber-500 text-slate-950 animate-bounce'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {isSweetSpot ? 'ĐỈNH LỰC! BẤM NGAY +50%' : 'Chuẩn bị nhịp...'}
            </span>
          </div>

          <div className="relative h-4 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-700/80">
            {/* Center Sweet spot zone */}
            <div className="absolute left-[40%] right-[40%] top-0 bottom-0 bg-emerald-500/40 border-x border-emerald-400 flex items-center justify-center">
              <span className="text-[9px] font-black text-emerald-300 tracking-wider">
                KÉO!
              </span>
            </div>

            {/* Moving rhythm bead */}
            <div
              className={`absolute top-0 bottom-0 w-4 rounded-full transition-transform duration-75 shadow-md ${
                isSweetSpot
                  ? 'bg-amber-400 shadow-amber-400/80 scale-125'
                  : 'bg-white shadow-white/50'
              }`}
              style={{
                left: `calc(${rhythmPosition}% - 8px)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Main Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center">
        {/* Blue Team Pull Button */}
        <div className="flex flex-col items-center">
          <button
            id="blue-pull-button"
            type="button"
            disabled={status !== 'playing'}
            onClick={handleBlueClick}
            className={`w-full max-w-sm py-4 sm:py-5 px-6 rounded-2xl font-black text-lg sm:text-xl shadow-lg border-2 transition-all duration-75 active:scale-95 flex flex-col items-center justify-center gap-1 select-none ${
              status === 'playing'
                ? bluePressed
                  ? 'bg-blue-700 border-blue-400 text-white scale-95 shadow-blue-500/50'
                  : 'bg-gradient-to-b from-blue-500 to-blue-600 border-blue-400 text-white hover:brightness-110 shadow-blue-600/40 cursor-pointer'
                : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-300" />
              <span>ĐỘI XANH KÉO!</span>
            </div>
            <span className="text-xs font-semibold text-blue-200 opacity-90">
              Chạm màn hình hoặc phím [A / W]
            </span>
          </button>

          {/* Blue stats */}
          <div className="mt-2 flex items-center gap-3 text-xs font-bold text-blue-300">
            <span>Số lần: {bluePulls}</span>
            <span className="text-slate-600">•</span>
            <span>Tốc độ: {blueCps} CPS</span>
          </div>
        </div>

        {/* Center: Countdown or Action Button */}
        <div className="flex flex-col items-center justify-center order-first md:order-none py-1">
          {status === 'idle' && (
            <button
              id="start-round-button"
              type="button"
              onClick={onStartRound}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base sm:text-lg shadow-xl hover:shadow-emerald-500/25 transition-all active:scale-95 flex items-center gap-2 cursor-pointer border border-emerald-300"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>BẮT ĐẦU VÁN ĐẤU</span>
            </button>
          )}

          {status === 'countdown' && (
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 drop-shadow-lg">
                {countdown > 0 ? countdown : 'KÉO!'}
              </span>
              <span className="text-xs text-slate-400 font-semibold mt-1">
                Chuẩn bị xuất phát...
              </span>
            </div>
          )}

          {status === 'playing' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>ĐANG TRANH ĐẤU CĂNG THẲNG!</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Bấm thật nhanh & đúng nhịp để kéo dây!
              </p>
            </div>
          )}

          {status === 'ended' && (
            <button
              id="next-round-button"
              type="button"
              onClick={onStartRound}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>VÁN TIẾP THEO</span>
            </button>
          )}
        </div>

        {/* Red Team Pull Button */}
        <div className="flex flex-col items-center">
          <button
            id="red-pull-button"
            type="button"
            disabled={status !== 'playing' || gameMode !== 'pvp'}
            onClick={handleRedClick}
            className={`w-full max-w-sm py-4 sm:py-5 px-6 rounded-2xl font-black text-lg sm:text-xl shadow-lg border-2 transition-all duration-75 active:scale-95 flex flex-col items-center justify-center gap-1 select-none ${
              status === 'playing'
                ? gameMode === 'pvp'
                  ? redPressed
                    ? 'bg-red-700 border-red-400 text-white scale-95 shadow-red-500/50'
                    : 'bg-gradient-to-b from-red-500 to-red-600 border-red-400 text-white hover:brightness-110 shadow-red-600/40 cursor-pointer'
                  : 'bg-red-950/60 border-red-800/80 text-red-300/80 cursor-default'
                : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-300" />
              <span>
                {gameMode === 'pvp' ? 'ĐỘI ĐỎ KÉO!' : 'ĐỘI ĐỎ (MÁY TỰ ĐỘNG)'}
              </span>
            </div>
            <span className="text-xs font-semibold text-red-200 opacity-90">
              {gameMode === 'pvp'
                ? 'Chạm màn hình hoặc phím [L / P]'
                : 'Máy tính đang tự động kéo theo thuật toán'}
            </span>
          </button>

          {/* Red stats */}
          <div className="mt-2 flex items-center gap-3 text-xs font-bold text-red-300">
            <span>Số lần: {redPulls}</span>
            <span className="text-slate-600">•</span>
            <span>Tốc độ: {redCps} CPS</span>
          </div>
        </div>
      </div>

      {/* Guide hint for mobile users */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-slate-400 text-xs text-center">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          Mẹo: Càng bấm nhấp nhanh và đều tay, toàn bộ 5 thành viên của đội sẽ gồng lực kéo dũng mãnh hơn!
        </span>
      </div>
    </div>
  );
};
