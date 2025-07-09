import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { QuestionCard } from '@/components/QuestionCard';
import { AutomationCalculator } from '@/components/AutomationCalculator';
import { AutomationReport } from '@/components/AutomationReport';
import { SchedulingModal } from '@/components/SchedulingModal';
import { questions, getTotalQuestions } from '@/data/questions';

type AssessmentStep = 'welcome' | 'questions' | 'calculator' | 'report';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const handleStart = () => {
    setCurrentStep('questions');
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentStep('calculator');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCalculatorNext = () => {
    setCurrentStep('report');
  };

  const handleScheduleCall = () => {
    setIsSchedulingOpen(true);
  };

  const canGoNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = answers[currentQuestion.id];
    
    if (!currentQuestion.required) return true;
    
    if (currentQuestion.type === 'multiple-choice' && currentQuestion.title.includes('Select all that apply')) {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    return answer !== undefined && answer !== null && answer !== '';
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      
      case 'questions':
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
            <QuestionCard
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
              onNext={handleNext}
              onPrevious={handlePrevious}
              currentQuestion={currentQuestionIndex}
              totalQuestions={getTotalQuestions()}
              canGoNext={canGoNext()}
              canGoPrevious={currentQuestionIndex > 0}
            />
          </div>
        );
      
      case 'calculator':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
            <AutomationCalculator
              answers={answers}
              onNext={handleCalculatorNext}
            />
          </div>
        );
      
      case 'report':
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4 py-8">
            <AutomationReport
              answers={answers}
              onScheduleCall={handleScheduleCall}
            />
          </div>
        );
      
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <>
      {renderStep()}
      <SchedulingModal 
        isOpen={isSchedulingOpen} 
        onClose={() => setIsSchedulingOpen(false)} 
      />
    </>
  );
};

export default Index;
