'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/Navbar';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Gift, 
  Heart, 
  MessageCircle, 
  Award,
  ArrowRight,
  Shield,
  Globe,
  Zap
} from 'lucide-react';

export default function Home() {
  const [transparency, setTransparency] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/transparency')
      .then(res => res.json())
      .then(data => {
        setTransparency(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <Navbar />

      {/* Hero Section - Cleaner Design */}

<section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
  <div className="container mx-auto px-4 py-12 md:py-16">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Side - Text Content */}
      <div className="text-white">
        <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
          🎉 100 Years of Excellence | 1921 - 2026
        </Badge>
        
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
          Chandaikona M. L.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
            High School
          </span>
        </h1>
        
        <p className="text-lg lg:text-xl mb-3 text-blue-100">
          Welcome to the Digital Home of 30,000+ Alumni
        </p>
        <p className="text-base text-blue-200 mb-8">
          104 Batches | 100 Years | One Family
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold shadow-lg">
              🔓 Verify Your Alumni Status
            </Button>
          </Link>
          <Link href="/batches">
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              🌟 Explore Batches
            </Button>
          </Link>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-white/20">
          <div>
            <div className="text-2xl font-bold">30,000+</div>
            <div className="text-xs text-blue-200">Alumni</div>
          </div>
          <div>
            <div className="text-2xl font-bold">104</div>
            <div className="text-xs text-blue-200">Batches</div>
          </div>
          <div>
            <div className="text-2xl font-bold">₹52.4L</div>
            <div className="text-xs text-blue-200">Funds Raised</div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Upcoming Event Image */}
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src="/api/placeholder/500/400" 
              alt="Upcoming Event"
              className="w-full h-auto rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-yellow-400 text-sm font-semibold">🎪 UPCOMING EVENT</p>
              <h3 className="text-white font-bold text-lg">100 Year Celebration</h3>
              <p className="text-white/80 text-sm">December 15, 2026 • School Campus</p>
            </div>
          </div>
          
          {/* Event Countdown */}
          <div className="mt-4 text-center">
            <p className="text-white/70 text-sm mb-2">📅 Countdown to Celebration</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/20 rounded-lg p-2">
                <div className="text-white font-bold text-xl">224</div>
                <div className="text-white/60 text-xs">Days</div>
              </div>
              <div className="bg-white/20 rounded-lg p-2">
                <div className="text-white font-bold text-xl">12</div>
                <div className="text-white/60 text-xs">Hours</div>
              </div>
              <div className="bg-white/20 rounded-lg p-2">
                <div className="text-white font-bold text-xl">45</div>
                <div className="text-white/60 text-xs">Mins</div>
              </div>
              <div className="bg-white/20 rounded-lg p-2">
                <div className="text-white font-bold text-xl">30</div>
                <div className="text-white/60 text-xs">Secs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <section className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-3 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                SPONSORED
              </span>
              <span className="text-white text-sm md:text-base font-medium">
                🎯 Batch 1985 presents: Annual Alumni Meet 2026
              </span>
            </div>
            <Link href="/events/1985-meet">
              <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold">
                Register Now →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar - More Professional */}
      <section className="bg-white border-b shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatCard icon={<Users className="w-5 h-5" />} number="30,000+" label="Total Alumni" color="blue" />
            <StatCard icon={<Calendar className="w-5 h-5" />} number="104" label="Active Batches" color="green" />
            <StatCard icon={<Globe className="w-5 h-5" />} number="1,247" label="Online Now" color="purple" />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} number="₹52.4L" label="Funds Raised" color="orange" />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="feed" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-4 mx-auto bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="feed" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📰 Feed
            </TabsTrigger>
            <TabsTrigger value="batches" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📚 Batches
            </TabsTrigger>
            <TabsTrigger value="events" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              🎪 Events
            </TabsTrigger>
            <TabsTrigger value="transparency" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              💰 Transparency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <ActivityFeed />
                <RecentQuestions />
                <HelpRequests />
              </div>
              <div className="space-y-6">
                <LeaderboardCard />
                <UpcomingEvents />
                <ContributionCard />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="batches">
            <BatchesView />
          </TabsContent>

          <TabsContent value="events">
            <EventsView />
          </TabsContent>

          <TabsContent value="transparency">
            <TransparencyView transparency={transparency} loading={loading} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  number,
  label,
  color,
}: {
  icon: React.ReactNode
  number: string
  label: string
  color?: string
}) {
  return (
    <div>
      <div className="flex justify-center mb-2 text-blue-600">
        {icon}
      </div>

      <div className="text-xl md:text-2xl font-bold text-blue-600">
        {number}
      </div>

      <div className="text-xs text-gray-500">
        {label}
      </div>
    </div>
  );
}

// Activity Feed Component
function ActivityFeed() {
  const activities = [
    { avatar: "👨‍⚖️", name: "Senior Secretary Ahmed", batch: 1980, action: "donated ₹50,000 to Centennial Fund", time: "2 hours ago", badge: "Diamond" },
    { avatar: "👨‍🔬", name: "Dr. Abdur Rahman", batch: 1975, action: "answered 5 questions in Medical forum", time: "4 hours ago", badge: "Platinum" },
    { avatar: "👩‍💼", name: "Dr. Fatema Begum", batch: 1990, action: "created new event: Career Fair 2026", time: "6 hours ago", badge: "Gold" },
    { avatar: "👨‍💻", name: "Engineer Nurul Islam", batch: 1985, action: "offered internship to 3 students", time: "8 hours ago", badge: "Platinum" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Recent Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
            <div className="text-2xl">{item.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-xs text-gray-500">Batch {item.batch}</span>
                <Badge variant="outline" className="text-xs bg-blue-50">{item.badge}</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.action}</p>
              <p className="text-xs text-gray-400 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Recent Questions Component
function RecentQuestions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          Recent Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <p className="font-medium text-gray-800">{q.question}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                {q.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex gap-3 text-sm text-gray-500">
                <span>💬 {q.answers} answers</span>
                <span>🎁 {q.bounty} coins</span>
              </div>
            </div>
          </div>
        ))}
        <Button variant="link" className="w-full text-blue-600">Ask a Question →</Button>
      </CardContent>
    </Card>
  );
}

const questions = [
  { question: "How to prepare for BCS exam effectively?", tags: ["Career", "Exam"], answers: 12, bounty: 500 },
  { question: "Higher study opportunities in Germany for science students?", tags: ["Education", "Abroad"], answers: 8, bounty: 300 },
  { question: "Best strategies for startup funding in Bangladesh?", tags: ["Business", "Funding"], answers: 5, bounty: 1000 },
];

// Help Requests Component
function HelpRequests() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Urgent Help Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🩸</span>
            <span className="font-semibold text-red-800">Blood Needed: A+ (Urgent)</span>
          </div>
          <p className="text-sm text-gray-700">For Batch 2015 student's father at Dhaka Medical</p>
          <Progress value={70} className="mt-3 h-2" />
          <p className="text-xs text-gray-500 mt-2">3 donors confirmed • 2 more needed</p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💻</span>
            <span className="font-semibold text-yellow-800">Laptop Request</span>
          </div>
          <p className="text-sm text-gray-700">Class 10 student needs laptop for programming course</p>
          <Progress value={45} className="mt-3 h-2" />
          <p className="text-xs text-gray-500 mt-2">₹4,500 raised of ₹10,000</p>
        </div>
        
        <Button variant="link" className="w-full">Request Help →</Button>
      </CardContent>
    </Card>
  );
}

// Leaderboard Component
function LeaderboardCard() {
  const leaders = [
    { rank: 1, name: "Dr. Abdur Rahman", batch: 1980, coins: 15200, badge: "👑" },
    { rank: 2, name: "Senior Secretary Ahmed", batch: 1985, coins: 12800, badge: "⭐" },
    { rank: 3, name: "Prof. Khaled Hasan", batch: 1975, coins: 10500, badge: "🏅" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Skill Coins Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaders.map(leader => (
          <div key={leader.rank} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              <span className="text-xl">{leader.badge}</span>
              <div>
                <p className="font-medium text-gray-800">{leader.name}</p>
                <p className="text-xs text-gray-500">Batch {leader.batch}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600">{leader.coins.toLocaleString()}</p>
              <p className="text-xs text-gray-400">coins</p>
            </div>
          </div>
        ))}
        <Button variant="link" className="w-full text-sm">View Full Leaderboard →</Button>
      </CardContent>
    </Card>
  );
}

// Upcoming Events Component
function UpcomingEvents() {
  const events = [
    { title: "100 Year Celebration Planning", date: "May 15, 2026", attendees: 127, type: "Meeting" },
    { title: "Batch 1985 Reunion", date: "May 20, 2026", attendees: 45, type: "Reunion" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">📅 Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <p className="font-medium text-gray-800">{event.title}</p>
            <p className="text-xs text-gray-500 mt-1">📅 {event.date}</p>
            <div className="flex justify-between items-center mt-2">
              <Badge variant="outline">{event.type}</Badge>
              <span className="text-xs text-blue-600">{event.attendees} attending</span>
            </div>
          </div>
        ))}
        <Button variant="link" className="w-full">View All Events →</Button>
      </CardContent>
    </Card>
  );
}

// Contribution Card
function ContributionCard() {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Gift className="w-5 h-5 text-green-600" />
          Quick Contribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-sm">Donate Now</Button>
            <Button variant="outline" className="text-sm">Sponsor a Student</Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Every contribution helps build our legacy
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Batches View
function BatchesView() {
  const batches = [1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Batches (1921 - 2026)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4">
          {batches.map(batch => (
            <Link key={batch} href={`/batches/${batch}`}>
              <div className="p-4 text-center border rounded-lg hover:shadow-md hover:border-blue-300 transition cursor-pointer">
                <div className="text-xl font-bold text-blue-600">{batch}</div>
                <div className="text-xs text-gray-500">Batch</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline">View All 104 Batches →</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Events View
function EventsView() {
  const events = [
    { title: "100 Year Celebration - Main Event", date: "December 15, 2026", location: "School Campus", type: "Celebration", attendees: 5000 },
    { title: "Alumni Career Fair", date: "June 1, 2026", location: "Dhaka", type: "Career", attendees: 500 },
    { title: "Batch-wise Reunion Week", date: "July 10-17, 2026", location: "Various Locations", type: "Reunion", attendees: 2000 },
    { title: "Sports Tournament", date: "August 5, 2026", location: "School Ground", type: "Sports", attendees: 300 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, i) => (
          <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">📅 {event.date} • 📍 {event.location}</p>
              <div className="flex gap-2 mt-2">
                <Badge>{event.type}</Badge>
                <Badge variant="outline">👥 {event.attendees} attending</Badge>
              </div>
            </div>
            <Button>RSVP</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Transparency View
function TransparencyView({ transparency, loading }: any) {
  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-gray-500">
          Loading financial data...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Transparency</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Funds</p>
            <p className="text-xl font-bold text-green-600">₹52.4L</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Expenses</p>
            <p className="text-xl font-bold text-red-600">₹12.3L</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-xl font-bold text-blue-600">₹40.1L</p>
          </div>
        </div>
        
        <div>
          <p className="font-medium mb-3">Recent Donations</p>
          <div className="space-y-2">
            {donations.map((donation, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b">
                <div>
                  <span className="font-medium">{donation.name}</span>
                  <span className="text-xs text-gray-500 ml-2">Batch {donation.batch}</span>
                </div>
                <span className="text-green-600 font-medium">+₹{donation.amount}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-gray-400 text-center pt-4 border-t">
          Last updated: {new Date().toLocaleDateString()} • All transactions are verified by committee
        </div>
      </CardContent>
    </Card>
  );
}

const donations = [
  { name: "Senior Secretary Ahmed", batch: 1980, amount: "50,000" },
  { name: "Dr. Abdur Rahman", batch: 1975, amount: "25,000" },
  { name: "Engineer Nurul Islam", batch: 1985, amount: "1,00,000" },
];

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-xl text-white">Gotihub</span>
            </div>
            <p className="text-sm text-gray-400">
              Speed Hub for Alumni Communities. Building digital ecosystems for educational institutions.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">📘 Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition">🐙 GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white transition">💼 LinkedIn</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/batches" className="hover:text-white transition">Batches</Link></li>
              <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
              <li><Link href="/transparency" className="hover:text-white transition">Transparency</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Committee</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">Get updates about events and announcements</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 Gotihub | Powered by Apurba Labs | Chandaikona M. L. High School - 100 Years of Excellence</p>
          <p className="mt-1">Made with ❤️ for 30,000+ Alumni across 104 Batches</p>
        </div>
      </div>
    </footer>
  );
}