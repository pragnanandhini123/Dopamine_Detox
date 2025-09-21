import { mockUsageData } from '@/lib/data';
import type { UsageData } from '@/lib/types';
import { DopamineMeter } from '@/components/dashboard/dopamine-meter';
import { AIReflectionCard } from '@/components/dashboard/ai-reflection-card';
import { SosModal } from '@/components/dashboard/sos-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Smartphone, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const getUsageLevel = (level: number) => {
    if (level > 75) return 'Red';
    if (level > 40) return 'Yellow';
    return 'Green';
}

const StatCard = ({ icon: Icon, title, value, unit }: { icon: React.ElementType, title: string, value: string | number, unit: string }) => (
  <Card className="bg-secondary/50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const usageData: UsageData = mockUsageData;
  const usageLevel = getUsageLevel(usageData.dopamineLevel);

  return (
    <>
      <div className="container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-headline tracking-tight">Your Daily Dashboard</h1>
          <p className="text-muted-foreground">
            Here's a snapshot of your digital wellness. Let's build healthier habits together.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DopamineMeter level={usageData.dopamineLevel} />
          </div>
          
          <AIReflectionCard usageInput={{
            screenTime: usageData.screenTime,
            appUsage: usageData.appUsage,
            unlockCount: usageData.unlockCount,
            nightTimeUsagePeak: usageData.nightTimeUsagePeak
          }}/>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:col-span-3">
            <StatCard icon={Clock} title="Screen Time" value={`${Math.floor(usageData.screenTime / 60)}h ${usageData.screenTime % 60}m`} unit="Total for today" />
            <StatCard icon={Smartphone} title="Unlock Count" value={usageData.unlockCount} unit="Times you checked your phone" />
            <StatCard icon={TrendingUp} title="Night Usage" value={usageData.nightTimeUsagePeak ? 'High' : 'Low'} unit="Peak usage after 10 PM" />
          </div>
          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-headline">App Usage Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {usageData.appUsage.map(({ appName, usageTime, icon: Icon }) => (
                  <li key={appName} className="flex items-center">
                    <div className="bg-secondary p-2 rounded-lg mr-4">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{appName}</p>
                      <p className="text-sm text-muted-foreground">{`${Math.floor(usageTime / 60)}h ${usageTime % 60}m`}</p>
                    </div>
                    <Badge variant="outline">{`${Math.round((usageTime / usageData.screenTime) * 100)}%`}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <SosModal usageLevel={usageLevel} />
    </>
  );
}
