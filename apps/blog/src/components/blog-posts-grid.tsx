'use client';

// API Methods
import type { BlogPost } from '@repo/api/blog';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/tabs';
import { Calendar, Clock, Eye, Heart } from 'lucide-react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface BlogPostsGridProps {
  posts: BlogPost[];
  categories: string[];
}

// Change the setState to utilize a server action fetching the posts for the selected category
//

export function BlogPostsGrid({ posts, categories }: BlogPostsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="mb-12">
          <Tabs
            className="w-full"
            onValueChange={setSelectedCategory}
            value={selectedCategory}
          >
            <TabsList className="inline-flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              <TabsTrigger
                className="rounded-full border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                value="all"
              >
                All Posts
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  className="rounded-full border border-border bg-background px-4 py-2 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  key={category}
                  value={category}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Posts Count */}
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            Showing {filteredPosts.length}{' '}
            {filteredPosts.length === 1 ? 'post' : 'posts'}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <div
                className="fade-in slide-in-from-left-4 animate-in"
                key={post.id}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '500ms',
                  animationFillMode: 'backwards',
                }}
              >
                <Link className="group block" href={`/blog/${post.slug}`} />
                <Link
                  className="group"
                  href={`/post/${post.slug}`}
                  key={post.id}
                >
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        fill
                        src={post.coverImage || '/placeholder.svg'}
                      />
                      <Badge className="absolute top-4 right-4 bg-background/90 text-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-balance transition-colors group-hover:text-primary">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            alt={post.author.name}
                            src={post.author.avatar || '/placeholder.svg'}
                          />
                          <AvatarFallback>
                            {post.author.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-sm">
                            {post.author.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-muted-foreground text-xs">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            className="text-xs"
                            key={tag}
                            variant="secondary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No posts found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
