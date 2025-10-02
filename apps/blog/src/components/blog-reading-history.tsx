/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import { Button } from '@repo/ui/components/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ReadingHistoryProps {
  currentSlug: string;
  currentTitle: string;
}

export function BlogReadingHistory({
  currentSlug,
  currentTitle,
}: ReadingHistoryProps) {
  const [history, setHistory] = useState<
    Array<{ slug: string; title: string }>
  >([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const pathname = usePathname();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('blog-reading-history');
    const parsedHistory: Array<{ slug: string; title: string }> = savedHistory
      ? JSON.parse(savedHistory)
      : [];

    // Find if current post is already in history
    const existingIndex = parsedHistory.findIndex(
      (item) => item.slug === currentSlug
    );

    let updatedHistory: Array<{ slug: string; title: string }>;
    let newIndex: number;

    if (existingIndex !== -1) {
      // Post already in history, set current index
      updatedHistory = parsedHistory;
      newIndex = existingIndex;
    } else {
      // Add new post to history
      updatedHistory = [
        ...parsedHistory,
        { slug: currentSlug, title: currentTitle },
      ];
      newIndex = updatedHistory.length - 1;
      // Save updated history
      localStorage.setItem(
        'blog-reading-history',
        JSON.stringify(updatedHistory)
      );
    }

    setHistory(updatedHistory);
    setCurrentIndex(newIndex);
  }, [currentSlug, currentTitle, pathname]);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < history.length - 1;

  const previousPost = hasPrevious ? history[currentIndex - 1] : null;
  const nextPost = hasNext ? history[currentIndex + 1] : null;

  if (history.length <= 1) {
    return null;
  }

  return (
    <div className="border-border border-t bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-muted-foreground text-sm">
            Your Reading History
          </p>
          <div className="flex items-center justify-between gap-4">
            {hasPrevious && previousPost ? (
              <Button
                asChild
                className="flex-1 justify-start bg-transparent"
                variant="outline"
              >
                <Link href={`/post/${previousPost.slug}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  <span className="truncate">{previousPost.title}</span>
                </Link>
              </Button>
            ) : (
              <div className="flex-1" />
            )}

            <div className="whitespace-nowrap text-muted-foreground text-sm">
              {currentIndex + 1} of {history.length}
            </div>

            {hasNext && nextPost ? (
              <Button
                asChild
                className="flex-1 justify-end bg-transparent"
                variant="outline"
              >
                <Link href={`/post/${nextPost.slug}`}>
                  <span className="truncate">{nextPost.title}</span>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
