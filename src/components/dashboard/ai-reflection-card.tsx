'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { aiReflectionOnUsage, type AIReflectionOnUsageInput } from '@/ai/flows/ai-reflection-on-usage';
import { useToast } from '@/hooks/use-toast';

type AIReflectionCardProps = {
  usageInput: AIReflectionOnUsageInput;
};

export function AIReflectionCard({ usageInput }: AIReflectionCardProps) {
  const [reflection, setReflection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateReflection = async () => {
    setIsLoading(true);
    setReflection(null);
    try {
      const result = await aiReflectionOnUsage(usageInput);
      setReflection(result.reflection);
    } catch (error) {
      console.error('Error generating reflection:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate reflection. Please try again later.',
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Bot />
          AI Reflection
        </CardTitle>
        <CardDescription>Get personalized insights on your digital habits.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center text-center space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Your AI companion is analyzing your day...</p>
          </div>
        ) : reflection ? (
          <p className="italic text-foreground">"{reflection}"</p>
        ) : (
          <p className="text-muted-foreground">Click the button to generate your daily reflection.</p>
        )}
        
        <Button onClick={handleGenerateReflection} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {reflection ? 'Regenerate Reflection' : 'Get my Reflection'}
        </Button>
      </CardContent>
    </Card>
  );
}
