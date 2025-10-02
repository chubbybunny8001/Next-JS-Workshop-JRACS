/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Card, CardContent, CardHeader } from '@repo/ui/components/card';
import { Skeleton } from '@repo/ui/components/skeleton';

export function BlogPostsSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Category Filter Skeleton */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-30 rounded-full" />
          </div>
        </div>

        {/* Posts Count Skeleton */}
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            <span className="inline-block animate-[bounce_1s_ease-in-out_infinite]">
              Loading Posts
            </span>
            <span className="inline-block animate-[bounce_1s_ease-in-out_0.2s_infinite]">
                .
            </span>
            <span className="inline-block animate-[bounce_1s_ease-in-out_0.4s_infinite]">
              .
            </span>
            <span className="inline-block animate-[bounce_1s_ease-in-out_0.6s_infinite]">
              .
            </span>
          </p>{' '}
        </div>

        {/* Blog Posts Grid Skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card className="h-full overflow-hidden" key={index}>
              {/* Image Skeleton */}
              <Skeleton className="aspect-video w-full" />

              <CardHeader>
                {/* Title Skeleton */}
                <Skeleton className="mb-2 h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />

                {/* Excerpt Skeleton */}
                <div className="mt-2 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardHeader>

              <CardContent>
                {/* Author Skeleton */}
                <div className="mb-4 flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Date and Reading Time Skeleton */}
                <div className="mb-4 flex items-center gap-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>

                {/* Views and Likes Skeleton */}
                <div className="mb-4 flex items-center gap-4">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                </div>

                {/* Tags Skeleton */}
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
