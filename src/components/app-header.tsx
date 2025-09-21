'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sparkles, Home, Users } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/community', label: 'Community', icon: Users },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon, isMobile }: { href: string; label: string; icon: React.ElementType; isMobile?: boolean }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} passHref>
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          className={cn('w-full justify-start', { 'text-primary': isActive && !isMobile })}
          onClick={() => setSheetOpen(false)}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold">Dopamine Detox</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 p-4">
              <Link href="/dashboard" className="flex items-center space-x-2 mb-4" onClick={() => setSheetOpen(false)}>
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="font-headline text-2xl font-bold">Dopamine Detox</span>
                </Link>
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} isMobile />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
