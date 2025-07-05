
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, HelpCircle, CheckSquare } from 'lucide-react';
import { QuizData } from '@/types/quiz';

interface QuizWelcomeProps {
  quizData: QuizData;
  onStartQuiz: () => void;
}

const QuizWelcome: React.FC<QuizWelcomeProps> = ({ quizData, onStartQuiz }) => {
  const multiSelectCount = quizData.questions.filter(q => q.multiSelect).length;
  const singleSelectCount = quizData.questions.length - multiSelectCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold mb-2">{quizData.quizTitle}</CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            {quizData.quizDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <HelpCircle className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-800">{quizData.questions.length}</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Clock className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-800">~{Math.ceil(quizData.questions.length * 1.5)} min</p>
                  <p className="text-sm text-gray-600">Duration</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <CheckSquare className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-semibold text-gray-800">Mixed</p>
                  <p className="text-sm text-gray-600">Question Types</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Quiz Instructions
              </h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Read each question carefully before selecting your answer(s)</li>
                <li>• For single-choice questions, select only one option</li>
                <li>• For multiple-choice questions, you can select multiple options</li>
                <li>• Questions with multiple correct answers are clearly marked</li>
                <li>• You can navigate between questions using the Next/Previous buttons</li>
                <li>• Review your answers before submitting the quiz</li>
                <li>• Your results will be shown immediately after submission</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Question Breakdown:</h4>
              <div className="flex space-x-6 text-sm text-gray-600">
                <span>Single Choice: {singleSelectCount} questions</span>
                <span>Multiple Choice: {multiSelectCount} questions</span>
              </div>
            </div>

            <Button 
              onClick={onStartQuiz}
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizWelcome;
