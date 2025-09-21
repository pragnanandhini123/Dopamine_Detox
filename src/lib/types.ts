import type { LucideIcon } from 'lucide-react';

export type AppUsage = {
  appName: string;
  usageTime: number; // in minutes
  icon: LucideIcon | string;
};

export type UsageData = {
  dopamineLevel: number; // 0-100
  screenTime: number; // in minutes
  unlockCount: number;
  nightTimeUsagePeak: boolean;
  appUsage: AppUsage[];
};

export type CommunityPost = {
  id: string;
  avatar: string; // URL to image
  avatarHint: string;
  message: string;
  timestamp: string;
  reactions: number;
};

export type BreakActivityType = 'breathing' | 'journaling';
