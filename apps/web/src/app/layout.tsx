// Next.js
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

// Styles
import './globals.css';

// Components
import { Footer } from '@repo/ui/components/layout/footer';
import { Root, Links } from '@repo/ui/components/layout/navigation';
import { Toaster } from '@repo/ui/components/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Random Company - Web',
  description: 'Random Company Website that has a gallery, contact form, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Would move these to CMS
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const resourceLinks = [
    { href: `http://${process.env.NEXT_PUBLIC_BLOG_BASE_URL}`, label: 'Blog' },
    { href: '/contact', label: 'Support' },
  ];

  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-8">
        <Root>
          <Links
            navItems={navItems}
            navigationExternalLinkText="Blog"
            navigationExternalLinkUrl={`http://${process.env.NEXT_PUBLIC_BLOG_BASE_URL}`}
          />
        </Root>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
        <Toaster />
        <Footer quickLinks={quickLinks} resourceLinks={resourceLinks} />
        <SpeedInsights />
        <Analytics />
      </body>
  </html>
  )
}
