import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, AlertCircle, Play } from 'lucide-react';
import axios from 'axios';

interface DrillData {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  file: File | null;
}

interface UploadResponse {
  success: boolean;
  drillId: string;
  analysisScore: number;
  cheatDetection: {
    detected: boolean;
    confidence: number;
    reasons: string[];
  };
  recommendations: string[];
}

const DrillUpload: React.FC = () => {
  const [drillData, setDrillData] = useState<DrillData>({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    file: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const { toast } = useToast();

  const categories = ['Shooting', 'Dribbling', 'Passing', 'Defending', 'Goalkeeping', 'Fitness'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDrillData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!drillData.file) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Mock API call - replace with your actual endpoint
      const formData = new FormData();
      formData.append('video', drillData.file);
      formData.append('title', drillData.title);
      formData.append('description', drillData.description);
      formData.append('category', drillData.category);
      formData.append('difficulty', drillData.difficulty);

      // Simulate API response after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data
      const mockResponse: UploadResponse = {
        success: true,
        drillId: `drill_${Date.now()}`,
        analysisScore: Math.floor(Math.random() * 30) + 70, // 70-100
        cheatDetection: {
          detected: Math.random() < 0.2, // 20% chance of detecting issues
          confidence: Math.floor(Math.random() * 40) + 60,
          reasons: Math.random() < 0.2 ? ['Unusual movement patterns detected', 'Inconsistent ball tracking'] : []
        },
        recommendations: [
          'Focus on ball control during turns',
          'Improve shooting accuracy',
          'Work on first touch technique'
        ]
      };

      setUploadResult(mockResponse);
      
      toast({
        title: "Upload Successful",
        description: "Your drill has been analyzed and uploaded successfully!",
        variant: "default",
      });

      // Reset form
      setDrillData({
        title: '',
        description: '',
        category: '',
        difficulty: '',
        file: null
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your drill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Drill Title</Label>
            <Input
              id="title"
              placeholder="e.g., Speed Dribbling Practice"
              value={drillData.title}
              onChange={(e) => setDrillData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => setDrillData(prev => ({ ...prev, category: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select
              onValueChange={(value) => setDrillData(prev => ({ ...prev, difficulty: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video File</Label>
            <Input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the drill, objectives, and key points to focus on..."
            value={drillData.description}
            onChange={(e) => setDrillData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-button"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              Uploading & Analyzing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Drill
            </>
          )}
        </Button>
      </form>

      {/* Analysis Results */}
      {uploadResult && (
        <Card className="shadow-card border-success">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span>Analysis Complete</span>
            </CardTitle>
            <CardDescription>
              Your drill has been processed and analyzed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary">{uploadResult.analysisScore}%</div>
                <div className="text-sm text-muted-foreground">Performance Score</div>
              </div>
              
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  {uploadResult.cheatDetection.detected ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-warning" />
                      <Badge variant="secondary" className="bg-warning text-warning-foreground">
                        Issues Detected
                      </Badge>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 text-success" />
                      <Badge variant="secondary" className="bg-success text-success-foreground">
                        Clean Performance
                      </Badge>
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Cheat Detection</div>
              </div>
              
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold text-primary">{uploadResult.recommendations.length}</div>
                <div className="text-sm text-muted-foreground">Recommendations</div>
              </div>
            </div>

            {uploadResult.cheatDetection.detected && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <h4 className="font-semibold text-warning mb-2">Performance Issues Detected</h4>
                <ul className="space-y-1">
                  {uploadResult.cheatDetection.reasons.map((reason, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                      <AlertCircle className="w-3 h-3" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Improvement Recommendations</h4>
              <ul className="space-y-1">
                {uploadResult.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                    <Play className="w-3 h-3" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DrillUpload;