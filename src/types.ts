export type TeamId = 'blue' | 'red';

export type GamePlayType = 'quiz' | 'speed'; // 'quiz': 10 câu hỏi Địa lý (kéo 1 nhịp khi đúng, bị kéo 2 nhịp khi sai), 'speed': Kéo co bấm nút tốc độ
export type QuizTurnMode = 'alternate' | 'blue_solo'; // 'alternate': Đội Xanh & Đỏ luân phiên, 'blue_solo': Đội Xanh trả lời 10 câu
export type GameMode = 'pvp' | 'pve' | 'auto'; // pvp: 2 người chơi, pve: người chơi (Xanh) vs Máy (Đỏ), auto: Mô phỏng
export type GameStatus = 'idle' | 'countdown' | 'playing' | 'ended';
export type BotDifficulty = 'easy' | 'medium' | 'hard';

export interface GeoQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizAnswerRecord {
  questionIndex: number;
  answeringTeam: TeamId;
  selectedIndex: number;
  isCorrect: boolean;
  question: GeoQuestion;
}

export interface PlayerMember {
  id: number;
  name: string;
  role: string; // ví dụ: 'Tiền phong', 'Lực sĩ', 'Trợ lực', 'Trụ giữa', 'Chốt đuôi'
  weight: number; // kg
  strength: number; // 1-100
  hairStyle: 'short' | 'spiky' | 'headband' | 'bald' | 'cap';
}

export interface MatchStats {
  bluePulls: number;
  redPulls: number;
  blueCps: number;
  redCps: number;
  durationSeconds: number;
  maxBlueAdvantage: number;
  maxRedAdvantage: number;
}

export interface MatchSettings {
  mode: GameMode;
  botDifficulty: BotDifficulty;
  bestOf: 1 | 3 | 5;
  rhythmBonusEnabled: boolean;
  soundEnabled: boolean;
}
