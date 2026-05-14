'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function ContributePage() {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const purposes = [
    { id: 'general', name: 'General Fund', description: 'Support overall school development', icon: '🏫' },
    { id: 'scholarship', name: 'Student Scholarship', description: 'Help deserving students', icon: '🎓' },
    { id: 'infrastructure', name: 'Infrastructure', description: 'Build better facilities', icon: '🏗️' },
    { id: 'centennial', name: 'Centennial Fund', description: '100 year celebration', icon: '🎉' },
  ];

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: '📱', account: '017XXXXXXXX', instructions: 'Send to bKash number 017XXXXXXXX' },
    { id: 'nagad', name: 'Nagad', icon: '📱', account: '017XXXXXXXX', instructions: 'Send to Nagad number 017XXXXXXXX' },
    { id: 'rocket', name: 'Rocket', icon: '🚀', account: '017XXXXXXXX', instructions: 'Send to Rocket account 017XXXXXXXX' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', account: 'Sonali Bank, Raiganj Branch', instructions: 'Account: XXXXXXXXXX' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', instructions: 'Secure payment via SSLCommerz' },
    { id: 'cash', name: 'Cash (In Person)', icon: '✋', instructions: 'Visit school office during working hours' },
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    alert(`✅ Thank you for your contribution!\n\nAmount: ৳${selectedAmount || customAmount}\nPurpose: ${selectedPurpose}\nMethod: ${selectedMethod}\n\nOur team will contact you shortly with payment instructions.`);
    setStep(1);
    setSelectedAmount(0);
    setSelectedPurpose('');
    setSelectedMethod('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 text-center">
                <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-bold ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                <div className="text-xs mt-1 text-gray-500">
                  {s === 1 && 'Amount'}
                  {s === 2 && 'Purpose'}
                  {s === 3 && 'Method'}
                  {s === 4 && 'Confirm'}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
            <div className="absolute top-0 left-0 h-1 bg-blue-600 rounded transition-all" style={{ width: `${(step - 1) * 33.33}%` }}></div>
          </div>
        </div>

        {/* Step 1: Amount */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Contribution Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1000, 5000, 10000, 25000, 50000, 100000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-3 border rounded-lg text-center transition ${
                      selectedAmount === amount ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-bold">৳{amount.toLocaleString()}</div>
                  </button>
                ))}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Custom Amount (৳)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Make this a monthly recurring donation</span>
                </label>
              </div>
              <Button onClick={handleNext} className="w-full" disabled={!selectedAmount && !customAmount}>
                Continue to Purpose →
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Purpose */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Contribution Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {purposes.map(purpose => (
                  <button
                    key={purpose.id}
                    onClick={() => setSelectedPurpose(purpose.id)}
                    className={`w-full p-4 border rounded-lg text-left flex items-center gap-3 transition ${
                      selectedPurpose === purpose.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl">{purpose.icon}</div>
                    <div>
                      <div className="font-semibold">{purpose.name}</div>
                      <div className="text-sm text-gray-500">{purpose.description}</div>
                    </div>
                    {selectedPurpose === purpose.id && <div className="ml-auto text-blue-600">✓</div>}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button onClick={handleNext} className="flex-1" disabled={!selectedPurpose}>Continue to Payment →</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 border rounded-lg text-left transition ${
                      selectedMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <div className="font-semibold">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.instructions}</div>
                      </div>
                      {selectedMethod === method.id && <div className="ml-auto text-blue-600">✓</div>}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button onClick={handleNext} className="flex-1" disabled={!selectedMethod}>Review & Confirm →</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold text-blue-600">৳{(selectedAmount || Number(customAmount)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Purpose</span>
                  <span className="font-medium">{purposes.find(p => p.id === selectedPurpose)?.name}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{paymentMethods.find(m => m.id === selectedMethod)?.name}</span>
                </div>
                {isRecurring && (
                  <div className="p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">✓ Monthly recurring donation enabled. You can cancel anytime.</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                  Confirm & Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}