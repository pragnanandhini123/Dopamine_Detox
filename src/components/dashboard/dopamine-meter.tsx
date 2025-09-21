'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type DopamineMeterProps = {
  level: number; // 0-100
};

export function DopamineMeter({ level }: DopamineMeterProps) {
  const [displayLevel, setDisplayLevel] = useState(0);

  useEffect(() => {
    const animationTimeout = setTimeout(() => setDisplayLevel(level), 100);
    return () => clearTimeout(animationTimeout);
  }, [level]);

  const getMeterColor = (value: number) => {
    if (value > 75) return 'bg-destructive';
    if (value > 40) return 'bg-warning';
    return 'bg-accent';
  };

  const getZoneText = (value: number) => {
    if (value > 75) return 'Dopamine Overload';
    if (value > 40) return 'Risk of Overuse';
    return 'Balanced Usage';
  };

  const colorClass = getMeterColor(level);
  const zoneText = getZoneText(level);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dopamine Meter</CardTitle>
        <CardDescription>Your current digital wellness level.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-8 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full transition-all duration-1000 ease-out', colorClass)}
            style={{ width: `${displayLevel}%` }}
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-lg">{zoneText}</p>
          <p className="text-sm text-muted-foreground">{level}% Usage Score</p>
        </div>
      </CardContent>
    </Card>
  );
}
