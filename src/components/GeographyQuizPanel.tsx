import React, { useState, useEffect } from 'react';
import { GeoQuestion, TeamId, GameMode, BotDifficulty, PlayerMember } from '../types';
import { TeamQuizCard } from './TeamQuizCard';
import { QuizCenterFeedback } from './QuizCenterFeedback';

interface GeographyQuizPanelProps {
  arenaElement: React.ReactNode;
  blueTeam: PlayerMember[];
  redTeam: PlayerMember[];
  currentQuestion: GeoQuestion;
  questionIndex: number; // 0 to 9
  totalQuestions: number; // 10
  currentTeamTurn: TeamId; // 'blue' or 'red'
  gameMode: GameMode;
  botDifficulty: BotDifficulty;
  isEvaluating: boolean;
  selectedAnswer: number | null;
  lastResult: {
    isCorrect: boolean;
    pulledTeam: TeamId;
    strokes: number; // 1 or 2
  } | null;
  history: Array<{
    questionIndex: number;
    team: TeamId;
    isCorrect: boolean;
  }>;
  quizCorrectCount: { blue: number; red: number };
  onAnswer: (selectedIndex: number) => void;
  onNextQuestion: () => void;
  isMatchFinished: boolean;
}

export const GeographyQuizPanel: React.FC<GeographyQuizPanelProps> = ({
  arenaElement,
  blueTeam,
  redTeam,
  currentQuestion,
  questionIndex,
  totalQuestions,
  currentTeamTurn,
  gameMode,
  botDifficulty,
  isEvaluating,
  selectedAnswer,
  lastResult,
  history,
  quizCorrectCount,
  onAnswer,
  onNextQuestion,
  isMatchFinished,
}) => {
  const [countdownTimer, setCountdownTimer] = useState(30);

  // Countdown timer for each question (30 seconds)
  useEffect(() => {
    if (isEvaluating || isMatchFinished) return;
    setCountdownTimer(30);

    const timer = setInterval(() => {
      setCountdownTimer((prev) => {
        if (prev <= 1) {
          // Time out counts as wrong answer!
          onAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex, isEvaluating, isMatchFinished, onAnswer]);

  // Bot auto-answer when it is Red team's turn in PvE
  useEffect(() => {
    if (currentTeamTurn === 'red' && gameMode === 'pve' && !isEvaluating && !isMatchFinished) {
      // Bot thinks for 1.8s then answers
      const thinkTime = setTimeout(() => {
        // Probability of correct answer based on difficulty
        const successRate =
          botDifficulty === 'easy' ? 0.5 : botDifficulty === 'medium' ? 0.72 : 0.9;
        const isBotCorrect = Math.random() < successRate;

        if (isBotCorrect) {
          onAnswer(currentQuestion.correctIndex);
        } else {
          // Pick wrong option
          const wrongIndices = [0, 1, 2, 3].filter((i) => i !== currentQuestion.correctIndex);
          const chosen = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
          onAnswer(chosen);
        }
      }, 1600);

      return () => clearTimeout(thinkTime);
    }
  }, [currentTeamTurn, gameMode, botDifficulty, isEvaluating, isMatchFinished, currentQuestion, onAnswer]);

  return (
    <div
      id="geography-quiz-3column-stage"
      className="w-full grid grid-cols-1 md:grid-cols-[1fr_300px_1fr] lg:grid-cols-[1fr_340px_1fr] items-start gap-3 lg:gap-4"
    >
      {/* 1. CỘT BÊN TRÁI: BẢNG CÂU HỎI ĐỘI XANH */}
      <div className="w-full">
        <TeamQuizCard
          team="blue"
          teamName="ĐỘI XANH"
          members={blueTeam}
          currentQuestion={currentQuestion}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          isMyTurn={currentTeamTurn === 'blue'}
          gameMode={gameMode}
          botDifficulty={botDifficulty}
          countdownTimer={countdownTimer}
          isEvaluating={isEvaluating}
          selectedAnswer={selectedAnswer}
          lastResult={lastResult}
          score={quizCorrectCount.blue}
          onAnswer={onAnswer}
          isMatchFinished={isMatchFinished}
        />
      </div>

      {/* 2. CỘT Ở GIỮA: BẢNG KÉO CO NHỎ LẠI */}
      <div className="w-full flex flex-col gap-2.5">
        {/* Arena Live Pulling Board */}
        {arenaElement}

        {/* Central Feedback, 10 Questions Dots & Next Button */}
        <QuizCenterFeedback
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          currentTeamTurn={currentTeamTurn}
          isEvaluating={isEvaluating}
          lastResult={lastResult}
          history={history}
          onNextQuestion={onNextQuestion}
          isMatchFinished={isMatchFinished}
        />
      </div>

      {/* 3. CỘT BÊN PHẢI: BẢNG CÂU HỎI ĐỘI ĐỎ */}
      <div className="w-full">
        <TeamQuizCard
          team="red"
          teamName="ĐỘI ĐỎ"
          members={redTeam}
          currentQuestion={currentQuestion}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          isMyTurn={currentTeamTurn === 'red'}
          gameMode={gameMode}
          botDifficulty={botDifficulty}
          countdownTimer={countdownTimer}
          isEvaluating={isEvaluating}
          selectedAnswer={selectedAnswer}
          lastResult={lastResult}
          score={quizCorrectCount.red}
          onAnswer={onAnswer}
          isMatchFinished={isMatchFinished}
        />
      </div>
    </div>
  );
};
