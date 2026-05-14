'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Link2, TreePine, Plus, UserPlus, Heart } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  batch: number;
  relation: string;
  avatar: string;
  skills: string[];
  isVerified: boolean;
}

interface FamilyConnection {
  fromId: string;
  toId: string;
  relationType: 'father' | 'mother' | 'brother' | 'sister' | 'uncle' | 'aunt' | 'cousin';
}

export function FamilyTree({ userId }: { userId: string }) {
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Abdur Rahman', batch: 1975, relation: 'Father', avatar: '👨', skills: ['Education'], isVerified: true },
    { id: '2', name: 'Kamal Hossain', batch: 2005, relation: 'Self', avatar: '👨‍💻', skills: ['Engineering'], isVerified: true },
    { id: '3', name: 'Fatema Begum', batch: 1980, relation: 'Mother', avatar: '👩', skills: ['Medicine'], isVerified: true },
    { id: '4', name: 'Rakib Hasan', batch: 1995, relation: 'Uncle', avatar: '👨', skills: ['Business'], isVerified: true },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', batch: '', relation: '', email: '' });

  const relations = [
    { value: 'father', label: 'Father', icon: '👨', color: 'blue' },
    { value: 'mother', label: 'Mother', icon: '👩', color: 'pink' },
    { value: 'brother', label: 'Brother', icon: '👨', color: 'green' },
    { value: 'sister', label: 'Sister', icon: '👩', color: 'purple' },
    { value: 'uncle', label: 'Uncle', icon: '👨', color: 'orange' },
    { value: 'aunt', label: 'Aunt', icon: '👩', color: 'yellow' },
    { value: 'cousin', label: 'Cousin', icon: '👨‍👦', color: 'teal' },
    { value: 'grandfather', label: 'Grandfather', icon: '👴', color: 'gray' },
    { value: 'grandmother', label: 'Grandmother', icon: '👵', color: 'gray' },
  ];

  const handleAddRelation = () => {
    if (newMember.name && newMember.batch && newMember.relation) {
      const newId = (members.length + 1).toString();
      const relationObj = relations.find(r => r.value === newMember.relation);
      
      setMembers([...members, {
        id: newId,
        name: newMember.name,
        batch: parseInt(newMember.batch),
        relation: relationObj?.label || newMember.relation,
        avatar: relationObj?.icon || '👤',
        skills: [],
        isVerified: false
      }]);
      
      setNewMember({ name: '', batch: '', relation: '', email: '' });
      setShowAddForm(false);
      alert(`✅ Relation request sent to ${newMember.name}! They need to confirm.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Family Tree Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TreePine className="w-6 h-6" />
              Family Legacy Tree
            </h2>
            <p className="text-green-100 mt-1">Connect with family members who studied at Chandaikona MLHS</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white text-green-700 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Family Member
          </Button>
        </div>
      </div>

      {/* Add Family Member Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Family Member</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    placeholder="Name of family member"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Batch Year</label>
                  <Input
                    type="number"
                    placeholder="e.g., 1985"
                    value={newMember.batch}
                    onChange={(e) => setNewMember({...newMember, batch: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Relation</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={newMember.relation}
                    onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
                  >
                    <option value="">Select relation</option>
                    {relations.map(rel => (
                      <option key={rel.value} value={rel.value}>{rel.icon} {rel.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email (if known)</label>
                  <Input
                    type="email"
                    placeholder="Optional"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddRelation} className="flex-1 bg-green-600 hover:bg-green-700">
                  Send Connection Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Family Tree Visualization */}
      <div className="relative">
        {/* Tree Lines (CSS Grid Visualization) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Grandparents Generation */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Grandparents</h3>
            {members.filter(m => m.relation === 'Grandfather' || m.relation === 'Grandmother').map(member => (
              <FamilyCard key={member.id} member={member} />
            ))}
          </div>

          {/* Parents & Uncles Generation */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Parents & Uncles/Aunts</h3>
            {members.filter(m => ['Father', 'Mother', 'Uncle', 'Aunt'].includes(m.relation)).map(member => (
              <FamilyCard key={member.id} member={member} />
            ))}
          </div>

          {/* Self & Cousins Generation */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Self & Cousins</h3>
            {members.filter(m => ['Self', 'Brother', 'Sister', 'Cousin'].includes(m.relation)).map(member => (
              <FamilyCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* Family Stats */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">🏆 Family Legacy Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{members.length}</div>
            <div className="text-xs text-gray-500">Family Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Array.from(new Set(members.map(m => m.batch))).length}
            </div>
            <div className="text-xs text-gray-500">Different Batches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">100+</div>
            <div className="text-xs text-gray-500">Combined Years</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">🏅</div>
            <div className="text-xs text-gray-500">Legacy Badge</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FamilyCard({ member }: { member: FamilyMember }) {
  return (
    <div className="bg-white border rounded-xl p-3 mb-3 text-left hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{member.avatar}</div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{member.name}</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">Batch {member.batch}</Badge>
            <span className="text-xs text-gray-400">{member.relation}</span>
          </div>
        </div>
        {member.isVerified && (
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        )}
      </div>
    </div>
  );
}