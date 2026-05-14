'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Award,
  Heart,
  Star,
  TrendingUp,
  Clock,
  MessageCircle,
  Gift,
  Trophy,
  Crown,
  Sparkles
} from 'lucide-react';

export default function BatchDetailsPage() {
  const params = useParams();
  const batchYear = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [batchData, setBatchData] = useState<any>(null);
  const [representative, setRepresentative] = useState<any>(null);
  const [topAlumni, setTopAlumni] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    // Mock data for the batch
    setTimeout(() => {
      setBatchData({
        year: batchYear,
        totalStudents: Math.floor(Math.random() * 500) + 200,
        verifiedAlumni: Math.floor(Math.random() * 400) + 150,
        totalDonations: Math.floor(Math.random() * 500000) + 100000,
        established: batchYear,
        motto: "Excellence in Education",
        achievements: [
          "Highest pass rate in 1995",
          "Best alumni participation award",
          "Record donation collection"
        ]
      });

      setRepresentative({
        name: batchYear === '1985' ? 'Engineer Nurul Islam' : 
               batchYear === '1980' ? 'Senior Secretary Ahmed' :
               batchYear === '1975' ? 'Dr. Prof. Khaled Hasan' :
               batchYear === '1990' ? 'Dr. Fatema Begum' : 'TBD',
        batch: batchYear,
        profession: batchYear === '1985' ? 'CEO, Tech Corp' :
                   batchYear === '1980' ? 'Government Secretary' :
                   batchYear === '1975' ? 'University Professor' :
                   batchYear === '1990' ? 'Senior Scientist' : 'Alumni',
        badge: batchYear === '1985' ? 'Platinum' :
               batchYear === '1980' ? 'Diamond' :
               batchYear === '1975' ? 'Gold' : 'Silver',
        votes: Math.floor(Math.random() * 300) + 100,
        term: '2024-2026'
      });

      setTopAlumni([
        { name: 'Dr. Abdur Rahman', profession: 'Cardiologist', contributions: 15200, badge: 'Diamond' },
        { name: 'Prof. Khaled Hasan', profession: 'Researcher', contributions: 10500, badge: 'Gold' },
        { name: 'Engineer Nurul Islam', profession: 'Tech Entrepreneur', contributions: 8900, badge: 'Platinum' },
      ]);

      setRecentActivities([
        { user: 'Rakib Ahmed', action: 'donated ₹25,000', time: '2 hours ago', type: 'donation' },
        { user: 'Shamima Akter', action: 'answered 5 questions', time: '4 hours ago', type: 'question' },
        { user: 'Kamal Hossain', action: 'joined the batch', time: '1 day ago', type: 'join' },
      ]);

      setUpcomingEvents([
        { title: 'Batch Reunion', date: 'Dec 20, 2026', location: 'Dhaka', attendees: 85 },
        { title: 'Annual Meet', date: 'Jun 15, 2026', location: 'School Campus', attendees: 120 },
      ]);

      setLoading(false);
    }, 500);
  }, [batchYear]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading batch details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">Batch {batchYear}</h1>
                <Badge className="bg-yellow-500 text-black">Est. {batchYear}</Badge>
              </div>
              <p className="text-blue-100 text-lg">{batchData?.totalStudents}+ Students • {batchData?.verifiedAlumni}+ Verified Alumni</p>
            </div>
            <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
              <Users className="w-4 h-4 mr-2" />
              Join Batch Group
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Batch Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<Users />} label="Total Students" value={batchData?.totalStudents} color="blue" />
              <StatCard icon={<Award />} label="Verified Alumni" value={batchData?.verifiedAlumni} color="green" />
              <StatCard icon={<Gift />} label="Total Donations" value={`₹${(batchData?.totalDonations / 1000).toFixed(0)}K`} color="purple" />
              <StatCard icon={<TrendingUp />} label="Active Members" value="67%" color="orange" />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="alumni" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="alumni">🎓 Alumni</TabsTrigger>
                <TabsTrigger value="activities">📝 Activities</TabsTrigger>
                <TabsTrigger value="events">🎪 Events</TabsTrigger>
                <TabsTrigger value="gallery">📸 Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="alumni" className="space-y-4 mt-4">
                <h3 className="font-semibold text-lg">Top Contributors</h3>
                {topAlumni.map((alumni, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                        {alumni.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{alumni.name}</p>
                        <p className="text-sm text-gray-500">{alumni.profession}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-yellow-100 text-yellow-800">{alumni.badge}</Badge>
                      <p className="text-sm text-blue-600 mt-1">{alumni.contributions} coins</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View All Alumni →</Button>
              </TabsContent>

              <TabsContent value="activities" className="space-y-3 mt-4">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {activity.type === 'donation' && '💰'}
                      {activity.type === 'question' && '💬'}
                      {activity.type === 'join' && '👋'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="events" className="space-y-4 mt-4">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm text-gray-500">📅 {event.date} • 📍 {event.location}</p>
                    <p className="text-xs text-blue-600 mt-1">👥 {event.attendees} attending</p>
                  </div>
                ))}
                <Button className="w-full">Create Event</Button>
              </TabsContent>

              <TabsContent value="gallery" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  📸 Gallery coming soon. Upload your batch photos!
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Batch Representative */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Batch Representative
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {representative?.name?.charAt(0) || 'T'}
                </div>
                <h3 className="font-bold text-lg">{representative?.name}</h3>
                <p className="text-sm text-gray-500">{representative?.profession}</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-800">{representative?.badge}</Badge>
                  <Badge variant="outline">{representative?.votes} votes</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-2">Term: {representative?.term}</p>
                <Button className="w-full mt-4" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Representative
                </Button>
              </CardContent>
            </Card>

            {/* Batch Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {batchData?.achievements.map((achievement: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/batches/${batchYear}/alumni`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Users className="w-4 h-4" /> View All Alumni
                </Link>
                <Link href={`/batches/${batchYear}/contribute`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Gift className="w-4 h-4" /> Contribute to Batch Fund
                </Link>
                <Link href={`/batches/${batchYear}/election`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Vote className="w-4 h-4" /> Batch Election
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon, label, value, color }: any) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  };
  
  return (
    <div className="bg-white rounded-xl p-4 text-center border">
      <div
  className={`w-10 h-10 rounded-full ${
    colors[color as keyof typeof colors]
  } flex items-center justify-center mx-auto mb-2`}
>
        {icon}
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

// Missing Vote icon - add this or use from lucide-react
function Vote(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6-6 6 6"/>
      <path d="M6 21h12"/>
      <path d="M12 3v18"/>
    </svg>
  );
}