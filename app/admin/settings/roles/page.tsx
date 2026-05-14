'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Plus, Edit, Trash2 } from 'lucide-react';

export default function RolesSettings() {
  const [roles] = useState([
    { id: 1, name: 'Super Admin', users: 1, permissions: 'All permissions', color: 'red' },
    { id: 2, name: 'Committee Admin', users: 5, permissions: 'Users, Donations, Events', color: 'blue' },
    { id: 3, name: 'Finance Manager', users: 2, permissions: 'Donations, Expenses, Reports', color: 'green' },
    { id: 4, name: 'Batch Rep', users: 104, permissions: 'Batch members, Events', color: 'purple' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Roles & Permissions</h2>
          <p className="text-sm text-gray-500 mt-1">Manage user roles and access levels</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="space-y-3">
        {roles.map((role) => (
          <Card key={role.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${role.color}-100 flex items-center justify-center`}>
                  <Shield className={`w-5 h-5 text-${role.color}-600`} />
                </div>
                <div>
                  <p className="font-medium">{role.name}</p>
                  <p className="text-xs text-gray-500">{role.users} users • {role.permissions}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}