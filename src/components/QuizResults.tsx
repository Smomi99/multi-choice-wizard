
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, RotateCcw, CheckCircle, XCircle, Award } from 'lucide-react';
import { QuizResult, QuizData } from '@/types/quiz';

interface QuizResultsProps {
  result: QuizResult;
  quizData: QuizData;
  onRetakeQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, quizData, onRetakeQuiz }) => {
  const percentage = Math.round(result.score);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Excellent!', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { text: 'Great Job!', color: 'bg-blue-100 text-blue-800' };
    if (score >= 60) return { text: 'Good Work!', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Keep Trying!', color: 'bg-red-100 text-red-800' };
  };

  const scoreBadge = getScoreBadge(percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Results Summary Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
            <div className="flex justify-center mb-4">
              {percentage >= 80 ? (
                <Trophy className="h-16 w-16 text-yellow-300" />
              ) : (
                <Award className="h-16 w-16 text-blue-300" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              {quizData.quizTitle}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div>
                <div className={`text-6xl font-bold ${getScoreColor(percentage)} mb-2`}>
                  {percentage}%
                </div>
                <Badge className={`text-lg px-4 py-2 ${scoreBadge.color}`}>
                  {scoreBadge.text}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {result.totalQuestions - result.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-600">Incorrect Answers</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
              </div>

              <div className="w-full max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Your Score</span>
                  <span>{result.correctAnswers}/{result.totalQuestions}</span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>

              <Button 
                onClick={onRetakeQuiz}
                className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Detailed Results</CardTitle>
            <CardDescription>Review your answers for each question</CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              {quizData.questions.map((question, index) => {
                const userAnswer = result.answers.find(a => a.questionId === question.id);
                const isCorrect = userAnswer && 
                  question.correctAnswers.length === userAnswer.selectedOptions.length &&
                  question.correctAnswers.every(correct => userAnswer.selectedOptions.includes(correct));

                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 flex-1">
                        {index + 1}. {question.questionText}
                      </h3>
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500 ml-2" />
                      )}
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option) => {
                        const isSelected = userAnswer?.selectedOptions.includes(option.id) || false;
                        const isCorrectOption = question.correctAnswers.includes(option.id);
                        
                        let optionClass = 'p-2 rounded border ';
                        if (isCorrectOption && isSelected) {
                          optionClass += 'bg-green-100 border-green-300 text-green-800';
                        } else if (isCorrectOption) {
                          optionClass += 'bg-green-50 border-green-200 text-green-700';
                        } else if (isSelected) {
                          optionClass += 'bg-red-100 border-red-300 text-red-800';
                        } else {
                          optionClass += 'bg-gray-50 border-gray-200 text-gray-600';
                        }

                        return (
                          <div key={option.id} className={optionClass}>
                            <div className="flex items-center justify-between">
                              <span>{option.text}</span>
                              <div className="flex space-x-2">
                                {isSelected && (
                                  <Badge variant="outline" className="text-xs">
                                    Your Answer
                                  </Badge>
                                )}
                                {isCorrectOption && (
                                  <Badge className="text-xs bg-green-600">
                                    Correct
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizResults;
