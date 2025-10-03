/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Skeleton } from '@repo/ui/components/skeleton';

export function GalleryFilterSkeleton() {
  return (
    <section className="border-border border-b py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton className="h-10 w-24 rounded-full" key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
