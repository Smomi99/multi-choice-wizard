
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswers: string[];
  onAnswerChange: (answers: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswers,
  onAnswerChange,
  onNext,
  onPrevious,
  onSubmit,
  isLastQuestion,
}) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSingleSelect = (optionId: string) => {
    onAnswerChange([optionId]);
  };

  const handleMultiSelect = (optionId: string, checked: boolean) => {
    if (checked) {
      onAnswerChange([...selectedAnswers, optionId]);
    } else {
      onAnswerChange(selectedAnswers.filter(id => id !== optionId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-xl">
              Question {currentQuestionIndex + 1}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {question.multiSelect ? 'Multiple answers allowed' : 'Select one answer'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {question.questionText}
            </h2>

            {question.multiSelect ? (
              <div className="space-y-4">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      id={option.id}
                      checked={selectedAnswers.includes(option.id)}
                      onCheckedChange={(checked) => handleMultiSelect(option.id, checked as boolean)}
                    />
                    <Label 
                      htmlFor={option.id} 
                      className="flex-1 cursor-pointer text-lg"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={selectedAnswers[0] || ''}
                onValueChange={handleSingleSelect}
                className="space-y-4"
              >
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label 
                      htmlFor={option.id} 
                      className="flex-1 cursor-pointer text-lg"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {selectedAnswers.length > 0 ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Answer selected
                    </span>
                  ) : (
                    'Please select an answer'
                  )}
                </p>
              </div>

              {isLastQuestion ? (
                <Button
                  onClick={onSubmit}
                  disabled={selectedAnswers.length === 0}
                  className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Submit Quiz</span>
                </Button>
              ) : (
                <Button
                  onClick={onNext}
                  disabled={selectedAnswers.length === 0}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizQuestion;
