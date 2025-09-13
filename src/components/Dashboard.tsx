import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DrillUpload from './DrillUpload';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import InjuryTracking from './InjuryTracking';
import { LogOut, Upload, Trophy, User, Heart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-hero-gradient text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">⚽ Football Drills</h1>
            <span className="text-primary-foreground/80">|</span>
            <span className="text-primary-foreground/90">Welcome, {user?.name}</span>
          </div>
          <Button
            onClick={logout}
            variant="secondary"
            size="sm"
            className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Player Dashboard</h2>
          <p className="text-muted-foreground">
            Track your drills, monitor your progress, and stay injury-free
          </p>
        </div>

        <Tabs defaultValue="drills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="drills" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Drills</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="injury" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Health</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drills" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Upload Football Drills</CardTitle>
                <CardDescription>
                  Share your training videos and get performance analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DrillUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Team Leaderboard</CardTitle>
                <CardDescription>
                  See how you rank among your teammates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Leaderboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Player Profile</CardTitle>
                <CardDescription>
                  Manage your information and view your statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Profile />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="injury" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Injury & Recovery Tracking</CardTitle>
                <CardDescription>
                  Monitor your health and recovery progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InjuryTracking />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;