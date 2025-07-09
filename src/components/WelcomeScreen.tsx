import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clock, DollarSign, TrendingUp, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
            <Zap className="w-4 h-4" />
            Free Automation Assessment
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Discover Your Automation Potential
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find out exactly how much time and money you could save with the right automation strategy. 
            Get personalized recommendations in just 5 minutes.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg mb-2">Save Time</CardTitle>
              <CardDescription>
                Identify tasks that could be automated to free up hours every week
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-lg mb-2">Cut Costs</CardTitle>
              <CardDescription>
                Calculate potential cost savings from reduced manual work and errors
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg mb-2">Scale Faster</CardTitle>
              <CardDescription>
                Get a roadmap for growing your business without growing your workload
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card className="bg-gradient-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">What You'll Receive</CardTitle>
            <CardDescription>
              Your personalized automation assessment includes:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold">Time Savings Calculation</h4>
                  <p className="text-sm text-muted-foreground">Exact hours you could save each week</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold">Cost Reduction Analysis</h4>
                  <p className="text-sm text-muted-foreground">Potential monthly and yearly savings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold">Priority Automation List</h4>
                  <p className="text-sm text-muted-foreground">Which processes to automate first</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold">Implementation Roadmap</h4>
                  <p className="text-sm text-muted-foreground">Step-by-step automation strategy</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={onStart}
            variant="hero"
            size="lg"
            className="text-lg px-8 py-4"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Takes 5 minutes • No email required to start
          </p>
        </div>
      </div>
    </div>
  );
};