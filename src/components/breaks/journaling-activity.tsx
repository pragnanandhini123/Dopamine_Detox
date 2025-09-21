'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { generateJournalingPrompt } from '@/ai/flows/ai-generated-journaling-prompt';
import { Loader2, PenSquare, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type JournalingActivityProps = {
  usageLevel: 'Green' | 'Yellow' | 'Red';
};

export function JournalingActivity({ usageLevel }: JournalingActivityProps) {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleNewPrompt = async () => {
    setIsLoading(true);
    try {
      const result = await generateJournalingPrompt({ usageLevel });
      setPrompt(result.prompt);
    } catch (error) {
      console.error('Error generating journaling prompt:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch a new prompt. Please try again.',
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><PenSquare /> Journaling Break</CardTitle>
        <CardDescription>Take a moment to reflect and write.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg min-h-[80px] flex items-center justify-center text-center">
            {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
                <p className="italic text-foreground">{prompt || 'Click below to get a new journaling prompt.'}</p>
            )}
        </div>
        <Button onClick={handleNewPrompt} disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Get New Prompt
        </Button>
        <Textarea
          placeholder="Write your thoughts here... Your entry is private and will not be saved."
          rows={6}
          className="resize-none"
        />
      </CardContent>
    </Card>
  );
}
