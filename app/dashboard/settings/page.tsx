'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Key,
  Camera,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Moon,
  Sun,
  Monitor,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AlumniSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    location: '',
    bio: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || 'Apurba Singh',
      email: parsedUser.email || 'apurba@gotihub.com',
      phone: '+880 1234 567890',
      profession: 'Software Engineer',
      location: 'Dhaka, Bangladesh',
      bio: 'Alumni of Batch 2005. Passionate about technology and education.'
    });
  }, [router]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'account', label: 'Account', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    alert('✅ Profile updated successfully!');
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar - Claude Style */}
        <div className="md:w-56 flex-shrink-0">
          <div className="space-y-1 sticky top-24">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition ${
                  activeTab === tab.id
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab.icon}
                  {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight className="w-3 h-3 text-gray-400" />}
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t">
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  router.push('/login');
                }}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {formData.name.charAt(0)}
                    </div>
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 shadow-sm">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{formData.name}</h3>
                    <p className="text-sm text-gray-500">Batch {user.batch || '2005'} • Alumni</p>
                    <Badge className="mt-1 bg-green-100 text-green-800">✓ Verified Member</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Batch Year</label>
                      <Input value={user.batch || '2005'} disabled className="bg-gray-50" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <Input 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                      <Input 
                        value={formData.profession}
                        onChange={(e) => setFormData({...formData, profession: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <Input 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      className="w-full border rounded-lg p-3 h-28 text-sm"
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Security
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} placeholder="Enter current password" />
                      <button 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </Card>

              <Card className="p-6 border-red-200">
                <h3 className="font-semibold text-red-600 mb-4">Danger Zone</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">Deactivate Account</p>
                    <p className="text-sm text-gray-500">Permanently disable your alumni account</p>
                  </div>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                    Deactivate
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-500">Get real-time alerts on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-gray-800">Event Reminders</p>
                    <p className="text-sm text-gray-500">Upcoming batch events and reunions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-gray-800">Monthly Newsletter</p>
                    <p className="text-sm text-gray-500">Alumni digest and school updates</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-gray-800">Donation Acknowledgments</p>
                    <p className="text-sm text-gray-500">Receipts and impact reports</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Theme Preference</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 border rounded-xl text-center hover:border-blue-400 transition">
                    <div className="w-10 h-10 bg-white border rounded-full mx-auto mb-2 shadow-sm"></div>
                    <span className="text-sm font-medium">Light</span>
                    <p className="text-xs text-gray-400 mt-1">Default theme</p>
                  </button>
                  <button className="p-4 border rounded-xl text-center hover:border-blue-400 transition">
                    <div className="w-10 h-10 bg-gray-900 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm font-medium">Dark</span>
                    <p className="text-xs text-gray-400 mt-1">Easy on eyes</p>
                  </button>
                  <button className="p-4 border-2 border-blue-500 rounded-xl text-center bg-blue-50">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-blue-600">System</span>
                    <p className="text-xs text-gray-500 mt-1">Follow device</p>
                  </button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Language</h3>
                <select className="w-full border rounded-lg p-2">
                  <option>English (UK)</option>
                  <option>English (US)</option>
                  <option>বাংলা (Bengali)</option>
                </select>
              </Card>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">Current Plan</h3>
                    <p className="text-2xl font-bold mt-1">Alumni Premium</p>
                    <p className="text-sm text-gray-500">৳500 / month</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">Active</Badge>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Features included:</p>
                  <ul className="space-y-1">
                    <li className="text-sm text-gray-600 flex items-center gap-2">✓ Unlimited alumni directory access</li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">✓ Priority support response</li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">✓ Create and host events</li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">✓ Skill coins earning & rewards</li>
                    <li className="text-sm text-gray-600 flex items-center gap-2">✓ Family tree connections</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full mt-4">Manage Subscription</Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Payment Methods</h3>
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-lg">📱</div>
                    <div>
                      <p className="font-medium text-gray-800">bKash</p>
                      <p className="text-xs text-gray-500">**** **** **** 1234</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-300">Default</Badge>
                </div>
                <Button variant="outline" className="w-full mt-3">+ Add Payment Method</Button>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Billing History</h3>
                  <button className="text-sm text-blue-600 hover:underline">Download All</button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium text-sm">May 1, 2026</p>
                      <p className="text-xs text-gray-400">Alumni Premium - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">৳500</p>
                      <button className="text-xs text-blue-600 hover:underline">Download</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium text-sm">April 1, 2026</p>
                      <p className="text-xs text-gray-400">Alumni Premium - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">৳500</p>
                      <button className="text-xs text-blue-600 hover:underline">Download</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <p className="font-medium text-sm">March 1, 2026</p>
                      <p className="text-xs text-gray-400">Alumni Premium - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">৳500</p>
                      <button className="text-xs text-blue-600 hover:underline">Download</button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}