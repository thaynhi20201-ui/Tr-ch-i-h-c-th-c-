import React from 'react';
import { GeoQuestion, TeamId } from '../types';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Sparkles, Award } from 'lucide-react';

interface QuizCenterFeedbackProps {
  questionIndex: number;
  totalQuestions: number;
  currentQuestion: GeoQuestion;
  currentTeamTurn: TeamId;
  isEvaluating: boolean;
  lastResult: {
    isCorrect: boolean;
    pulledTeam: TeamId;
    strokes: number;
  } | null;
  history: Array<{
    questionIndex: number;
    team: TeamId;
    isCorrect: boolean;
  }>;
  onNextQuestion: () => void;
  isMatchFinished: boolean;
}

export const QuizCenterFeedback: React.FC<QuizCenterFeedbackProps> = ({
  questionIndex,
  totalQuestions,
  currentQuestion,
  currentTeamTurn,
  isEvaluating,
  lastResult,
  history,
  onNextQuestion,
  isMatchFinished,
}) => {
  return (
    <div id="quiz-center-feedback-container" className="w-full flex flex-col gap-3">
      {/* Quiz Progress & Rule Header (sits above or below the arena) */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-3 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg">
        {/* 10 Question Progress Dots */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
          <span className="text-[11px] font-bold text-slate-400 mr-0.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-amber-400" />
            10 Câu:
          </span>
          {Array.from({ length: totalQuestions }).map((_, idx) => {
            const histItem = history.find((h) => h.questionIndex === idx);
            let dotStyle = 'bg-slate-800 border-slate-700 text-slate-500';

            if (histItem) {
              dotStyle = histItem.isCorrect
                ? 'bg-emerald-500 border-emerald-400 text-white shadow-xs shadow-emerald-500/50'
                : 'bg-red-500 border-red-400 text-white shadow-xs shadow-red-500/50';
            } else if (idx === questionIndex) {
              dotStyle =
                currentTeamTurn === 'blue'
                  ? 'bg-blue-500 border-white text-white scale-110 ring-2 ring-blue-400/60 animate-pulse'
                  : 'bg-red-500 border-white text-white scale-110 ring-2 ring-red-400/60 animate-pulse';
            }

            return (
              <div
                key={idx}
                className={`w-5 h-5 rounded-md text-[10px] font-extrabold flex items-center justify-center border transition-all ${dotStyle}`}
                title={`Câu ${idx + 1}`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>

        {/* Rule Highlight Pill */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold">
          <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/80">
            ✓ Đúng: Kéo 1
          </span>
          <span className="text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded border border-red-800/80">
            ✗ Sai: Đối thủ kéo 2
          </span>
        </div>
      </div>

      {/* Answer Result & Educational Explanation Banner */}
      {isEvaluating && lastResult && (
        <div
          id="quiz-result-explanation-card"
          className={`w-full rounded-2xl p-4 sm:p-5 border-2 transition-all animate-in fade-in zoom-in-95 duration-200 shadow-2xl ${
            lastResult.isCorrect
              ? 'bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border-emerald-500 shadow-emerald-500/20'
              : 'bg-gradient-to-br from-red-950/90 via-slate-900 to-slate-950 border-red-500 shadow-red-500/20'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              {lastResult.isCorrect ? (
                <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/40">
                  <XCircle className="w-6 h-6" />
                </div>
              )}
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  {lastResult.isCorrect ? (
                    <span>CHÍNH XÁC!</span>
                  ) : (
                    <span>TRẢ LỜI CHƯA ĐÚNG!</span>
                  )}
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      lastResult.pulledTeam === 'blue'
                        ? 'bg-blue-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    Đội {lastResult.pulledTeam === 'blue' ? 'Xanh' : 'Đỏ'} kéo{' '}
                    {lastResult.strokes} nhịp!
                  </span>
                </h3>
                <p className="text-xs text-slate-300">
                  {lastResult.isCorrect
                    ? 'Xuất sắc! Lực kéo +1 nhịp về phía đội nhà.'
                    : 'Rất tiếc! Đội đối phương lập tức tận dụng cơ hội kéo mạnh 2 nhịp.'}
                </p>
              </div>
            </div>

            {/* Next Question Button */}
            {!isMatchFinished && (
              <button
                id="next-question-btn"
                onClick={onNextQuestion}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl hover:shadow-amber-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-amber-300"
              >
                <span>{questionIndex + 1 >= totalQuestions ? 'Xem Kết Quả Trận Đấu' : 'Câu Tiếp Theo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Educational Geography Fact */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 mr-1.5">Kiến thức Địa lý:</span>
              <span className="text-slate-300">{currentQuestion.explanation}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
