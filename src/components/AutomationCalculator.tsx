import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Clock, DollarSign, TrendingUp } from 'lucide-react';

interface CalculatorProps {
  answers: Record<string, any>;
  onNext: () => void;
}

export const AutomationCalculator = ({ answers, onNext }: CalculatorProps) => {
  const [calculations, setCalculations] = useState({
    currentWeeklyHours: 0,
    automationPotential: 0,
    timeSavingsHours: 0,
    monthlySavings: 0,
    yearlySavings: 0,
    productivityGain: 0
  });

  useEffect(() => {
    calculateSavings();
  }, [answers]);

  const calculateSavings = () => {
    // Get data from answers
    const adminHours = answers['time-on-admin'] || 0;
    const businessSize = answers['business-size'];
    const repetitiveTasks = Array.isArray(answers['repetitive-tasks']) ? answers['repetitive-tasks'] : [];
    const manualErrors = answers['manual-errors'] || 1;
    const techComfort = answers['tech-comfort'];
    
    // Calculate base automation potential based on tasks
    const taskMultipliers: Record<string, number> = {
      'email-management': 0.6,
      'data-entry': 0.8,
      'scheduling': 0.7,
      'invoicing': 0.9,
      'lead-qualification': 0.7,
      'reporting': 0.8,
      'social-media': 0.9,
      'customer-support': 0.6,
      'inventory': 0.8,
      'document-processing': 0.7
    };

    let automationPercentage = 0;
    repetitiveTasks.forEach((task: string) => {
      automationPercentage += (taskMultipliers[task] || 0.5) * 10;
    });

    // Adjust based on business factors
    const sizeMultiplier = {
      'solo': 0.6,
      'small': 0.7,
      'medium': 0.8,
      'large': 0.9
    }[businessSize] || 0.7;

    const techMultiplier = {
      'beginner': 0.6,
      'intermediate': 0.8,
      'advanced': 0.9,
      'expert': 1.0
    }[techComfort] || 0.8;

    // Error rate adds urgency
    const errorMultiplier = 1 + (manualErrors - 1) * 0.05;

    const finalAutomationPotential = Math.min(
      automationPercentage * sizeMultiplier * techMultiplier * errorMultiplier,
      85 // Cap at 85% automation
    );

    // Calculate time savings
    const timeSavingsHours = (adminHours * finalAutomationPotential) / 100;
    
    // Calculate cost savings (assuming $50/hour average value)
    const hourlyRate = {
      'solo': 40,
      'small': 50,
      'medium': 65,
      'large': 80
    }[businessSize] || 50;

    const monthlySavings = timeSavingsHours * 4.33 * hourlyRate;
    const yearlySavings = monthlySavings * 12;

    // Additional productivity gains from error reduction
    const errorReductionValue = (manualErrors / 10) * monthlySavings * 0.3;
    const totalMonthlySavings = monthlySavings + errorReductionValue;
    const totalYearlySavings = totalMonthlySavings * 12;

    setCalculations({
      currentWeeklyHours: adminHours,
      automationPotential: Math.round(finalAutomationPotential),
      timeSavingsHours: Math.round(timeSavingsHours * 10) / 10,
      monthlySavings: Math.round(totalMonthlySavings),
      yearlySavings: Math.round(totalYearlySavings),
      productivityGain: Math.round((timeSavingsHours / Math.max(adminHours, 1)) * 100)
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success font-medium">
          <Calculator className="w-4 h-4" />
          Your Automation Potential
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Here's What We Found</h2>
        <p className="text-muted-foreground text-lg">
          Based on your responses, here's how automation could transform your business
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {calculations.automationPotential}%
            </div>
            <p className="text-sm text-muted-foreground">Automation Potential</p>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-success mb-1">
              {calculations.timeSavingsHours}h
            </div>
            <p className="text-sm text-muted-foreground">Hours Saved/Week</p>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent mb-1">
              ${calculations.monthlySavings.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Monthly Savings</p>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {calculations.productivityGain}%
            </div>
            <p className="text-sm text-muted-foreground">Productivity Gain</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Time Impact
            </CardTitle>
            <CardDescription>
              How automation will transform your weekly schedule
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm">Current admin time:</span>
              <span className="font-semibold">{calculations.currentWeeklyHours} hours/week</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
              <span className="text-sm">Time you'll save:</span>
              <span className="font-semibold text-success">{calculations.timeSavingsHours} hours/week</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
              <span className="text-sm">New admin time:</span>
              <span className="font-semibold text-primary">
                {Math.round((calculations.currentWeeklyHours - calculations.timeSavingsHours) * 10) / 10} hours/week
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-success" />
              Financial Impact
            </CardTitle>
            <CardDescription>
              The monetary value of your time savings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
              <span className="text-sm">Monthly savings:</span>
              <span className="font-semibold text-success">${calculations.monthlySavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
              <span className="text-sm">Yearly savings:</span>
              <span className="font-semibold text-accent">${calculations.yearlySavings.toLocaleString()}</span>
            </div>
            <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
              This includes time savings, error reduction, and improved efficiency gains.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Step CTA */}
      <div className="text-center space-y-4">
        <p className="text-lg text-muted-foreground">
          Ready to see your personalized automation roadmap?
        </p>
        <Button 
          onClick={onNext}
          variant="hero"
          size="lg"
          className="text-lg px-8 py-4"
        >
          Get My Custom Report
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};