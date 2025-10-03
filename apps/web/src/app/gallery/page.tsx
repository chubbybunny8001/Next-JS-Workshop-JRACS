// API Methods
import { fetchGalleryCategories, fetchGalleryItems } from '@repo/api/brand';

// Components
import { GalleryFilter } from '@components/gallery-filter';
import { GalleryGrid } from '@components/gallery-grid';
import { GalleryFilterSkeleton } from '@/src/components/gallery-filter-skeleton';
import { GalleryGridSkeleton } from '@/src/components/gallery-grid-skeleton';

// Next.js
import { Suspense } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - Our Portfolio & Projects | Company Name',
  description:
    'Explore our portfolio ofprojects, events, and achievements that showcase our work and culture. Browse through our gallery of architecture, interior design, and more.',
  keywords: [
    'gallery',
    'portfolio',
    'projects',
    'work',
    'architecture',
    'interior design',
    'events',
  ],
  openGraph: {
    title: 'Gallery - Our Portfolio & Projects',
    description:
      'Explore our portfolio of projects, events, and achievements that showcase our work and culture. Browse through our gallery of architecture, interior design, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery - Our Portfolio & Projects',
    description:
      'Explore our portfolio of projects, events, and achievements that showcase our work and culture. Browse through our gallery of architecture, interior design, and more.',
  },
};


export default async function GalleryPage() {
  const [items, categories] = await Promise.all([
    fetchGalleryItems(20),
    fetchGalleryCategories(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className="border-border border-b py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Our Gallery
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground leading-relaxed">
              Explore our portfolio of projects, events, and achievements that
              showcase our work and culture.
            </p>
          </div>
        </div>
      </section>
      <Suspense fallback={<GalleryFilterSkeleton />}>
        <GalleryFilter categories={['All', ...categories]} />
      </Suspense>
      <Suspense fallback={<GalleryGridSkeleton />}>
        <GalleryGrid items={items} />
      </Suspense>
    </main>
  );
}
