import type { CommunityPost } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';

const PostCard = ({ post }: { post: CommunityPost }) => {
  return (
    <Card className="bg-background hover:bg-secondary/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={post.avatar} alt="User avatar" data-ai-hint={post.avatarHint} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <p className="text-sm text-foreground">{post.message}</p>
            <div className="flex items-center justify-between text-muted-foreground">
              <p className="text-xs">{post.timestamp}</p>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-pink-400" />
                <span className="text-xs font-medium">{post.reactions}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export function CommunityFeed({ posts }: { posts: CommunityPost[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No posts yet.</p>
                <p>Be the first to share your journey!</p>
            </div>
        )
    }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
