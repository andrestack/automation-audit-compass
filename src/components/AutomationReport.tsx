import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Zap,
  ArrowRight,
  Download,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { questions } from '@/data/questions';

interface ReportProps {
  answers: Record<string, any>;
  onScheduleCall: () => void;
}

export const AutomationReport = ({ answers, onScheduleCall }: ReportProps) => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  // Calculate metrics (reuse logic from calculator)
  const calculateMetrics = () => {
    const adminHours = answers['time-on-admin'] || 0;
    const businessSize = answers['business-size'];
    const repetitiveTasks = Array.isArray(answers['repetitive-tasks']) ? answers['repetitive-tasks'] : [];
    const manualErrors = answers['manual-errors'] || 1;
    const techComfort = answers['tech-comfort'];
    
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

    const sizeMultiplier = { 'solo': 0.6, 'small': 0.7, 'medium': 0.8, 'large': 0.9 }[businessSize] || 0.7;
    const techMultiplier = { 'beginner': 0.6, 'intermediate': 0.8, 'advanced': 0.9, 'expert': 1.0 }[techComfort] || 0.8;
    const errorMultiplier = 1 + (manualErrors - 1) * 0.05;

    const finalAutomationPotential = Math.min(automationPercentage * sizeMultiplier * techMultiplier * errorMultiplier, 85);
    const timeSavingsHours = (adminHours * finalAutomationPotential) / 100;
    const hourlyRate = { 'solo': 40, 'small': 50, 'medium': 65, 'large': 80 }[businessSize] || 50;
    const monthlySavings = timeSavingsHours * 4.33 * hourlyRate;
    const yearlySavings = monthlySavings * 12;

    return {
      automationPotential: Math.round(finalAutomationPotential),
      timeSavingsHours: Math.round(timeSavingsHours * 10) / 10,
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings)
    };
  };

  const metrics = calculateMetrics();

  // Generate recommendations based on answers
  const generateRecommendations = () => {
    const repetitiveTasks = Array.isArray(answers['repetitive-tasks']) ? answers['repetitive-tasks'] : [];
    const techComfort = answers['tech-comfort'];
    const budget = answers['automation-budget'];
    const timeline = answers['implementation-timeline'];

    const recommendations = [];

    // Task-specific recommendations
    const taskRecommendations: Record<string, { title: string; description: string; priority: 'high' | 'medium' | 'low'; effort: string }> = {
      'email-management': {
        title: 'Email Automation & Templates',
        description: 'Set up automated email responses, templates, and smart filtering to handle 60% of your email workload.',
        priority: 'high',
        effort: 'Low effort'
      },
      'data-entry': {
        title: 'Data Integration & Sync',
        description: 'Connect your tools to automatically sync data and eliminate manual entry between systems.',
        priority: 'high',
        effort: 'Medium effort'
      },
      'scheduling': {
        title: 'Calendar Automation',
        description: 'Implement automated scheduling tools that let clients book directly and send reminders.',
        priority: 'high',
        effort: 'Low effort'
      },
      'invoicing': {
        title: 'Automated Billing',
        description: 'Set up recurring invoices, payment reminders, and automated payment processing.',
        priority: 'high',
        effort: 'Medium effort'
      },
      'lead-qualification': {
        title: 'Lead Scoring & Nurturing',
        description: 'Automate lead qualification with scoring systems and drip email campaigns.',
        priority: 'medium',
        effort: 'Medium effort'
      },
      'reporting': {
        title: 'Automated Reporting',
        description: 'Create dashboards and automated reports that update in real-time.',
        priority: 'medium',
        effort: 'High effort'
      },
      'social-media': {
        title: 'Social Media Automation',
        description: 'Schedule posts, auto-respond to messages, and track engagement automatically.',
        priority: 'low',
        effort: 'Low effort'
      },
      'customer-support': {
        title: 'Chatbots & Help Desk',
        description: 'Deploy AI chatbots and automated ticket routing to handle common inquiries.',
        priority: 'medium',
        effort: 'Medium effort'
      }
    };

    // Add recommendations based on selected tasks
    repetitiveTasks.forEach((task: string) => {
      if (taskRecommendations[task]) {
        recommendations.push(taskRecommendations[task]);
      }
    });

    // Sort by priority
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const recommendations = generateRecommendations();

  const copyReport = () => {
    const reportText = `
AUTOMATION ASSESSMENT REPORT

📊 Your Results:
• Automation Potential: ${metrics.automationPotential}%
• Time Savings: ${metrics.timeSavingsHours} hours/week
• Monthly Savings: $${metrics.monthlySavings.toLocaleString()}
• Yearly Savings: $${metrics.yearlySavings.toLocaleString()}

🎯 Top Recommendations:
${recommendations.slice(0, 3).map((rec, i) => `${i + 1}. ${rec.title}: ${rec.description}`).join('\n')}

Ready to implement these automations? Schedule a strategy call to get started.
    `;

    navigator.clipboard.writeText(reportText);
    toast({
      title: 'Report copied!',
      description: 'Your automation report has been copied to clipboard.',
    });
  };

  const sendEmail = () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address.',
        variant: 'destructive'
      });
      return;
    }

    // In a real app, this would send to a backend
    setIsEmailSent(true);
    toast({
      title: 'Report sent!',
      description: `Your automation report has been sent to ${email}`,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success font-medium">
          <CheckCircle className="w-4 h-4" />
          Assessment Complete
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Your Personal Automation Report</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Based on your responses, here's your customized automation strategy and implementation roadmap.
        </p>
      </div>

      {/* Key Metrics Summary */}
      <Card className="bg-gradient-hero text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Automation Opportunity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">{metrics.automationPotential}%</div>
              <div className="text-sm opacity-90">Automation Potential</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{metrics.timeSavingsHours}h</div>
              <div className="text-sm opacity-90">Hours Saved/Week</div>
            </div>
            <div>
              <div className="text-3xl font-bold">${metrics.monthlySavings.toLocaleString()}</div>
              <div className="text-sm opacity-90">Monthly Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold">${metrics.yearlySavings.toLocaleString()}</div>
              <div className="text-sm opacity-90">Yearly Savings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Priority Automation Recommendations
          </CardTitle>
          <CardDescription>
            Start with these high-impact automations based on your specific business needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.slice(0, 5).map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h4 className="font-semibold">{rec.title}</h4>
                      <Badge variant={rec.priority === 'high' ? 'default' : rec.priority === 'medium' ? 'secondary' : 'outline'}>
                        {rec.priority} priority
                      </Badge>
                      <span className="text-sm text-muted-foreground">{rec.effort}</span>
                    </div>
                    <p className="text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            90-Day Implementation Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                30
              </div>
              <div>
                <h4 className="font-semibold mb-1">Days 1-30: Quick Wins</h4>
                <p className="text-muted-foreground">Start with email templates, calendar automation, and basic integrations. These require minimal setup but provide immediate time savings.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                60
              </div>
              <div>
                <h4 className="font-semibold mb-1">Days 31-60: Process Automation</h4>
                <p className="text-muted-foreground">Implement data syncing, automated billing, and customer communication workflows. These provide substantial efficiency gains.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                90
              </div>
              <div>
                <h4 className="font-semibold mb-1">Days 61-90: Advanced Systems</h4>
                <p className="text-muted-foreground">Deploy reporting dashboards, AI-powered tools, and complex integrations that transform your entire operation.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Save Your Report
            </CardTitle>
            <CardDescription>
              Copy or email this report for future reference
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={sendEmail} variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
            <Button onClick={copyReport} variant="outline" className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Report
            </Button>
            {isEmailSent && (
              <p className="text-sm text-success text-center">✓ Report sent to {email}</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Ready to Get Started?
            </CardTitle>
            <CardDescription>
              Book a free 30-minute strategy session to discuss implementation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-primary" />
                <span>Personalized automation strategy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-primary" />
                <span>Tool recommendations & setup guidance</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-primary" />
                <span>ROI analysis for your specific situation</span>
              </div>
            </div>
            <Button onClick={onScheduleCall} variant="hero" className="w-full">
              Schedule Free Strategy Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};