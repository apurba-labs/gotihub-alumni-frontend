'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Calendar,
  Settings,
  Shield,
  Palette,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Menu,
  X,
  User,
  Building2,
  Trophy,
  Heart,
  Mail,
  FileText,
  TrendingUp,
  Award,
  Gift,
  Star,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Globe,
  Lock,
  Database,
  Zap
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') {
        setIsAuthorized(true);
      } else {
        router.push('/dashboard');
        return;
      }
    } catch (error) {
      router.push('/login');
      return;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, section: 'main' },
    { href: '/admin/verifications', label: 'Verifications', icon: <Users className="w-4 h-4" />, section: 'main' },
    { href: '/admin/donations', label: 'Donations', icon: <DollarSign className="w-4 h-4" />, section: 'main' },
    { href: '/admin/expenses', label: 'Expenses', icon: <CreditCard className="w-4 h-4" />, section: 'main' },
    { href: '/admin/elections', label: 'Elections', icon: <Trophy className="w-4 h-4" />, section: 'main' },
    { href: '/admin/family', label: 'Family Tree', icon: <Heart className="w-4 h-4" />, section: 'main' },
    { href: '/admin/events', label: 'Events', icon: <Calendar className="w-4 h-4" />, section: 'main' },
    { divider: true },
    { href: '/admin/settings/general', label: 'General', icon: <Settings className="w-4 h-4" />, section: 'settings' },
    { href: '/admin/settings/profile', label: 'Profile', icon: <User className="w-4 h-4" />, section: 'settings' },
    { href: '/admin/settings/appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" />, section: 'settings' },
    { href: '/admin/settings/roles', label: 'Roles & Permissions', icon: <Shield className="w-4 h-4" />, section: 'settings' },
    { href: '/admin/settings/billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" />, section: 'settings' },
    { href: '/admin/settings/notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" />, section: 'settings' },
  ];

  const currentSection = pathname?.includes('/settings') ? 'settings' : 'main';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Claude-style Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="flex items-center justify-between p-4 border-b">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="font-semibold text-gray-800">Gotihub Admin</span>
              </div>
            ) : (
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white text-xs font-bold">G</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-gray-600"
            >
              {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {/* Main Section */}
            {sidebarOpen && (
              <div className="px-3 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
              </div>
            )}
            <div className="space-y-0.5">
              {navItems.filter(item => !item.divider && item.section === 'main').map((item) => (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-lg transition ${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${!sidebarOpen && 'justify-center'}`}
                >
                  {item.icon}
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 mx-3 border-t" />

            {/* Settings Section */}
            {sidebarOpen && (
              <div className="px-3 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</p>
              </div>
            )}
            <div className="space-y-0.5">
              {navItems.filter(item => !item.divider && item.section === 'settings').map((item) => (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-lg transition ${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${!sidebarOpen && 'justify-center'}`}
                >
                  {item.icon}
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer Area */}
          <div className="border-t p-3">
            <button
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span className="text-sm">Log out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Claude-style Top Bar */}
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-700 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {pathname?.includes('/settings') ? 'Settings' : 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Apurba</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}