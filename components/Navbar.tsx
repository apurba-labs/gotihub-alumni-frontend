'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
<Link href="/" className="flex items-center gap-3">
  {/* School Logo - Prominent */}
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-md">
      <span className="text-white font-bold text-lg">ML</span>
    </div>
    <div className="hidden sm:block">
      <div className="font-bold text-gray-800 text-sm leading-tight">
        Chandaikona M. L.
        <span className="block text-xs font-normal text-gray-500">High School</span>
      </div>
    </div>
  </div>
  
  {/* Divider */}
  <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>
  
  {/* Gotihub - Small, subtle */}
  <div className="flex items-center gap-1">
    <span className="text-xs text-gray-400">powered by</span>
    <span className="font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Gotihub
    </span>
    <span className="text-xs text-gray-400 hidden lg:inline">Alumni Network</span>
  </div>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/batches" className="text-gray-600 hover:text-blue-600 transition font-medium">
              Batches
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-blue-600 transition font-medium">
              Events
            </Link>
            <Link href="/transparency" className="text-gray-600 hover:text-blue-600 transition font-medium">
              Transparency
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition font-medium">
              About
            </Link>
            
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Login / Register
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t space-y-3">
            <Link href="/batches" className="block text-gray-600 hover:text-blue-600 py-2">
              Batches
            </Link>
            <Link href="/events" className="block text-gray-600 hover:text-blue-600 py-2">
              Events
            </Link>
            <Link href="/transparency" className="block text-gray-600 hover:text-blue-600 py-2">
              Transparency
            </Link>
            <Link href="/about" className="block text-gray-600 hover:text-blue-600 py-2">
              About
            </Link>
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="w-full">Login / Register</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}