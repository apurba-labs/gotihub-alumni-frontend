'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BatchesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('all');

  // Generate all batches from 1921 to 2026
  const allBatches = Array.from({ length: 106 }, (_, i) => {
    const year = 1921 + i;
    return {
      year,
      alumniCount: Math.floor(Math.random() * 500) + 100,
      rep: getRepForBatch(year),
      hasEvents: year >= 1970,
    };
  });

  function getRepForBatch(year: number) {
    const reps: Record<number, string> = {
      1970: 'Justice Abdur Rahman',
      1975: 'Dr. Prof. Khaled Hasan',
      1980: 'Senior Secretary Ahmed',
      1985: 'Engineer Nurul Islam',
      1990: 'Dr. Fatema Begum',
    };
    return reps[year] || null;
  }

  const decades = [
    { value: 'all', label: 'All Batches' },
    { value: '1920', label: '1920s' },
    { value: '1930', label: '1930s' },
    { value: '1940', label: '1940s' },
    { value: '1950', label: '1950s' },
    { value: '1960', label: '1960s' },
    { value: '1970', label: '1970s' },
    { value: '1980', label: '1980s' },
    { value: '1990', label: '1990s' },
    { value: '2000', label: '2000s' },
    { value: '2010', label: '2010s' },
    { value: '2020', label: '2020s' },
  ];

  const filteredBatches = allBatches.filter(batch => {
    const matchesSearch = batch.year.toString().includes(searchTerm);
    const decadeStart = parseInt(selectedDecade);
    const matchesDecade = selectedDecade === 'all' || 
      (batch.year >= decadeStart && batch.year < decadeStart + 10);
    return matchesSearch && matchesDecade;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Batches</h1>
          <p className="text-blue-100">104 batches of excellence from 1921 to 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Batch Year</label>
              <Input
                type="text"
                placeholder="e.g., 1985"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Decade</label>
              <select
                className="w-full border rounded-lg p-2"
                value={selectedDecade}
                onChange={(e) => setSelectedDecade(e.target.value)}
              >
                {decades.map(decade => (
                  <option key={decade.value} value={decade.value}>{decade.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-500">Showing {filteredBatches.length} batches</p>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBatches.map(batch => (
            <Link href={`/batches/${batch.year}`} key={batch.year}>
              <div className="bg-white border rounded-xl p-4 text-center hover:shadow-lg transition cursor-pointer hover:border-blue-300">
                <div className="text-2xl font-bold text-blue-600">{batch.year}</div>
                <div className="text-xs text-gray-500 mt-1">{batch.alumniCount} alumni</div>
                {batch.rep && (
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">Rep: {batch.rep.split(' ')[0]}</Badge>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}