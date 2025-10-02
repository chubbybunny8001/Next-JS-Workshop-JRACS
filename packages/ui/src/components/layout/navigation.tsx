'use client';
import { cn } from '@repo/ui/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../button';

// Move to client and server files to reduce bundle size and improve speed

interface NavigationProps {
  navigationExternalLinkText: string;
  navigationExternalLinkUrl: string;
  navItems?: { href: string; label: string }[];
}

function Root({ children, className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

// function Container({
//   children,
//   className,
//   ...props
// }: React.ComponentProps<'div'>) {
//   return (
//     <div className={cn('container mx-auto px-4', className)} {...props}>
//       {children}
//     </div>
//   );
// }

// function Content({
//   children,
//   className,
//   ...props
// }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       {...props}
//       className={cn('flex h-16 items-center justify-between', className)}
//     >
//       {children}
//     </div>
//   );
// }

// function Logo({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
//       {...props}
//       className={cn('font-semibold text-xl tracking-tight', className)}
//     />
//   );
// }

// function DesktopLinks({
//   navigationExternalLinkText = ' Blog',
//   navigationExternalLinkUrl = `http://${process.env.NEXT_PUBLIC_BLOG_BASE_URL}`,
//   navItems = [],
// }: NavigationProps): React.JSX.Element {
//   const pathname = usePathname();
//   return (
//       <div className="hidden md:flex md:items-center md:gap-8">
//         {navItems.map((item) => (
//           <Link
//             className={cn(
//               'font-medium text-sm transition-colors hover:text-accent',
//               pathname === item.href
//                 ? 'text-foreground'
//                 : 'text-muted-foreground'
//             )}
//             href={item.href}
//             key={item.href}
//           >
//             {item.label}
//           </Link>
//         ))}
//         <Button asChild size="sm" variant="default">
//           <a href={navigationExternalLinkUrl} rel="noopener noreferrer">
//             {navigationExternalLinkText}
//           </a>
//         </Button>
//       </div>
//   )
// }

function Links({
  navigationExternalLinkText = ' Blog',
  navigationExternalLinkUrl = `http://${process.env.NEXT_PUBLIC_BLOG_BASE_URL}`,
  navItems = [],
}: NavigationProps): React.JSX.Element {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="container mx-auto px-4">
      <div className="flex h-16 items-center justify-between">
        <Link className="font-semibold text-xl tracking-tight" href="/">
          Company
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
         {navItems.map((item) => (
          <Link
            className={cn(
              'font-medium text-sm transition-colors hover:text-accent',
              pathname === item.href
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
        <Button asChild size="sm" variant="default">
          <a href={navigationExternalLinkUrl} rel="noopener noreferrer">
            {navigationExternalLinkText}
          </a>
        </Button>
      </div>
        {/* Mobile Menu Button */}
        <Button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          size="icon"
          variant="ghost"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="border-border border-t py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                className={cn(
                  'font-medium text-sm transition-colors hover:text-accent',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
                href={item.href}
                key={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="w-fit" size="sm" variant="default">
              <a href={navigationExternalLinkUrl} rel="noopener noreferrer">
                {navigationExternalLinkText}
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export {
  Root,
  Links,
};
