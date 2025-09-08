
import { Music, Timer, Wind } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import BreathingExercise from '@/components/toolkit/breathing-exercise';
import PomodoroTimer from '@/components/toolkit/pomodoro-timer';
import AppHeader from '@/components/layout/app-header';
import Image from 'next/image';
import Link from 'next/link';

const musicLinks = [
    {
        title: "Lofi Hip Hop Radio - Beats to Relax/Study to",
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/hq720.jpg",
    },
    {
        title: "Ambient Study Music to Concentrate",
        url: "https://www.youtube.com/watch?v=WPni755-Krg",
        thumbnail: "https://i.ytimg.com/vi/WPni755-Krg/hq720.jpg",
    },
    {
        title: "Classical Music for Studying",
        url: "https://www.youtube.com/watch?v=W-fFHeTX70Q",
        thumbnail: "https://i.ytimg.com/vi/W-fFHeTX70Q/hq720.jpg",
    }
]

export default function ToolkitPage() {
  return (
    <>
      <AppHeader title="Toolkit" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-headline">Stress & Focus Toolkit</h1>
          <p className="text-muted-foreground text-sm">
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
                 <div className="grid grid-cols-1 gap-4">
                    {musicLinks.map((link) => (
                        <Link href={link.url} key={link.title} target="_blank" rel="noopener noreferrer" className="group">
                        <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                            <CardContent className="p-0">
                                <Image 
                                    src={link.thumbnail}
                                    alt={link.title}
                                    width={400}
                                    height={225}
                                    className="w-full h-auto object-cover"
                                    data-ai-hint="youtube thumbnail"
                                />
                                <div className="p-4">
                                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{link.title}</p>
                                </div>
                            </CardContent>
                        </Card>
                        </Link>
                    ))}
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
