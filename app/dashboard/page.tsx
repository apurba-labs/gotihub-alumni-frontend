'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Award, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Gift,
  TrendingUp,
  Clock,
  BookOpen,
  Users,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';

export default function AlumniDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // User stats
  const [stats, setStats] = useState({
    skillCoins: 1250,
    contributions: 5,
    eventsAttended: 3,
    questionsAnswered: 12,
    rank: 42,
    badge: 'Gold'
  });

  // Recent activities
  const [activities, setActivities] = useState([
    { id: 1, type: 'contribution', title: 'Donated ৳5,000', description: 'To Student Scholarship Fund', date: '2026-05-03', status: 'completed' },
    { id: 2, type: 'event', title: 'Attended Batch 2005 Reunion', description: 'Great meetup with classmates', date: '2026-04-28', status: 'completed' },
    { id: 3, type: 'question', title: 'Answered a question', description: 'About BCS preparation', date: '2026-04-25', coins: '+50', status: 'completed' },
  ]);

  // Upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: '100 Year Celebration', date: 'Dec 15, 2026', location: 'School Campus', attendees: 2500 },
    { id: 2, title: 'Batch 2005 Reunion', date: 'Dec 20, 2026', location: 'Dhaka Club', attendees: 85 },
    { id: 3, title: 'Career Fair 2026', date: 'Jun 1, 2026', location: 'Online + Physical', attendees: 500 },
  ]);

  // Batch mates
  const [batchMates, setBatchMates] = useState([
    { id: 1, name: 'Rakib Ahmed', profession: 'Software Engineer', isOnline: true, batch: 2005 },
    { id: 2, name: 'Shamima Akter', profession: 'Doctor', isOnline: false, batch: 2005 },
    { id: 3, name: 'Kamal Hossain', profession: 'Banker', isOnline: true, batch: 2005 },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New event added', message: '100 Year Celebration scheduled', time: '2 hours ago', read: false },
    { id: 2, title: 'Skill coins earned', message: '+50 coins for answering question', time: '1 day ago', read: false },
    { id: 3, title: 'Batch mate request', message: 'Rakib wants to connect', time: '2 days ago', read: true },
  ]);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleMarkRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-gray-800">Gotihub</span>
              </Link>
              <div className="hidden md:block text-sm text-gray-400">
                Welcome back, {user.name}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
                Home
              </Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
                  {user.name?.charAt(0) || 'A'}
                </div>
                <h2 className="text-xl font-bold mt-4">{user.name}</h2>
                <p className="text-gray-500 text-sm">Batch {user.batch || '2005'}</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800">Verified Alumni</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">{stats.badge} Member</Badge>
                </div>
                
                <div className="mt-6 space-y-3 text-left">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">🏆 Skill Coins</span>
                    <span className="font-bold text-blue-600">{stats.skillCoins}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">📊 Global Rank</span>
                    <span className="font-bold text-purple-600">#{stats.rank}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">💪 Contributions</span>
                    <span className="font-bold text-green-600">{stats.contributions}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6" variant="outline">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="flex gap-1 p-2 border-b overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'overview' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  📊 Overview
                </button>
                <button
                  onClick={() => setActiveTab('activities')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'activities' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  📝 My Activities
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'events' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🎪 Events
                </button>
                <button
                  onClick={() => setActiveTab('batchmates')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'batchmates' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  👥 Batch Mates
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'notifications' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🔔 Notifications
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-2xl font-bold">{stats.skillCoins}</div>
                    <div className="text-xs text-gray-500">Skill Coins</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl mb-2">📝</div>
                    <div className="text-2xl font-bold">{stats.questionsAnswered}</div>
                    <div className="text-xs text-gray-500">Questions Answered</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl mb-2">🎪</div>
                    <div className="text-2xl font-bold">{stats.eventsAttended}</div>
                    <div className="text-xs text-gray-500">Events Attended</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="text-2xl mb-2">💝</div>
                    <div className="text-2xl font-bold">{stats.contributions}</div>
                    <div className="text-xs text-gray-500">Contributions</div>
                  </div>
                </div>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activities.map(activity => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          {activity.type === 'contribution' && '💰'}
                          {activity.type === 'event' && '🎪'}
                          {activity.type === 'question' && '💬'}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.description}</p>
                          <p className="text-xs text-gray-400">{activity.date}</p>
                        </div>
                        {activity.coins && (
                          <Badge className="bg-green-100 text-green-800">{activity.coins}</Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/contribute">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition">
                      <div className="text-2xl mb-1">💰</div>
                      <div className="font-semibold">Make a Contribution</div>
                      <div className="text-xs opacity-90">Support your school</div>
                    </div>
                  </Link>
                  <Link href="/ask-question">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition">
                      <div className="text-2xl mb-1">❓</div>
                      <div className="font-semibold">Ask a Question</div>
                      <div className="text-xs opacity-90">Get help from seniors</div>
                    </div>
                  </Link>
                  <Link href="/blood-donation">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 text-center cursor-pointer hover:shadow-lg transition">
                      <div className="text-2xl mb-1">🩸</div>
                      <div className="font-semibold">Blood Donation</div>
                      <div className="text-xs opacity-90">Save a life today</div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <Card>
                <CardHeader>
                  <CardTitle>My Activity History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400">{activity.date}</p>
                      </div>
                      <Badge variant="outline">{activity.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-500">📅 {event.date} • 📍 {event.location}</p>
                        <p className="text-xs text-gray-400">👥 {event.attendees} attending</p>
                      </div>
                      <Button size="sm">RSVP</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Batch Mates Tab */}
            {activeTab === 'batchmates' && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Batch Mates (Batch {user.batch || '2005'})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {batchMates.map(mate => (
                    <div key={mate.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {mate.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{mate.name}</p>
                          <p className="text-sm text-gray-500">{mate.profession}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {mate.isOnline && (
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition ${!notif.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                      onClick={() => handleMarkRead(notif.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{notif.title}</p>
                          <p className="text-sm text-gray-600">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <Badge className="bg-blue-600">New</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}