import { Music, Timer, Wind } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BreathingExercise from '@/components/toolkit/breathing-exercise';
import PomodoroTimer from '@/components/toolkit/pomodoro-timer';

export default function ToolkitPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Stress & Focus Toolkit</h1>
        <p className="text-muted-foreground">
          A collection of tools to help you manage anxiety and enhance concentration.
        </p>
      </div>
      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="breathing">
            <Wind className="mr-2 size-4" />
            Breathing
          </TabsTrigger>
          <TabsTrigger value="timer">
            <Timer className="mr-2 size-4" />
            Study Timer
          </TabsTrigger>
          <TabsTrigger value="music">
            <Music className="mr-2 size-4" />
            Focus Music
          </TabsTrigger>
        </TabsList>
        <TabsContent value="breathing">
          <Card>
            <CardHeader>
              <CardTitle>Guided Breathing</CardTitle>
              <CardDescription>
                Follow the visual guide to calm your mind and body.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BreathingExercise />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timer">
          <Card>
            <CardHeader>
              <CardTitle>Pomodoro Timer</CardTitle>
              <CardDescription>
                Balance focused study sessions with short breaks to maximize productivity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PomodoroTimer />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="music">
          <Card>
            <CardHeader>
              <CardTitle>Focus Music</CardTitle>
              <CardDescription>
                Curated playlists to help you concentrate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Focus music can help block out distractions and improve concentration. Here are some recommended lo-fi and ambient playlists:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><a href="#" className="text-primary hover:underline">Lo-fi Hip Hop Radio - Beats to Relax/Study to</a></li>
                <li><a href="#" className="text-primary hover:underline">Ambient Study Music to Concentrate</a></li>
                <li><a href="#" className="text-primary hover:underline">Classical Music for Studying</a></li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
