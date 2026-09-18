import React from 'react';
import { PlayerMember } from '../types';
import { X, Shield, Award, Dumbbell } from 'lucide-react';

interface TeamRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueTeam: PlayerMember[];
  redTeam: PlayerMember[];
  onUpdateMemberName: (team: 'blue' | 'red', id: number, newName: string) => void;
}

export const TeamRosterModal: React.FC<TeamRosterModalProps> = ({
  isOpen,
  onClose,
  blueTeam,
  redTeam,
  onUpdateMemberName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="team-roster-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                Danh Sách 10 Thành Viên (Mỗi Đội 5 Người)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Bạn có thể tùy chỉnh tên của từng thành viên trong mỗi đội
              </p>
            </div>
          </div>

          <button
            id="close-roster-modal-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Teams Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blue Team */}
          <div className="bg-blue-950/40 border border-blue-900/60 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-900/40">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-black text-blue-400 uppercase tracking-wide">
                Đội Xanh (5 Thành Viên)
              </h3>
            </div>

            <div className="space-y-3">
              {blueTeam.map((m) => (
                <div
                  key={`blue-roster-${m.id}`}
                  className="bg-slate-900/80 border border-blue-900/40 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 font-extrabold text-white flex items-center justify-center text-sm shadow">
                      #{m.id}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => onUpdateMemberName('blue', m.id, e.target.value)}
                        className="bg-slate-800 border border-slate-700 focus:border-blue-400 rounded px-2 py-1 text-sm font-bold text-white focus:outline-none w-32 sm:w-36"
                        maxLength={15}
                      />
                      <div className="text-[11px] text-blue-300/80 mt-0.5 font-medium">
                        Vị trí: {m.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end text-xs text-slate-300">
                    <span className="flex items-center gap-1 font-semibold">
                      <Dumbbell className="w-3 h-3 text-amber-400" />
                      Lực: {m.strength}
                    </span>
                    <span className="text-slate-400 text-[11px]">Nặng: {m.weight} kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Red Team */}
          <div className="bg-red-950/40 border border-red-900/60 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-900/40">
              <Shield className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-black text-red-400 uppercase tracking-wide">
                Đội Đỏ (5 Thành Viên)
              </h3>
            </div>

            <div className="space-y-3">
              {redTeam.map((m) => (
                <div
                  key={`red-roster-${m.id}`}
                  className="bg-slate-900/80 border border-red-900/40 rounded-xl p-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-600 font-extrabold text-white flex items-center justify-center text-sm shadow">
                      #{m.id}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => onUpdateMemberName('red', m.id, e.target.value)}
                        className="bg-slate-800 border border-slate-700 focus:border-red-400 rounded px-2 py-1 text-sm font-bold text-white focus:outline-none w-32 sm:w-36"
                        maxLength={15}
                      />
                      <div className="text-[11px] text-red-300/80 mt-0.5 font-medium">
                        Vị trí: {m.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end text-xs text-slate-300">
                    <span className="flex items-center gap-1 font-semibold">
                      <Dumbbell className="w-3 h-3 text-amber-400" />
                      Lực: {m.strength}
                    </span>
                    <span className="text-slate-400 text-[11px]">Nặng: {m.weight} kg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            id="close-roster-confirm-btn"
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
          >
            Đã Xong & Lưu Tên
          </button>
        </div>
      </div>
    </div>
  );
};
