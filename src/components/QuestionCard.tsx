import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Question } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  answer: any;
  onAnswer: (answer: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentQuestion: number;
  totalQuestions: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const QuestionCard = ({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  currentQuestion,
  totalQuestions,
  canGoNext,
  canGoPrevious
}: QuestionCardProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array.isArray(answer) ? answer : answer ? [answer] : []
  );

  const handleOptionSelect = (value: string) => {
    if (question.type === 'multiple-choice' && question.title.includes('Select all that apply')) {
      // Multiple selection
      const newSelection = selectedOptions.includes(value)
        ? selectedOptions.filter(v => v !== value)
        : [...selectedOptions, value];
      setSelectedOptions(newSelection);
      onAnswer(newSelection);
    } else {
      // Single selection
      setSelectedOptions([value]);
      onAnswer(value);
    }
  };

  const handleScaleChange = (value: number) => {
    onAnswer(value);
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedOptions.includes(option.value)
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/50 hover:bg-primary/2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    selectedOptions.includes(option.value)
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}>
                    {selectedOptions.includes(option.value) && (
                      <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-6">
            <div className="px-2">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={answer || question.min}
                onChange={(e) => handleScaleChange(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{question.min}</span>
              <span className="font-semibold text-primary text-lg">
                {answer || question.min}
              </span>
              <span>{question.max}</span>
            </div>
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter a number"
          />
        );

      case 'text':
        return (
          <textarea
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
            placeholder="Enter your answer"
          />
        );

      default:
        return null;
    }
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="animate-scale-in">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium capitalize">
              {question.category}
            </span>
          </div>
          <CardTitle className="text-xl">{question.title}</CardTitle>
          {question.description && (
            <CardDescription className="text-base">
              {question.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {renderQuestionInput()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          variant="hero"
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};