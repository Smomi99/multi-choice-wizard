
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: QuizOption[];
  correctAnswers: string[];
  multiSelect: boolean;
}

export interface QuizData {
  quizTitle: string;
  quizDescription: string;
  questions: QuizQuestion[];
}

export interface UserAnswer {
  questionId: number;
  selectedOptions: string[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answers: UserAnswer[];
}
