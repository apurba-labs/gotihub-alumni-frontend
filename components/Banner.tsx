'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

interface Banner {
  id: number;
  imageUrl: string;
  link: string;
  title: string;
  type: 'event' | 'ad' | 'announcement';
  isPaid: boolean;
  expiresAt: string;
}

export function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Fetch active banner from API
    fetch('http://localhost:8000/api/banners/active')
      .then(res => res.json())
      .then(data => {
        if (data.banner) setCurrentBanner(data.banner);
      })
      .catch(() => {
        // Demo banner if API not ready
        setCurrentBanner({
          id: 1,
          imageUrl: '/images/centennial-banner.jpg',
          link: '/events/centennial',
          title: '100 Year Celebration - Register Now!',
          type: 'event',
          isPaid: false,
          expiresAt: '2026-12-31'
        });
      });
  }, []);

  if (!currentBanner || !showBanner) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-lg mx-4 my-4">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 p-6 md:p-8 text-white">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {currentBanner.type === 'event' && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">🎪 EVENT</span>
              )}
              {currentBanner.type === 'ad' && (
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">📢 SPONSORED</span>
              )}
              {currentBanner.type === 'announcement' && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">📣 ANNOUNCEMENT</span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentBanner.title}</h2>
            <Link href={currentBanner.link}>
              <button className="mt-3 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Learn More →
              </button>
            </Link>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="text-white/80 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: '/images/school-heritage.jpg',
      title: 'Our Heritage Since 1921',
      description: 'Celebrating 100 years of excellence',
      link: '/about/heritage'
    },
    {
      id: 2,
      image: '/images/centennial-event.jpg',
      title: '100 Year Celebration',
      description: 'Join us in December 2026',
      link: '/events/centennial'
    },
    {
      id: 3,
      image: '/images/alumni-meet.jpg',
      title: 'Global Alumni Meet',
      description: 'Connect with batchmates worldwide',
      link: '/events/global-meet'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg mx-4 my-4 h-64 md:h-96">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
            <p className="text-sm md:text-base opacity-90 mb-3">{slide.description}</p>
            <Link href={slide.link}>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-1 rounded-lg transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      ))}
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Advertisements({ position }: { position: 'sidebar' | 'between' | 'footer' }) {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Need a Website?",
      description: "Professional web development for schools",
      image: "/ads/web-dev.png",
      link: "https://apurba-labs.com",
      isPaid: true,
      sponsor: "Apurba Labs"
    },
    {
      id: 2,
      title: "Study Abroad Consultation",
      description: "Get guidance from alumni abroad",
      image: "/ads/study-abroad.png",
      link: "/services/study-abroad",
      isPaid: true,
      sponsor: "Batch 1995"
    }
  ]);

  if (position === 'sidebar') {
    return (
      <div className="space-y-4">
        <div className="text-xs text-gray-400 text-center mb-2">ADVERTISEMENTS</div>
        {ads.map(ad => (
          <Link key={ad.id} href={ad.link} target="_blank">
            <div className="bg-white border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
              <div className="w-full h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-3xl">📢</span>
              </div>
              <h4 className="font-semibold text-sm">{ad.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{ad.description}</p>
              <div className="text-xs text-gray-400 mt-2">Sponsored by {ad.sponsor}</div>
            </div>
          </Link>
        ))}
        <div className="text-center">
          <Link href="/advertise" className="text-xs text-blue-500 hover:underline">
            Advertise with us →
          </Link>
        </div>
      </div>
    );
  }

  if (position === 'between') {
    return (
      <div className="my-8 py-4 border-y border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-xs text-gray-400 text-center mb-3">SPONSORED CONTENT</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ads.map(ad => (
              <Link key={ad.id} href={ad.link} target="_blank">
                <div className="bg-white rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    🎯
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{ad.title}</p>
                    <p className="text-xs text-gray-500">{ad.sponsor}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function LatestEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "100 Year Celebration Launch",
      date: "June 15, 2026",
      image: "/events/launch.jpg",
      attendees: 245,
      imageUrl: "🎉"
    },
    {
      id: 2,
      title: "Alumni Career Fair",
      date: "July 1, 2026",
      image: "/events/career-fair.jpg",
      attendees: 89,
      imageUrl: "💼"
    }
  ]);

  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">📅 Latest Events</h3>
        <Link href="/events" className="text-sm text-blue-500 hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {events.map(event => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <div className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <div className="text-4xl">{event.imageUrl}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{event.title}</h4>
                <p className="text-xs text-gray-500 mt-1">📅 {event.date}</p>
                <p className="text-xs text-blue-600 mt-1">👥 {event.attendees} attending</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}