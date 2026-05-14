'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const notableAlumni = [
    { name: 'Justice Abdur Rahman', batch: 1970, achievement: 'High Court Judge', icon: '👨‍⚖️' },
    { name: 'Senior Secretary Ahmed', batch: 1980, achievement: 'Government Secretary', icon: '👨‍💼' },
    { name: 'Dr. Prof. Khaled Hasan', batch: 1975, achievement: 'University Professor', icon: '👨‍🔬' },
    { name: 'Engineer Nurul Islam', batch: 1985, achievement: 'CEO, Tech Corporation', icon: '👨‍💻' },
    { name: 'Dr. Fatema Begum', batch: 1990, achievement: 'Senior Scientist', icon: '👩‍🔬' },
    { name: 'Brig. Gen. Shahidul', batch: 1982, achievement: 'Military Service', icon: '🎖️' },
  ];

  const achievements = [
    { year: '1921', title: 'School Founded', description: 'Chandaikona ML High School established' },
    { year: '1971', title: 'Liberation War', description: 'Alumni participated in Bangladesh Liberation War' },
    { year: '2000', title: 'Computer Lab', description: 'First computer lab established' },
    { year: '2021', title: 'Centennial Year', description: '100 years of excellence celebrated' },
    { year: '2026', title: 'Digital Transformation', description: 'Gotihub Alumni Platform Launch' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our School</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Chandaikona M. L. High School - A legacy of 100+ years of excellence in education
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* History Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Heritage</h2>
            <div className="w-20 h-1 bg-blue-600 mb-6"></div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in <span className="font-bold text-blue-600">1921</span>, Chandaikona M. L. High School has been a beacon of education 
              in the Sirajganj district for over a century.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              From humble beginnings with just a few classrooms, our institution has grown to educate 
              over <span className="font-bold text-blue-600">30,000 students</span> across 104 batches.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our motto <span className="italic">"Come Light From Dark"</span> reflects our commitment to 
              illuminating minds and shaping futures through quality education.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-3">📚</div>
            <h3 className="text-2xl font-bold text-gray-800">100+ Years</h3>
            <p className="text-gray-600">of Educational Excellence</p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <div className="text-2xl font-bold text-blue-600">30k+</div>
                <div className="text-xs text-gray-500">Alumni</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">104</div>
                <div className="text-xs text-gray-500">Batches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">1921</div>
                <div className="text-xs text-gray-500">Founded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Journey Through Time</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-blue-200"></div>
            <div className="space-y-8">
              {achievements.map((item, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-center gap-4`}>
                  <div className="md:w-1/2"></div>
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-bold mx-auto md:mx-0">
                    {item.year.slice(-2)}
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notable Alumni */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Notable Alumni</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notableAlumni.map((alumni, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{alumni.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{alumni.name}</h3>
                      <p className="text-sm text-gray-500">Batch {alumni.batch}</p>
                      <Badge className="mt-1 bg-blue-100 text-blue-800">{alumni.achievement}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}