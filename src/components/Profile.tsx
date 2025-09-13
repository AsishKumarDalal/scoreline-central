import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Edit2, Save, User, BarChart3, Calendar, Trophy } from 'lucide-react';

interface PlayerStats {
  drillsCompleted: number;
  averageScore: number;
  bestCategory: string;
  daysActive: number;
  totalHours: number;
  rank: number;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    position: user?.position || '',
    team: user?.team || ''
  });

  // Mock stats data
  const stats: PlayerStats = {
    drillsCompleted: 33,
    averageScore: 85,
    bestCategory: 'Shooting',
    daysActive: 45,
    totalHours: 67,
    rank: 5
  };

  const recentDrills = [
    {
      id: '1',
      name: 'Speed Shooting',
      category: 'Shooting',
      score: 92,
      date: '2024-01-10',
      difficulty: 'Advanced'
    },
    {
      id: '2',
      name: 'Ball Control',
      category: 'Dribbling',
      score: 78,
      date: '2024-01-09',
      difficulty: 'Intermediate'
    },
    {
      id: '3',
      name: 'Passing Accuracy',
      category: 'Passing',
      score: 88,
      date: '2024-01-08',
      difficulty: 'Advanced'
    }
  ];

  const categoryProgress = [
    { name: 'Shooting', progress: 85, level: 'Advanced' },
    { name: 'Dribbling', progress: 72, level: 'Intermediate' },
    { name: 'Passing', progress: 90, level: 'Advanced' },
    { name: 'Defending', progress: 65, level: 'Intermediate' },
    { name: 'Fitness', progress: 78, level: 'Intermediate' }
  ];

  const handleSaveProfile = () => {
    // Mock save - replace with actual API call
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      variant: "default",
    });
    setIsEditing(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      case 'Professional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Profile Header */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Player Information</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" alt={user?.name} />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      {isEditing ? (
                        <Select
                          value={editData.position}
                          onValueChange={(value) => setEditData(prev => ({ ...prev, position: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                            <SelectItem value="Defender">Defender</SelectItem>
                            <SelectItem value="Midfielder">Midfielder</SelectItem>
                            <SelectItem value="Forward">Forward</SelectItem>
                            <SelectItem value="Striker">Striker</SelectItem>
                            <SelectItem value="Winger">Winger</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={editData.position} disabled />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="team">Team</Label>
                      <Input
                        id="team"
                        value={editData.team}
                        onChange={(e) => setEditData(prev => ({ ...prev, team: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Current Rank</Label>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default" className="bg-primary">
                          #{stats.rank}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Overall Leaderboard</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stats.drillsCompleted}</div>
                <div className="text-sm text-muted-foreground">Drills Completed</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stats.averageScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stats.daysActive}</div>
                <div className="text-sm text-muted-foreground">Active Days</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stats.totalHours}h</div>
                <div className="text-sm text-muted-foreground">Training Time</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          {/* Recent Drills */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Recent Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDrills.map((drill) => (
                  <div key={drill.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{drill.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{drill.category}</Badge>
                        <Badge className={getDifficultyColor(drill.difficulty)}>{drill.difficulty}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{drill.score}%</div>
                      <div className="text-sm text-muted-foreground">{drill.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Skill Progress */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Skill Development</span>
              </CardTitle>
              <CardDescription>
                Your progress across different football skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categoryProgress.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="outline">{category.level}</Badge>
                      </div>
                      <span className="text-sm font-semibold">{category.progress}%</span>
                    </div>
                    <Progress 
                      value={category.progress} 
                      className="h-3"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;