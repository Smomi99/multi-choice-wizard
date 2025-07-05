
import React, { useState, useEffect } from 'react';
import QuizWelcome from '@/components/QuizWelcome';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResults from '@/components/QuizResults';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizData } from '@/types/quiz';
import quizDataJson from '@/data/quizData.json';

const Index = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizData] = useState<QuizData>(quizDataJson as QuizData);
  
  const {
    currentQuestionIndex,
    currentQuestion,
    quizCompleted,
    quizResult,
    getCurrentUserAnswer,
    updateUserAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    submitQuiz,
    resetQuiz,
    isLastQuestion,
  } = useQuiz(quizData);

  useEffect(() => {
    console.log('Quiz app initialized with data:', quizData);
  }, [quizData]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    console.log('Quiz started');
  };

  const handleAnswerChange = (selectedOptions: string[]) => {
    updateUserAnswer(currentQuestion.id, selectedOptions);
    console.log(`Answer updated for question ${currentQuestion.id}:`, selectedOptions);
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    resetQuiz();
    console.log('Quiz restarted');
  };

  // Show welcome screen
  if (!quizStarted) {
    return (
      <QuizWelcome 
        quizData={quizData} 
        onStartQuiz={handleStartQuiz}
      />
    );
  }

  // Show results screen
  if (quizCompleted && quizResult) {
    return (
      <QuizResults
        result={quizResult}
        quizData={quizData}
        onRetakeQuiz={handleRetakeQuiz}
      />
    );
  }

  // Show quiz questions
  return (
    <QuizQuestion
      question={currentQuestion}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={quizData.questions.length}
      selectedAnswers={getCurrentUserAnswer()}
      onAnswerChange={handleAnswerChange}
      onNext={goToNextQuestion}
      onPrevious={goToPreviousQuestion}
      onSubmit={submitQuiz}
      isLastQuestion={isLastQuestion}
    />
  );
};

export default Index;
