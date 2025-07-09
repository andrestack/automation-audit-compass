import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, CheckCircle } from 'lucide-react';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchedulingModal = ({ isOpen, onClose }: SchedulingModalProps) => {
  const handleCalendlyClick = () => {
    // In a real app, this would open Calendly or your preferred scheduling tool
    window.open('https://calendly.com/your-calendar-link', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Schedule Your Strategy Call
          </DialogTitle>
          <DialogDescription>
            Book a free 30-minute session to discuss your automation roadmap
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Call Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">30 minutes</div>
                <div className="text-sm text-muted-foreground">Focused strategy session</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <Video className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">Video call</div>
                <div className="text-sm text-muted-foreground">Zoom or Google Meet</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <div className="font-medium">Completely free</div>
                <div className="text-sm text-muted-foreground">No sales pressure</div>
              </div>
            </div>
          </div>

          {/* What We'll Cover */}
          <div>
            <h4 className="font-semibold mb-3">What we'll cover:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                Review your assessment results in detail
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                Discuss specific tools and implementation steps
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                Calculate precise ROI for your automation projects
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                Create a custom 90-day action plan
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button onClick={handleCalendlyClick} variant="hero" className="w-full">
              Choose Your Time Slot
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              You'll receive a calendar invite with all the details
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};