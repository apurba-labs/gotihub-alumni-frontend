'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentGateway } from '@/components/PaymentGateway';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    profession: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const fees = { registration: 500 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (transactionId: string, method: string) => {
    // Save user data with payment info
    const userData = {
      ...formData,
      role: 'alumni',
      status: 'pending_verification',
      payment: {
        method,
        transactionId,
        amount: fees.registration,
        status: 'completed',
        date: new Date().toISOString()
      },
      registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem('pendingUser', JSON.stringify(userData));
    router.push('/registration-success');
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Registration</CardTitle>
              <CardDescription>
                Pay ৳{fees.registration} to verify your alumni status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentGateway
                amount={fees.registration}
                purpose="Alumni Registration Fee"
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Rest of registration form (same as before)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              G
            </div>
            <CardTitle className="text-2xl">Alumni Registration</CardTitle>
            <CardDescription>
              Join the official alumni network of Chandaikona ML High School
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Registration Fee</p>
                  <p className="text-2xl font-bold text-blue-600">৳{fees.registration}</p>
                  <p className="text-xs text-gray-500">One-time verification fee</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Multiple Payment Methods</Badge>
              </div>
            </div>

            <form onSubmit={handleSubmitInfo} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <Input name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Batch Year *</label>
                  <select
                    name="batch"
                    required
                    className="w-full border rounded-lg p-2"
                    value={formData.batch}
                    onChange={handleChange}
                  >
                    <option value="">Select batch</option>
                    {Array.from({ length: 106 }, (_, i) => 1921 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <Input name="email" type="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <Input name="phone" required value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Profession</label>
                  <Input name="profession" value={formData.profession} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input name="address" value={formData.address} onChange={handleChange} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Password *</label>
                  <Input name="password" type="password" required value={formData.password} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                  <Input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6">
                Continue to Payment →
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already registered? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}