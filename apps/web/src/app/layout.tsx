// Next.js
import type { Metadata } from 'next';

// Styles
import './globals.css';

// Components
import { Footer } from '@repo/ui/components/layout/footer';
import { Root, Links } from '@repo/ui/components/layout/navigation';
import { Toaster } from '@repo/ui/components/sonner';

export const metadata: Metadata = {
  title: 'Vercel Academy Foundation - Web',
  description: 'VAF Web',
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
        {children}
        <Toaster />
        <Footer quickLinks={quickLinks} resourceLinks={resourceLinks} />
      </body>
  </html>
  )
}
