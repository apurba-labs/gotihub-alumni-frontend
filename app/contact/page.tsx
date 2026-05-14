'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Contact form:', formData);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactMethods = [
    { icon: '📞', title: 'Call Us', info: '+880 1798 161526', desc: 'Mon-Fri, 9am-5pm' },
    { icon: '✉️', title: 'Email', info: 'committee@gotihub.com', desc: 'Response within 24 hours' },
    { icon: '📍', title: 'Visit Us', info: 'Chandaikona, Raiganj, Sirajganj', desc: 'School Office Hours' },
    { icon: '💬', title: 'WhatsApp', info: '+880 1798 161526', desc: 'Quick queries' },
  ];

  const committees = [
    { name: 'Head of Committee', role: 'Senior Test Member', batch: 1980, contact: 't.member@gotihub.com' },
    { name: 'Treasurer', role: 'Dr. Test Rahman', batch: 1975, contact: 'member@gotihub.com' },
    { name: 'Technical Lead', role: 'Apurba Singh', batch: 1997, contact: 'apurba@gotihub.com' },
    { name: 'Events Coordinator', role: 'Engineer Test Islam', batch: 1985, contact: 'member@gotihub.com' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-blue-100">We'd love to hear from you</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, i) => (
            <Card key={i}>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">{method.icon}</div>
                <h3 className="font-bold">{method.title}</h3>
                <p className="text-sm text-blue-600 mt-1">{method.info}</p>
                <p className="text-xs text-gray-500 mt-1">{method.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Send us a message</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">✅</div>
                <p className="font-medium text-green-800">Message sent successfully!</p>
                <p className="text-sm text-green-600">We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Name</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Batch (Optional)</label>
                    <Input
                      value={formData.batch}
                      onChange={(e) => setFormData({...formData, batch: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    className="w-full border rounded-lg p-3 min-h-[150px]"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            )}
          </div>

          {/* Committee Members */}
          <div>
            <h2 className="text-xl font-bold mb-4">Committee Members</h2>
            <div className="space-y-3">
              {committees.map((member, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role} • Batch {member.batch}</p>
                      </div>
                    </div>
                  </div>
                  <a href={`mailto:${member.contact}`} className="text-blue-600 text-sm hover:underline">
                    Email →
                  </a>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold mb-2">📅 Office Hours</h3>
              <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-sm text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-sm text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}