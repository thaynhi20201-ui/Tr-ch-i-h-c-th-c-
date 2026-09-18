import React, { useMemo } from 'react';
import { PlayerMember, GameStatus } from '../types';
import { TugCharacter } from './TugCharacter';

interface RopeArenaProps {
  blueTeam: PlayerMember[];
  redTeam: PlayerMember[];
  ropePosition: number; // -100 (Blue win) to +100 (Red win), 0 is middle
  status: GameStatus;
  winner: 'blue' | 'red' | null;
  isBluePulling: boolean;
  isRedPulling: boolean;
  blueAdvantageScore: number; // For meter display
}

export const RopeArena: React.FC<RopeArenaProps> = ({
  blueTeam,
  redTeam,
  ropePosition,
  status,
  winner,
  isBluePulling,
  isRedPulling,
}) => {
  // Determine character status
  const blueState = useMemo(() => {
    if (winner === 'blue') return 'won';
    if (winner === 'red') return 'lost';
    if (status !== 'playing') return 'idle';
    if (ropePosition > 20) return 'straining'; // Being pulled towards red
    return 'pulling';
  }, [winner, status, ropePosition]);

  const redState = useMemo(() => {
    if (winner === 'red') return 'won';
    if (winner === 'blue') return 'lost';
    if (status !== 'playing') return 'idle';
    if (ropePosition < -20) return 'straining'; // Being pulled towards blue
    return 'pulling';
  }, [winner, status, ropePosition]);

  // Pixel shift based on ropePosition (scaled for compact mini arena)
  const maxShiftPx = 50;
  const shiftPx = (ropePosition / 100) * maxShiftPx;

  return (
    <div
      id="rope-arena-container"
      className="relative w-full overflow-hidden rounded-2xl border-4 border-amber-900/30 bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 shadow-xl select-none"
      style={{ minHeight: '220px' }}
    >
      {/* Background Stadium & Trees */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-sky-400/30 via-emerald-300/20 to-transparent pointer-events-none">
        {/* Stadium Spectator Stands Silhouette */}
        <div className="absolute inset-x-0 bottom-0 h-10 flex justify-around items-end opacity-25">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 bg-slate-700 rounded-t-full ${
                status === 'playing' ? 'animate-pulse' : ''
              }`}
              style={{
                height: `${12 + (i % 4) * 5}px`,
                animationDelay: `${(i * 70) % 800}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Arena Banner / Header Flags */}
      <div className="absolute top-1.5 inset-x-0 flex justify-between px-2 text-[9px] font-bold text-slate-600 pointer-events-none z-10">
        <div className="flex items-center gap-1 bg-blue-600/15 text-blue-800 px-2 py-0.5 rounded-full backdrop-blur-sm border border-blue-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
          <span>VẠCH XANH</span>
        </div>
        <div className="flex items-center gap-1 bg-red-600/15 text-red-800 px-2 py-0.5 rounded-full backdrop-blur-sm border border-red-300">
          <span>VẠCH ĐỎ</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
        </div>
      </div>

      {/* Field Ground (Đất nện / Sân cỏ kéo co) */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-amber-200 via-amber-100/90 to-emerald-200 border-t-2 border-amber-300/60">
        {/* Chalk Ground Markings */}
        <div className="relative w-full h-full">
          {/* Center line (Vạch xuất phát 0) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/90 shadow-sm flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white -mt-1.5 shadow" />
            <span className="mt-0.5 text-[8px] font-extrabold text-amber-800 bg-white/80 px-1 rounded shadow-xs">
              0
            </span>
          </div>

          {/* Left Win Line (-100%) */}
          <div className="absolute left-[8%] top-0 bottom-0 w-1 bg-blue-500/80 border-dashed border-l-2 border-blue-400">
            <span className="absolute top-1 -left-4 text-[8px] font-bold text-blue-800 bg-blue-100/90 px-0.5 rounded">
              Thắng
            </span>
          </div>

          {/* Right Win Line (+100%) */}
          <div className="absolute right-[8%] top-0 bottom-0 w-1 bg-red-500/80 border-dashed border-r-2 border-red-400">
            <span className="absolute top-1 -right-4 text-[8px] font-bold text-red-800 bg-red-100/90 px-0.5 rounded">
              Thắng
            </span>
          </div>

          {/* Pit markers / Distance lines */}
          {[-60, -30, 30, 60].map((dist) => (
            <div
              key={dist}
              className="absolute top-0 bottom-5 w-0.5 bg-white/40"
              style={{ left: `calc(50% + ${dist * 0.42}%)` }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Pulling Unit: Characters + Rope */}
      <div
        id="tug-dynamic-stage"
        className="relative w-full h-44 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `translateX(${shiftPx}px)`,
        }}
      >
        {/* Continuous Twisted Rope */}
        <div
          id="the-rope"
          className="absolute inset-x-0 top-[96px] h-3 z-20 pointer-events-none flex items-center"
        >
          {/* Rope Body with realistic twisted styling */}
          <div
            className="w-full h-2.5 rounded-full shadow-md border-y border-amber-950/40 relative overflow-hidden"
            style={{
              background:
                'repeating-linear-gradient(45deg, #b45309, #b45309 4px, #d97706 4px, #d97706 8px, #f59e0b 8px, #f59e0b 12px)',
              filter: isBluePulling || isRedPulling ? 'brightness(1.08)' : 'none',
            }}
          />

          {/* Center Red Ribbon / Flag */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-30">
            {/* Knot */}
            <div className="w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
            {/* Dangling Ribbon Tails */}
            <div className="w-2 h-7 bg-gradient-to-b from-red-600 to-red-700 shadow-md border-x border-b border-red-800 clip-ribbon transform origin-top -rotate-6 animate-pulse" />
          </div>
        </div>

        {/* Both Teams Layout */}
        <div className="relative w-full max-w-[320px] flex items-center justify-between px-1 z-10">
          {/* Đội Xanh (5 Players, arranged from anchor to lead) */}
          <div
            id="blue-team-roster"
            className="flex items-end justify-end space-x-[-5px] mr-1"
          >
            {/* Reverse so #5 (Anchor) is on far left, #1 (Lead) is closest to center */}
            {[...blueTeam].reverse().map((member, revIndex) => {
              const originalIndex = 4 - revIndex;
              return (
                <div key={`blue-${member.id}`} className="relative">
                  <TugCharacter
                    member={member}
                    team="blue"
                    index={originalIndex}
                    state={blueState}
                    isPullingNow={isBluePulling}
                  />
                  {/* Dust cloud when actively pulling */}
                  {isBluePulling && (
                    <div className="absolute -bottom-1 -left-2 w-5 h-3 bg-amber-400/50 rounded-full blur-xs animate-ping" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Center Gap Indicator (Ribbon passes here) */}
          <div className="w-5 shrink-0 text-center" />

          {/* Đội Đỏ (5 Players, arranged from lead to anchor) */}
          <div
            id="red-team-roster"
            className="flex items-end justify-start space-x-[-5px] ml-1"
          >
            {redTeam.map((member, index) => (
              <div key={`red-${member.id}`} className="relative">
                <TugCharacter
                  member={member}
                  team="red"
                  index={index}
                  state={redState}
                  isPullingNow={isRedPulling}
                />
                {/* Dust cloud when actively pulling */}
                {isRedPulling && (
                  <div className="absolute -bottom-1 -right-2 w-5 h-3 bg-amber-400/50 rounded-full blur-xs animate-ping" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advantage Progress Gauge at the Bottom of Arena */}
      <div className="absolute bottom-1.5 inset-x-2 sm:inset-x-6 z-20 flex flex-col items-center">
        <div className="w-full max-w-sm bg-slate-900/85 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/20">
          <div className="relative h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
            {/* Blue Side Progress */}
            <div
              className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-100 ease-out"
              style={{
                width: `${Math.max(0, 50 - ropePosition / 2)}%`,
              }}
            />
            {/* Red Side Progress */}
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-700 ml-auto transition-all duration-100 ease-out"
              style={{
                width: `${Math.max(0, 50 + ropePosition / 2)}%`,
              }}
            />
            {/* Center tick */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white shadow-xs z-10" />
          </div>
        </div>

        {/* Advantage text */}
        <div className="mt-0.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-sm">
          {ropePosition === 0 ? (
            <span className="text-yellow-300">Cân bằng tâm (0%)</span>
          ) : ropePosition < 0 ? (
            <span className="text-blue-300">
              Xanh dẫn: {Math.abs(Math.round(ropePosition))}%
            </span>
          ) : (
            <span className="text-red-300">
              Đỏ dẫn: {Math.round(ropePosition)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
