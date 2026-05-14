'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Trophy, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  batch: number;
  profession: string;
  manifesto: string;
  votes: number;
  badge: string;
  avatar: string;
}

interface Election {
  id: number;
  batch: number;
  title: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  candidates: Candidate[];
  totalVoters: number;
  votedCount: number;
}

export function VotingSystem({ batch, userBatch }: { batch?: number; userBatch?: number }) {
  const [elections, setElections] = useState<Election[]>([
    {
      id: 1,
      batch: 1985,
      title: 'Batch 1985 Representative Election',
      startDate: '2026-05-01',
      endDate: '2026-05-15',
      status: 'active',
      totalVoters: 450,
      votedCount: 245,
      candidates: [
        { id: 1, name: 'Engineer Nurul Islam', batch: 1985, profession: 'CEO, Tech Corp', manifesto: 'Digital transformation for our batch', votes: 145, badge: 'Platinum', avatar: '👨‍💻' },
        { id: 2, name: 'Dr. Shamima Akter', batch: 1985, profession: 'Senior Scientist', manifesto: 'Focus on education and research', votes: 100, badge: 'Gold', avatar: '👩‍🔬' },
      ]
    },
    {
      id: 2,
      batch: 1990,
      title: 'Batch 1990 Representative Election',
      startDate: '2026-05-10',
      endDate: '2026-05-25',
      status: 'upcoming',
      totalVoters: 520,
      votedCount: 0,
      candidates: [
        { id: 3, name: 'Dr. Fatema Begum', batch: 1990, profession: 'Senior Scientist', manifesto: 'Empowering women in STEM', votes: 0, badge: 'Gold', avatar: '👩‍🔬' },
        { id: 4, name: 'Engineer Rafiq', batch: 1990, profession: 'Construction Magnate', manifesto: 'Infrastructure development', votes: 0, badge: 'Silver', avatar: '👷' },
      ]
    },
    {
      id: 3,
      batch: 2000,
      title: 'Batch 2000 Representative Election',
      startDate: '2026-04-15',
      endDate: '2026-04-30',
      status: 'completed',
      totalVoters: 380,
      votedCount: 356,
      candidates: [
        { id: 5, name: 'Tanvir Ahmed', batch: 2000, profession: 'Banker', manifesto: 'Financial literacy programs', votes: 210, badge: 'Gold', avatar: '👨‍💼' },
        { id: 6, name: 'Shahinur Rahman', batch: 2000, profession: 'Professor', manifesto: 'Academic excellence', votes: 146, badge: 'Silver', avatar: '👨‍🏫' },
      ]
    },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (electionId: number, candidateId: number) => {
    if (hasVoted) {
      alert('You have already voted in this election!');
      return;
    }
    
    setSelectedCandidate(candidateId);
    
    // Confirm vote
    if (confirm('Are you sure you want to vote for this candidate?')) {
      setElections(prev => prev.map(election => {
        if (election.id === electionId) {
          return {
            ...election,
            candidates: election.candidates.map(candidate =>
              candidate.id === candidateId
                ? { ...candidate, votes: candidate.votes + 1 }
                : candidate
            ),
            votedCount: election.votedCount + 1
          };
        }
        return election;
      }));
      setHasVoted(true);
      alert('✅ Vote cast successfully!');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">🟢 Active - Vote Now</Badge>;
      case 'upcoming':
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">✅ Completed</Badge>;
      default:
        return null;
    }
  };

  const getWinner = (candidates: Candidate[]) => {
    const sorted = [...candidates].sort((a, b) => b.votes - a.votes);
    return sorted[0];
  };

  return (
    <div className="space-y-8">
      {/* Voting Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Vote className="w-6 h-6" />
              Batch Representative Elections
            </h2>
            <p className="text-blue-100 mt-1">Vote for your batch leader</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Total Alumni Eligible</div>
            <div className="text-2xl font-bold">30,000+</div>
          </div>
        </div>
      </div>

      {/* Elections List */}
      {elections.map(election => (
        <Card key={election.id}>
          <CardHeader>
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <CardTitle className="text-xl">{election.title}</CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  {getStatusBadge(election.status)}
                  <span className="text-sm text-gray-500">
                    📅 {election.startDate} - {election.endDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{election.votedCount}/{election.totalVoters}</div>
                <div className="text-xs text-gray-500">Votes Cast</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Voting Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Voter Turnout</span>
                <span>{Math.round((election.votedCount / election.totalVoters) * 100)}%</span>
              </div>
              <Progress value={(election.votedCount / election.totalVoters) * 100} />
            </div>

            {/* Candidates */}
            <div className="space-y-4">
              {election.candidates.map(candidate => (
                <div
                  key={candidate.id}
                  className={`p-4 border rounded-xl transition ${
                    selectedCandidate === candidate.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{candidate.avatar}</div>
                      <div>
                        <h3 className="font-bold text-gray-800">{candidate.name}</h3>
                        <p className="text-sm text-gray-500">{candidate.profession}</p>
                        <p className="text-xs text-gray-400 mt-1">{candidate.manifesto}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{candidate.votes}</div>
                      <div className="text-xs text-gray-500">votes</div>
                      {election.status === 'active' && !hasVoted && (
                        <Button
                          size="sm"
                          onClick={() => handleVote(election.id, candidate.id)}
                          className="mt-2"
                        >
                          Vote
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Winner Display for Completed Elections */}
            {election.status === 'completed' && (
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Winner</p>
                    <p className="font-bold text-gray-800">
                      {getWinner(election.candidates)?.name} with {getWinner(election.candidates)?.votes} votes
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Voting Instructions */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          How to Vote
        </h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center gap-2">✓ Each alumni gets ONE vote per batch election</li>
          <li className="flex items-center gap-2">✓ Voting is anonymous and secure</li>
          <li className="flex items-center gap-2">✓ Results are published immediately after election ends</li>
          <li className="flex items-center gap-2">✓ Batch representatives serve for 2 years</li>
        </ul>
      </div>
    </div>
  );
}