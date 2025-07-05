
import { useState, useCallback } from 'react';
import { UserAnswer, QuizResult, QuizData } from '@/types/quiz';

export const useQuiz = (quizData: QuizData) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const getCurrentUserAnswer = useCallback(() => {
    return userAnswers.find(answer => answer.questionId === currentQuestion.id)?.selectedOptions || [];
  }, [userAnswers, currentQuestion.id]);

  const updateUserAnswer = useCallback((questionId: number, selectedOptions: string[]) => {
    setUserAnswers(prev => {
      const existingIndex = prev.findIndex(answer => answer.questionId === questionId);
      const newAnswer: UserAnswer = { questionId, selectedOptions };
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newAnswer;
        return updated;
      } else {
        return [...prev, newAnswer];
      }
    });
  }, []);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, quizData.questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const calculateResults = useCallback((): QuizResult => {
    let correctAnswers = 0;

    const results = quizData.questions.map(question => {
      const userAnswer = userAnswers.find(answer => answer.questionId === question.id);
      
      if (userAnswer) {
        const isCorrect = question.correctAnswers.length === userAnswer.selectedOptions.length &&
          question.correctAnswers.every(correct => userAnswer.selectedOptions.includes(correct));
        
        if (isCorrect) {
          correctAnswers++;
        }
      }
      
      return userAnswer || { questionId: question.id, selectedOptions: [] };
    });

    const score = (correctAnswers / quizData.questions.length) * 100;

    return {
      totalQuestions: quizData.questions.length,
      correctAnswers,
      score,
      answers: results,
    };
  }, [quizData.questions, userAnswers]);

  const submitQuiz = useCallback(() => {
    const result = calculateResults();
    setQuizResult(result);
    setQuizCompleted(true);
    console.log('Quiz submitted with result:', result);
  }, [calculateResults]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setQuizResult(null);
    console.log('Quiz reset');
  }, []);

  return {
    currentQuestionIndex,
    currentQuestion,
    userAnswers,
    quizCompleted,
    quizResult,
    getCurrentUserAnswer,
    updateUserAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    submitQuiz,
    resetQuiz,
    isLastQuestion: currentQuestionIndex === quizData.questions.length - 1,
  };
};
