import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  quickLinks: { href: string; label: string }[];
  resourceLinks: { href: string; label: string }[];
}

export function Footer({
  quickLinks = [],
  resourceLinks = [],
}: FooterProps) {
  return (
    <footer className="border-border border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold text-lg">Company</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Leading provider of innovative solutions for modern businesses.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-accent"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-lg">Resources</h3>
            {/* Split Here */}
            <ul className="space-y-2 text-sm">
              
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-accent"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-4">
              <a
                className="text-muted-foreground transition-colors hover:text-accent"
                href="https://google.com"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                className="text-muted-foreground transition-colors hover:text-accent"
                href="https://google.com"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                className="text-muted-foreground transition-colors hover:text-accent"
                href="https://google.com"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                className="text-muted-foreground transition-colors hover:text-accent"
                href="https://google.com"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-border border-t pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
