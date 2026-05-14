'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Activity,
  Zap,
  Shield,
  Bell
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Alumni', value: '31,247', change: '+12%', icon: <Users className="w-5 h-5" />, color: 'blue' },
    { label: 'Total Donations', value: '৳52.4L', change: '+18%', icon: <DollarSign className="w-5 h-5" />, color: 'green' },
    { label: 'Active Elections', value: '2', change: '', icon: <Calendar className="w-5 h-5" />, color: 'purple' },
    { label: 'Pending Reviews', value: '23', change: '', icon: <Clock className="w-5 h-5" />, color: 'orange' },
  ];

  const recentActivities = [
    { user: 'Rina Akter', action: 'registered as alumni', time: '2 min ago', type: 'user' },
    { user: 'Batch 1985', action: 'donated ৳50,000', time: '15 min ago', type: 'donation' },
    { user: 'Dr. Rahman', action: 'answered 5 questions', time: '1 hour ago', type: 'activity' },
    { user: 'Kamal Hossain', action: 'created event: Reunion', time: '3 hours ago', type: 'event' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome back, Apurba</h2>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with your alumni platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                {stat.change && (
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                )}
              </div>
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {activity.type === 'user' && <Users className="w-4 h-4 text-gray-500" />}
                  {activity.type === 'donation' && <DollarSign className="w-4 h-4 text-green-600" />}
                  {activity.type === 'event' && <Calendar className="w-4 h-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition">
              <Users className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-sm font-medium">Verify Alumni</p>
              <p className="text-xs text-gray-500">23 pending</p>
            </button>
            <button className="p-3 bg-green-50 rounded-lg text-left hover:bg-green-100 transition">
              <DollarSign className="w-5 h-5 text-green-600 mb-2" />
              <p className="text-sm font-medium">Approve Expenses</p>
              <p className="text-xs text-gray-500">৳2.5L pending</p>
            </button>
            <button className="p-3 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition">
              <Calendar className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm font-medium">Create Event</p>
              <p className="text-xs text-gray-500">Plan reunion</p>
            </button>
            <button className="p-3 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition">
              <Shield className="w-5 h-5 text-orange-600 mb-2" />
              <p className="text-sm font-medium">Manage Roles</p>
              <p className="text-xs text-gray-500">RBAC settings</p>
            </button>
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">System Status</h3>
          <Badge className="bg-green-100 text-green-800">All Systems Operational</Badge>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">API Server</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Operational</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Database</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Connected</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Payment Gateway</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Ready</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}