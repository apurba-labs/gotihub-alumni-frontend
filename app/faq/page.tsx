'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I verify my alumni status?",
      answer: "Click on 'Verify as Alumnus' button on homepage, fill in your details including your batch year. The committee will verify your information within 48 hours and activate your account."
    },
    {
      question: "How can I donate to the school?",
      answer: "You can donate through multiple channels: Credit/Debit Card, bKash/Nagad/Rocket, Bank Transfer, or Cash in person at school office. Visit the Contribution section in your dashboard."
    },
    {
      question: "What are Skill Coins and how do I earn them?",
      answer: "Skill Coins are our reward system. Earn them by answering questions, helping current students, donating blood, referring alumni, and contributing to school funds. Coins can be redeemed for scholarships, laptop requests, and premium services."
    },
    {
      question: "How are batch representatives elected?",
      answer: "Each batch can elect a representative every 2 years. Nominations open for 7 days, followed by 14 days of voting. Each alumni gets one vote. Results are published on the platform."
    },
    {
      question: "Is my donation transparent?",
      answer: "Yes! All donations are publicly recorded on our Transparency page. Every expense is approved by the committee and displayed publicly. You can see exactly how funds are used."
    },
    {
      question: "How can I request help for a student?",
      answer: "Current students can request help for tuition, laptops, medical emergencies, or other needs. Alumni can browse help requests and contribute directly. All requests are verified by the school committee."
    },
    {
      question: "Can I organize a batch reunion?",
      answer: "Yes! Any verified alumni can create an event. Go to Events section and click 'Create Event'. The committee will approve it, then it will be visible to all batch members."
    },
    {
      question: "How do I contact the committee?",
      answer: "Use our Contact page to reach the committee for any inquiries. You can also email directly or attend monthly open meetings at the school."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-blue-100">Everything you need to know about Gotihub Alumni Platform</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t bg-gray-50/30">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-8 bg-blue-50 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">Can't find the answer you're looking for?</p>
          <a href="/contact">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Contact the Committee
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}