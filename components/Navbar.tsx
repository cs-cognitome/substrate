"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: '~/whoami', path: '/whoami' },
    { name: '~/research', path: '/research' },
    { name: '~/certs', path: '/certs' },
  ];

  return (
    <nav className="w-full bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-sm">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary-dim transition-colors group">
          <Terminal size={18} className="group-hover:animate-pulse" />
          <span className="hidden sm:inline">visitor@root:~$ {pathname === '/' ? '' : pathname}</span>
          <span className="sm:hidden">~$ {pathname === '/' ? '' : pathname}</span>
          <span className="w-2 h-4 bg-primary animate-pulse inline-block ml-1"></span>
        </Link>
        <div className="flex gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-primary transition-colors text-gray-400`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Animated energy line */}
      <div className="nav-energy-line" />
    </nav>
  );
}
