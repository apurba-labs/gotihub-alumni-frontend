'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function GeneralSettings() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">General</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your platform settings</p>
      </div>

      <div className="space-y-6">
        <Card className="p-5">
          <h3 className="font-medium text-gray-800 mb-4">Platform Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">School Name</label>
              <Input defaultValue="Chandaikona M. L. High School" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subdomain</label>
              <Input defaultValue="chandaikona" />
              <p className="text-xs text-gray-400 mt-1">.gotihub.com</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <Input type="email" defaultValue="committee@gotihub.com" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-medium text-gray-800 mb-4">Features</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Batch Elections</p>
                <p className="text-xs text-gray-500">Allow batch representative voting</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Skill Coins</p>
                <p className="text-xs text-gray-500">Enable gamification features</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Family Tree</p>
                <p className="text-xs text-gray-500">Blood relations & legacy tracking</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}