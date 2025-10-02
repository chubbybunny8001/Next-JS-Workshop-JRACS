/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import {
  fetchGalleryCategories,
  fetchGalleryItems,
  type GalleryItem,
} from '@repo/api/brand';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [galleryItems, galleryCategories] = await Promise.all([
          fetchGalleryItems(24),
          fetchGalleryCategories(),
        ]);
        setItems(galleryItems);
        setCategories(['All', ...galleryCategories]);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    setLoadedImages(new Set());
  }, [selectedCategory]);

  const handleImageLoad = (itemId: number) => {
    setLoadedImages((prev) => new Set(prev).add(itemId));
  };

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

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

      {/* Filter Section */}
      <section className="border-border border-b bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                variant={selectedCategory === category ? 'default' : 'outline'}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="mb-8 text-center text-muted-foreground text-sm">
                Showing {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'item' : 'items'}
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item, index) => (
                  <div
                    className="group fade-in slide-in-from-left-4 relative animate-in overflow-hidden rounded-lg border border-border bg-card fill-mode-both transition-all hover:shadow-lg"
                    key={item.id}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationDuration: '0.5s',
                    }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {/* Blurred placeholder background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 backdrop-blur-xl transition-opacity duration-500 ${
                          loadedImages.has(Number(item.id))
                            ? 'opacity-0'
                            : 'opacity-100'
                        }`}
                      />
                      {/* Actual image with fade-in */}
                      <Image
                        alt={item.title}
                        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                          loadedImages.has(Number(item.id))
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                        height={300}
                        onLoad={() => handleImageLoad(Number(item.id))}
                        src={item.thumbnailUrl || '/placeholder.svg'}
                        width={400}
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 font-semibold text-sm">
                          {item.title}
                        </h3>
                        {item.featured && (
                          <Badge
                            className="shrink-0 text-xs"
                            variant="secondary"
                          >
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="mb-3 line-clamp-2 text-muted-foreground text-xs">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="text-xs" variant="outline">
                          {item.category}
                        </Badge>
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge
                            className="text-xs"
                            key={tag}
                            variant="outline"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
