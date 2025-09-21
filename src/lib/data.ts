import type { UsageData, CommunityPost } from '@/lib/types';
import { Youtube, Instagram, Twitter, MessageSquare } from 'lucide-react';

export const mockUsageData: UsageData = {
  dopamineLevel: 82,
  screenTime: 285,
  unlockCount: 78,
  nightTimeUsagePeak: true,
  appUsage: [
    { appName: 'Instagram', usageTime: 125, icon: Instagram },
    { appName: 'YouTube', usageTime: 90, icon: Youtube },
    { appName: 'Twitter', usageTime: 45, icon: Twitter },
    { appName: 'Messages', usageTime: 25, icon: MessageSquare },
  ],
};

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    avatarHint: 'abstract portrait',
    message: 'I reduced YouTube by 1 hour today ✨ It was hard but the breathing exercise from the SOS button really helped me reset.',
    timestamp: '2 hours ago',
    reactions: 12,
  },
  {
    id: '2',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    avatarHint: 'abstract portrait',
    message: 'Just wanted to share a small win! I read a book instead of scrolling before bed. The "Focus Warrior" badge felt surprisingly good to get.',
    timestamp: '5 hours ago',
    reactions: 25,
  },
  {
    id: '3',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
    avatarHint: 'abstract portrait',
    message: 'Anyone else struggle with app switching? I jump between 3-4 apps for no reason. Any tips?',
    timestamp: '1 day ago',
    reactions: 8,
  },
  {
    id: '4',
    avatar: 'https://picsum.photos/seed/avatar4/100/100',
    avatarHint: 'abstract portrait',
    message: 'The AI reflection was spot on today. It noticed my late-night scrolling and it made me more mindful. Kinda cool and a little spooky!',
    timestamp: '2 days ago',
    reactions: 18,
  },
];
