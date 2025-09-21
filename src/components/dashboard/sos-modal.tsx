'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { HeartPulse, Wind, PenSquare } from 'lucide-react';
import { BreathingActivity } from '@/components/breaks/breathing-activity';
import { JournalingActivity } from '@/components/breaks/journaling-activity';
import type { BreakActivityType } from '@/lib/types';
import { cn } from '@/lib/utils';


const activities: { type: BreakActivityType, icon: React.ElementType, title: string, description: string }[] = [
  { type: 'breathing', icon: Wind, title: "2-Minute Breathing Animation", description: "A quick way to calm your mind." },
  { type: 'journaling', icon: PenSquare, title: "AI-Generated Journaling Prompt", description: "A creative prompt to spur reflection." },
];

export function SosModal({ usageLevel }: { usageLevel: 'Green' | 'Yellow' | 'Red' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<BreakActivityType | null>(null);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      const timer = setTimeout(() => {
        setSelectedActivity(null);
        setShowActivity(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleSelectActivity = (activity: BreakActivityType) => {
    setSelectedActivity(activity);
    setShowActivity(true);
  }

  const renderActivity = () => {
    switch (selectedActivity) {
      case 'breathing':
        return <BreathingActivity />;
      case 'journaling':
        return <JournalingActivity usageLevel={usageLevel} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-20 h-20 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center"
          onClick={() => setIsOpen(true)}
        >
          <HeartPulse className="h-8 w-8" />
          <span className="text-xs font-bold">SOS</span>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className={cn("font-headline text-2xl", showActivity && "text-center")}>
              {showActivity ? "Time for a Break" : "Choose a Reset"}
            </DialogTitle>
            <DialogDescription className={cn(showActivity && "text-center")}>
             {showActivity ? "Complete the activity to reset your focus." : "Feeling overwhelmed? Pick a quick, fun alternative."}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 min-h-[300px] flex flex-col justify-center">
            {showActivity ? (
              renderActivity()
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {activities.map((act) => (
                  <button
                    key={act.type}
                    onClick={() => handleSelectActivity(act.type)}
                    className="p-4 border rounded-lg text-left hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary p-3 rounded-lg">
                        <act.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{act.title}</p>
                        <p className="text-sm text-muted-foreground">{act.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {showActivity && <div className="p-6 pt-0"><Button variant="outline" className="w-full" onClick={() => setShowActivity(false)}>Back to Activities</Button></div>}
        </DialogContent>
      </Dialog>
    </>
  );
}
