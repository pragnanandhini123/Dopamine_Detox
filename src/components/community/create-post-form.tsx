'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { moderateText } from '@/ai/flows/ai-community-moderation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  message: z.string().min(10, {
    message: 'Your message must be at least 10 characters long.',
  }).max(280, {
    message: 'Your message must be no longer than 280 characters.',
  }),
});

type CreatePostFormProps = {
  onPostCreated: () => void;
};

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Step 1: Moderate the text
      const moderationResult = await moderateText({ text: values.message });

      if (moderationResult.isNegative) {
        toast({
          variant: 'destructive',
          title: 'Post Moderated',
          description: `Your post could not be submitted. Reason: ${moderationResult.reason || 'Content violates community guidelines.'}`,
        });
        setIsSubmitting(false);
        return;
      }

      // Step 2: "Save" the post (in a real app, this would be an API call)
      console.log('Post submitted:', values.message);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: 'Success! ✨',
        description: 'Your post has been shared with the community.',
      });

      form.reset();
      onPostCreated(); // Notify parent to refetch posts

    } catch (error) {
      console.error('Error submitting post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
    setIsSubmitting(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Share Your Progress</CardTitle>
        <CardDescription>Share a win, a struggle, or a tip with the anonymous community. Your post will be moderated by AI to ensure positivity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Today I broke my midnight scroll habit..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Share Post
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
