import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  team: string;
  position: string;
  score: number;
  drillsCompleted: number;
  improvement: number;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with real data
    const fetchLeaderboard = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: LeaderboardEntry[] = [
        {
          id: '1',
          name: 'Alex Rodriguez',
          team: 'Eagles FC',
          position: 'Forward',
          score: 94,
          drillsCompleted: 45,
          improvement: 12,
          rank: 1
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          team: 'Lions United',
          position: 'Midfielder',
          score: 91,
          drillsCompleted: 42,
          improvement: 8,
          rank: 2
        },
        {
          id: '3',
          name: 'Mike Chen',
          team: 'Thunder FC',
          position: 'Defender',
          score: 89,
          drillsCompleted: 38,
          improvement: 15,
          rank: 3
        },
        {
          id: '4',
          name: 'Emma Wilson',
          team: 'Storm Athletic',
          position: 'Goalkeeper',
          score: 87,
          drillsCompleted: 35,
          improvement: 6,
          rank: 4
        },
        {
          id: '5',
          name: 'John Doe',
          team: 'Eagles FC',
          position: 'Forward',
          score: 85,
          drillsCompleted: 33,
          improvement: 10,
          rank: 5
        },
        {
          id: '6',
          name: 'Lisa Brown',
          team: 'Hawks FC',
          position: 'Midfielder',
          score: 82,
          drillsCompleted: 30,
          improvement: 5,
          rank: 6
        }
      ];
      
      setLeaderboardData(mockData);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank <= 3) return 'default';
    return 'secondary';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted-foreground/20 rounded w-32"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-24"></div>
              </div>
              <div className="w-16 h-8 bg-muted-foreground/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((player, index) => (
          <Card key={player.id} className={`text-center shadow-card ${index === 0 ? 'border-yellow-200 bg-gradient-to-b from-yellow-50 to-white' : index === 1 ? 'border-gray-200 bg-gradient-to-b from-gray-50 to-white' : 'border-amber-200 bg-gradient-to-b from-amber-50 to-white'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                {getRankIcon(player.rank)}
              </div>
              <CardTitle className="text-lg">{player.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{player.team}</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-1">{player.score}</div>
              <div className="text-xs text-muted-foreground">{player.drillsCompleted} drills</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground mb-4">Full Rankings</h3>
        {leaderboardData.map((player) => (
          <Card key={player.id} className="shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center">
                  {getRankIcon(player.rank)}
                </div>
                
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {player.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">{player.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {player.position}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{player.team}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{player.score}</div>
                  <div className="text-xs text-muted-foreground">{player.drillsCompleted} drills</div>
                </div>
                
                <div className="flex items-center space-x-1 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+{player.improvement}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Stats Summary */}
      <Card className="shadow-card bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">247</div>
              <div className="text-sm text-muted-foreground">Total Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">1,524</div>
              <div className="text-sm text-muted-foreground">Drills Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">92.3%</div>
              <div className="text-sm text-muted-foreground">Average Performance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;