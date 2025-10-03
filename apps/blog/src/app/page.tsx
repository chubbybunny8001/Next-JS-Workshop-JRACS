// Components
import { BlogPostsGrid } from '@components/blog-posts-grid';

// API Methods
import { fetchCategories, fetchPosts } from '@repo/api/blog';

// Next.js
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Insights, Tutorials & Stories | Company Name',
  description:
    'Read the latest insights, tutorials, and stories from our team. Stay updated with industry trends, best practices, and expert knowledge.',
  keywords: [
    'blog',
    'articles',
    'insights',
    'tutorials',
    'technology',
    'best practices',
    'industry news',
  ],
  openGraph: {
    title: 'Blog - Insights, Tutorials & Stories',
    description:
      'Read the latest insights, tutorials, and stories from our team. Stay updated with industry trends, best practices, and expert knowledge.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Insights, Tutorials & Stories',
    description:
      'Read the latest insights, tutorials, and stories from our team. Stay updated with industry trends, best practices, and expert knowledge.',
  },
};

export default async function HomePage() {

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(5000); // Simulate network delay for demo purposes

  const [posts, categories] = await Promise.all([
    
    fetchPosts(50), // Fetch more posts to have enough for filtering
    fetchCategories(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className="border-border border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Our Blog
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
              Insights, tutorials, and stories from our team
            </p>
          </div>
        </div>
      </section>
      <BlogPostsGrid categories={categories} posts={posts} />
    </main>
  );
}
