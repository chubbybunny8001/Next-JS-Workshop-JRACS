/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

// Components
import { Button } from '@repo/ui/components/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Next.js
import Link from 'next/link';
import { useEffect } from 'react';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>

          <h1 className="mb-3 font-bold text-3xl tracking-tight">
            Failed to Load Blog Posts
          </h1>

          <p className="mb-8 text-pretty text-muted-foreground leading-relaxed">
            We encountered an error while fetching the blog posts. This could be
            due to a network issue or a problem with our servers.
          </p>

          {error.message && (
            <div className="mb-8 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="font-mono text-destructive text-sm">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button className="gap-2" onClick={reset} size="lg">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href={'/'}>Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
