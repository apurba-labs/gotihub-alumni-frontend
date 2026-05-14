'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Smartphone, Banknote, CreditCard, Building, Loader2 } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  purpose: string;
  onSuccess: (transactionId: string, method: string) => void;
  onCancel: () => void;
}

export function PaymentGateway({ amount, purpose, onSuccess, onCancel }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [step, setStep] = useState('select'); // select, form, processing, success
  const [formData, setFormData] = useState({
    bkashNumber: '',
    nagadNumber: '',
    rocketNumber: '',
    bankName: '',
    accountNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    transactionId: '',
    referenceNumber: ''
  });
  const [generatedTxId, setGeneratedTxId] = useState('');

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: '📱', color: 'red', minAmount: 10, maxAmount: 25000 },
    { id: 'nagad', name: 'Nagad', icon: '📱', color: 'orange', minAmount: 10, maxAmount: 25000 },
    { id: 'rocket', name: 'Rocket', icon: '🚀', color: 'blue', minAmount: 10, maxAmount: 25000 },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', color: 'purple', minAmount: 100, maxAmount: 500000 },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', color: 'green', minAmount: 100, maxAmount: 100000 },
    { id: 'cash', name: 'Cash (In Person)', icon: '💵', color: 'teal', minAmount: 10, maxAmount: 1000000 },
  ];

  const merchantNumbers = {
    bkash: '017XXXXXXXX',
    nagad: '017XXXXXXXX',
    rocket: '017XXXXXXXX'
  };

  const bankAccounts = {
    'Sonali Bank': 'Account: 1234567890',
    'Dutch Bangla Bank': 'Account: 9876543210',
    'Islami Bank': 'Account: 4567891230'
  };

  const generateTransactionId = () => {
    const prefix = selectedMethod.toUpperCase();
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep('form');
  };

  const handleSubmitPayment = () => {
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const txId = generateTransactionId();
      setGeneratedTxId(txId);
      setStep('success');
      
      // Call onSuccess after 1 second
      setTimeout(() => {
        onSuccess(txId, selectedMethod);
      }, 1000);
    }, 2000);
  };

  const getPaymentInstructions = () => {
    switch (selectedMethod) {
      case 'bkash':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">bKash Payment Instructions</span>
              </div>
              <ol className="text-sm text-red-700 space-y-2 ml-5 list-decimal">
                <li>Dial *247# from your bKash SIM</li>
                <li>Select "Send Money"</li>
                <li>Enter merchant number: <strong>{merchantNumbers.bkash}</strong></li>
                <li>Enter amount: <strong>৳{amount}</strong></li>
                <li>Enter reference: <strong>ALUMNI-{formData.referenceNumber || 'YOUR-BATCH'}</strong></li>
                <li>Enter your PIN to confirm</li>
                <li>Save the transaction ID</li>
              </ol>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your bKash Number</label>
              <Input
                placeholder="01XXXXXXXXX"
                value={formData.bkashNumber}
                onChange={(e) => setFormData({...formData, bkashNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">bKash Transaction ID *</label>
              <Input
                placeholder="8W7A3B9C2D"
                value={formData.transactionId}
                onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'nagad':
        return (
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-800">Nagad Payment Instructions</span>
              </div>
              <ol className="text-sm text-orange-700 space-y-2 ml-5 list-decimal">
                <li>Dial *167# from your Nagad SIM</li>
                <li>Select "Send Money"</li>
                <li>Enter merchant number: <strong>{merchantNumbers.nagad}</strong></li>
                <li>Enter amount: <strong>৳{amount}</strong></li>
                <li>Enter reference: <strong>ALUMNI</strong></li>
                <li>Enter your PIN to confirm</li>
              </ol>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Nagad Number</label>
              <Input
                placeholder="01XXXXXXXXX"
                value={formData.nagadNumber}
                onChange={(e) => setFormData({...formData, nagadNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nagad Transaction ID *</label>
              <Input
                placeholder="NAGAD123456789"
                value={formData.transactionId}
                onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'rocket':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Rocket Payment Instructions</span>
              </div>
              <ol className="text-sm text-blue-700 space-y-2 ml-5 list-decimal">
                <li>Open Rocket app</li>
                <li>Select "Send Money"</li>
                <li>Enter merchant number: <strong>{merchantNumbers.rocket}</strong></li>
                <li>Enter amount: <strong>৳{amount}</strong></li>
                <li>Enter your PIN to confirm</li>
              </ol>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Rocket Number</label>
              <Input
                placeholder="01XXXXXXXXX"
                value={formData.rocketNumber}
                onChange={(e) => setFormData({...formData, rocketNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rocket Transaction ID *</label>
              <Input
                placeholder="RKT789456123"
                value={formData.transactionId}
                onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'bank':
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">Bank Transfer Details</span>
              </div>
              <div className="space-y-2 text-sm text-purple-700">
                <p><strong>Bank:</strong> Sonali Bank Ltd.</p>
                <p><strong>Branch:</strong> Raiganj, Sirajganj</p>
                <p><strong>Account Name:</strong> Chandaikona ML High School Alumni Fund</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>Routing Number:</strong> 123456789</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Account Number</label>
              <Input
                placeholder="Your bank account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <select
                className="w-full border rounded-lg p-2"
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
              >
                <option value="">Select your bank</option>
                <option>Sonali Bank</option>
                <option>Dutch Bangla Bank</option>
                <option>Islami Bank</option>
                <option>Brac Bank</option>
                <option>City Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reference/Transaction ID *</label>
              <Input
                placeholder="Enter transaction reference"
                value={formData.referenceNumber}
                onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Card Payment</span>
              </div>
              <p className="text-sm text-green-700">Secure payment via SSLCommerz gateway</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <Input
                  type="password"
                  placeholder="123"
                  maxLength={3}
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      
      case 'cash':
        return (
          <div className="space-y-4">
            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-teal-800">Cash Payment</span>
              </div>
              <p className="text-sm text-teal-700 mb-2">Pay in person at school office:</p>
              <div className="text-sm text-teal-700 space-y-1">
                <p>📍 <strong>Location:</strong> Chandaikona ML High School, Raiganj, Sirajganj</p>
                <p>🕐 <strong>Hours:</strong> Sunday-Thursday, 10:00 AM - 4:00 PM</p>
                <p>📞 <strong>Contact:</strong> 017XXXXXXXX before visiting</p>
              </div>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ Please bring your batch ID or any identification. You will receive a receipt.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Payment method selection screen
  if (step === 'select') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`p-4 border-2 rounded-xl text-left transition-all hover:shadow-md`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <p className="font-semibold">{method.name}</p>
                  <p className="text-xs text-gray-500">৳{method.minAmount} - ৳{method.maxAmount}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <Button variant="outline" onClick={onCancel} className="w-full mt-4">
          Cancel
        </Button>
      </div>
    );
  }

  // Payment form screen
  if (step === 'form') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pay with {selectedMethod.toUpperCase()}</h3>
          <Badge className="bg-blue-100 text-blue-800">Amount: ৳{amount}</Badge>
        </div>
        
        {getPaymentInstructions()}
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={() => setStep('select')} className="flex-1">
            Back
          </Button>
          <Button onClick={handleSubmitPayment} className="flex-1">
            Confirm Payment
          </Button>
        </div>
      </div>
    );
  }

  // Processing screen
  if (step === 'processing') {
    return (
      <div className="text-center py-8">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
        <p className="text-gray-500">Please wait while we verify your payment...</p>
      </div>
    );
  }

  // Success screen
  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
        <p className="text-gray-500 mb-2">Transaction ID: {generatedTxId}</p>
        <p className="text-sm text-gray-400">You will be redirected shortly...</p>
      </div>
    );
  }

  return null;
}