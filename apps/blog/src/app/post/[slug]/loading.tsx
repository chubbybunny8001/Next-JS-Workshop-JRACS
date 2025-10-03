import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader } from '@repo/ui/components/card';
import { Skeleton } from '@repo/ui/components/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostLoading() {
  return (
    <main>
      {/* Back Button */}
      <section className="border-border border-b py-4">
        <div className="container mx-auto px-4">
          <Button asChild size="sm" variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Section Skeleton */}
      <section className="border-border border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <Skeleton className="mb-4 h-6 w-24" />
            <Skeleton className="mb-4 h-12 w-full" />
            <Skeleton className="mb-6 h-12 w-3/4" />
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="mb-2 h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />

            {/* Author and Meta Info Skeleton */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div>
                  <Skeleton className="mb-2 h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image Skeleton */}
      <section className="border-border border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="py-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="py-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Tags Skeleton */}
            <div className="mt-12 border-border border-t pt-8">
              <Skeleton className="mb-4 h-4 w-16" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>

            {/* Share Skeleton */}
            <div className="mt-8 flex items-center justify-between">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Posts Skeleton */}
      <section className="border-border border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="mb-8 h-8 w-64" />
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card className="h-full overflow-hidden" key={i}>
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="mb-2 h-5 w-20" />
                  <Skeleton className="mb-2 h-6 w-full" />
                  <Skeleton className="mb-1 h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
