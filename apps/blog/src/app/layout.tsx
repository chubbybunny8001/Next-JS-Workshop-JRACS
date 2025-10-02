// Next.js
import type { Metadata } from 'next';

// Styles
import './globals.css';

// Components
import { Footer } from '@repo/ui/components/layout/footer';
import { Links, Root } from '@repo/ui/components/layout/navigation';

export const metadata: Metadata = {
  title: 'Vercel Academy Foundation - Blog',
  description: 'VAF Blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const quickLinks = [
    { href: '/', label: 'Blog Home' },
    {
      href: `http://${process.env.NEXT_PUBLIC_WEB_BASE_URL}/about`,
      label: 'About Us',
    },
    {
      href: `http://${process.env.NEXT_PUBLIC_WEB_BASE_URL}/gallery`,
      label: 'Gallery',
    },
    {
      href: `http://${process.env.NEXT_PUBLIC_WEB_BASE_URL}/contact`,
      label: 'Contact',
    },
  ];

  const resourceLinks = [
    { href: `http://${process.env.NEXT_PUBLIC_WEB_BASE_URL}`, label: 'Web' },
    {
      href: `http://${process.env.NEXT_PUBLIC_WEB_BASE_URL}/contact`,
      label: 'Support',
    },
  ];

  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-8">
        <Root>
            <Links
              navigationExternalLinkText="Web"
              navigationExternalLinkUrl={`http://${process.env.NEXT_PUBLIC_WEB_BASE_URL}`}
            />
        </Root>
        {children}
        <Footer quickLinks={quickLinks} resourceLinks={resourceLinks} />
      </body>
    </html>
  );
}
