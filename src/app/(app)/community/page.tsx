'use client';

import { useState } from 'react';
import { CommunityFeed } from '@/components/community/community-feed';
import { CreatePostForm } from '@/components/community/create-post-form';
import { mockCommunityPosts } from '@/lib/data';
import type { CommunityPost } from '@/lib/types';

export default function CommunityPage() {
  // In a real app, this state would be managed by a server/database.
  // We're using local state and mock data for demonstration.
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  
  // This function simulates refetching posts after a new one is created.
  const handlePostCreated = () => {
    // In a real app, you would refetch from the server.
    // Here we just re-set the state to trigger a re-render if needed,
    // though the new post isn't actually added to our mock data array.
    setPosts([...posts]); 
  };
  
  return (
    <div className="container py-8">
       <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-headline tracking-tight">Community Space</h1>
        <p className="text-muted-foreground max-w-2xl">
          Connect with others on the same journey. Share your wins, ask for advice, and find encouragement in our safe, anonymous forum.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <CommunityFeed posts={posts} />
        </div>
        <div className="md:col-span-1">
            <div className="sticky top-24">
                <CreatePostForm onPostCreated={handlePostCreated} />
            </div>
        </div>
      </div>
    </div>
  );
}
