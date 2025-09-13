import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Heart, Plus, AlertCircle, CheckCircle, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface Injury {
  id: string;
  type: string;
  bodyPart: string;
  severity: 'Minor' | 'Moderate' | 'Severe';
  date: Date;
  expectedRecovery: number; // days
  description: string;
  status: 'Active' | 'Recovering' | 'Recovered';
  recoveryProgress: number; // percentage
}

const InjuryTracking: React.FC = () => {
  const [injuries, setInjuries] = useState<Injury[]>([
    {
      id: '1',
      type: 'Muscle Strain',
      bodyPart: 'Hamstring',
      severity: 'Moderate',
      date: new Date('2024-01-05'),
      expectedRecovery: 14,
      description: 'Pulled hamstring during sprint training',
      status: 'Recovering',
      recoveryProgress: 75
    },
    {
      id: '2',
      type: 'Sprain',
      bodyPart: 'Ankle',
      severity: 'Minor',
      date: new Date('2023-12-20'),
      expectedRecovery: 7,
      description: 'Minor ankle sprain from landing awkwardly',
      status: 'Recovered',
      recoveryProgress: 100
    }
  ]);

  const [showNewInjury, setShowNewInjury] = useState(false);
  const [newInjury, setNewInjury] = useState({
    type: '',
    bodyPart: '',
    severity: '' as 'Minor' | 'Moderate' | 'Severe' | '',
    date: new Date(),
    expectedRecovery: '',
    description: ''
  });

  const { toast } = useToast();

  const injuryTypes = [
    'Muscle Strain', 'Sprain', 'Fracture', 'Bruise', 'Cut', 'Overuse', 'Other'
  ];

  const bodyParts = [
    'Head', 'Neck', 'Shoulder', 'Arm', 'Elbow', 'Wrist', 'Hand', 'Back', 
    'Chest', 'Ribs', 'Hip', 'Thigh', 'Hamstring', 'Knee', 'Calf', 'Ankle', 'Foot'
  ];

  const handleAddInjury = () => {
    if (!newInjury.type || !newInjury.bodyPart || !newInjury.severity || !newInjury.expectedRecovery) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const injury: Injury = {
      id: Date.now().toString(),
      type: newInjury.type,
      bodyPart: newInjury.bodyPart,
      severity: newInjury.severity,
      date: newInjury.date,
      expectedRecovery: parseInt(newInjury.expectedRecovery),
      description: newInjury.description,
      status: 'Active',
      recoveryProgress: 0
    };

    setInjuries(prev => [injury, ...prev]);
    setNewInjury({
      type: '',
      bodyPart: '',
      severity: '',
      date: new Date(),
      expectedRecovery: '',
      description: ''
    });
    setShowNewInjury(false);

    toast({
      title: "Injury Recorded",
      description: "Your injury has been recorded. Start your recovery journey!",
      variant: "default",
    });
  };

  const updateRecoveryProgress = (id: string, progress: number) => {
    setInjuries(prev => prev.map(injury => 
      injury.id === id 
        ? { 
            ...injury, 
            recoveryProgress: progress,
            status: progress === 100 ? 'Recovered' : progress > 0 ? 'Recovering' : 'Active'
          }
        : injury
    ));

    toast({
      title: "Progress Updated",
      description: "Recovery progress has been updated.",
      variant: "default",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Minor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Moderate': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Severe': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'Recovering': return <Clock className="w-4 h-4 text-warning" />;
      case 'Recovered': return <CheckCircle className="w-4 h-4 text-success" />;
      default: return null;
    }
  };

  const activeInjuries = injuries.filter(injury => injury.status !== 'Recovered');
  const recoveredInjuries = injuries.filter(injury => injury.status === 'Recovered');

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Injury Management</h3>
          <p className="text-sm text-muted-foreground">Track and monitor your injury recovery</p>
        </div>
        <Button
          onClick={() => setShowNewInjury(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report Injury
        </Button>
      </div>

      {/* Health Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{recoveredInjuries.length}</div>
            <div className="text-sm text-muted-foreground">Recovered</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{activeInjuries.length}</div>
            <div className="text-sm text-muted-foreground">Active/Recovering</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {activeInjuries.length > 0 
                ? Math.round(activeInjuries.reduce((sum, injury) => sum + injury.recoveryProgress, 0) / activeInjuries.length)
                : 100}%
            </div>
            <div className="text-sm text-muted-foreground">Average Recovery</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Injury Form */}
      {showNewInjury && (
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Report New Injury</CardTitle>
            <CardDescription>
              Provide details about your injury to track recovery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Injury Type</Label>
                <Select
                  value={newInjury.type}
                  onValueChange={(value) => setNewInjury(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select injury type" />
                  </SelectTrigger>
                  <SelectContent>
                    {injuryTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Body Part</Label>
                <Select
                  value={newInjury.bodyPart}
                  onValueChange={(value) => setNewInjury(prev => ({ ...prev, bodyPart: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body part" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyParts.map((part) => (
                      <SelectItem key={part} value={part}>{part}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Severity</Label>
                <Select
                  value={newInjury.severity}
                  onValueChange={(value) => setNewInjury(prev => ({ ...prev, severity: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minor">Minor</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Expected Recovery (days)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 14"
                  value={newInjury.expectedRecovery}
                  onChange={(e) => setNewInjury(prev => ({ ...prev, expectedRecovery: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe how the injury occurred and any symptoms..."
                value={newInjury.description}
                onChange={(e) => setNewInjury(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleAddInjury} className="bg-primary hover:bg-primary/90">
                Record Injury
              </Button>
              <Button variant="outline" onClick={() => setShowNewInjury(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active/Recovering Injuries */}
      {activeInjuries.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-warning">
              <Heart className="w-5 h-5" />
              <span>Current Injuries</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeInjuries.map((injury) => (
              <div key={injury.id} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(injury.status)}
                    <div>
                      <h4 className="font-semibold">{injury.type} - {injury.bodyPart}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format(injury.date, 'MMM dd, yyyy')} • {injury.expectedRecovery} days expected
                      </p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(injury.severity)}>
                    {injury.severity}
                  </Badge>
                </div>
                
                {injury.description && (
                  <p className="text-sm text-muted-foreground">{injury.description}</p>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Recovery Progress</Label>
                    <span className="text-sm font-medium">{injury.recoveryProgress}%</span>
                  </div>
                  <Progress value={injury.recoveryProgress} className="h-3" />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateRecoveryProgress(injury.id, Math.min(injury.recoveryProgress + 25, 100))}
                    >
                      +25%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateRecoveryProgress(injury.id, 100)}
                    >
                      Mark Recovered
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recovery History */}
      {recoveredInjuries.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span>Recovery History</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recoveredInjuries.map((injury) => (
              <div key={injury.id} className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <div>
                    <h4 className="font-medium">{injury.type} - {injury.bodyPart}</h4>
                    <p className="text-sm text-muted-foreground">
                      Recovered • {format(injury.date, 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Healed
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* No Injuries Message */}
      {injuries.length === 0 && (
        <Card className="shadow-card text-center">
          <CardContent className="p-8">
            <Heart className="w-12 h-12 mx-auto text-success mb-4" />
            <h3 className="text-lg font-semibold text-success mb-2">Great Health Status!</h3>
            <p className="text-muted-foreground mb-4">
              You have no recorded injuries. Keep up the good work staying healthy!
            </p>
            <Button
              onClick={() => setShowNewInjury(true)}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Report an Injury (if needed)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InjuryTracking;