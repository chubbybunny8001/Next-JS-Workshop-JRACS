// API Methods
/** biome-ignore-all assist/source/organizeImports: I like ordering my imports */
import { BlogReadingHistory } from '@components/blog-reading-history';
import { fetchPostBySlug, fetchRecommendedPostsBySlug } from '@repo/api/blog';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { BlogPostImage } from '@/src/components/blog-post-image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2 } from 'lucide-react';
// Next.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage || '/placeholder.svg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || '/placeholder.svg'],
    },
  };
}


export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, recommendedPosts] = await Promise.all([
    fetchPostBySlug(slug),
    fetchRecommendedPostsBySlug(slug, 3),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="fade-in animate-in duration-700">
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

      {/* Hero Section */}
      <section className="border-border border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-pretty text-muted-foreground text-xl leading-relaxed">
              {post.excerpt}
            </p>

            {/* Author and Meta Info */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    alt={post.author.name}
                    fetchPriority="high"
                    src={post.author.avatar || '/placeholder.svg'}
                  />
                  <AvatarFallback>
                    {post.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {post.author.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes.toLocaleString()} likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="border-border border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <BlogPostImage
              alt={post.title}
              src={post.coverImage || '/placeholder.svg'}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, idx) => (
                <p
                  className="mb-4 text-foreground leading-relaxed"
                  key={`${post.id}-${idx}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 border-border border-t pt-8">
              <h3 className="mb-4 font-medium text-sm">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center justify-between">
              <Button size="sm" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Article
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Heart className="h-4 w-4" />
                <span>{post.likes.toLocaleString()} likes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Posts */}
      {recommendedPosts.length > 0 && (
        <section className="border-border border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-bold text-2xl">Recommended Reading</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {recommendedPosts.map((recommendedPost) => (
                <Link
                  className="group"
                  href={`/post/${recommendedPost.slug}`}
                  key={recommendedPost.id}
                >
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        alt={recommendedPost.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        height={450}
                        quality={80}
                        sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 33vw, 25vw"
                        src={recommendedPost.coverImage || '/placeholder.svg'}
                        width={800}
                      />
                    </div>
                    <CardHeader>
                      <Badge className="mb-2 w-fit">
                        {recommendedPost.category}
                      </Badge>
                      <CardTitle className="line-clamp-2 text-balance transition-colors group-hover:text-accent">
                        {recommendedPost.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {recommendedPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{recommendedPost.readingTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Reading History Navigation */}
      <BlogReadingHistory currentSlug={post.slug} currentTitle={post.title} />
    </main>
  );
}
