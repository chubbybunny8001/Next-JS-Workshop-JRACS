/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Skeleton } from '@repo/ui/components/skeleton';

export function GalleryGridSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="group relative overflow-hidden rounded-lg" key={i}>
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6">
                <Skeleton className="mb-2 h-6 w-3/4 bg-white/20" />
                <Skeleton className="h-4 w-1/2 bg-white/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
