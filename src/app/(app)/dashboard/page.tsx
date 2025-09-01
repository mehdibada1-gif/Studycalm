'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb, BookOpenCheck, Loader2 } from 'lucide-react';
import FocusChart from '@/components/dashboard/focus-chart';
import MoodChart from '@/components/dashboard/mood-chart';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generateIntelligentTips } from '@/ai/flows/intelligent-tips-from-journal';
import AppLogo from '@/components/app-logo';

export default function DashboardPage() {
  const { user } = useAuth();
  const [advice, setAdvice] = useState('');
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'journalEntries'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      if (querySnapshot.empty) {
        setAdvice(
          'Start by adding a journal entry to get personalized advice.'
        );
        setIsLoadingAdvice(false);
        return;
      }

      const latestEntry = querySnapshot.docs[0].data().entry;
      try {
        const result = await generateIntelligentTips({
          journalEntries: latestEntry,
        });
        setAdvice(result.tips);
      } catch (error) {
        console.error('Failed to get advice:', error);
        setAdvice(
          'Could not load advice at the moment. Please try again later.'
        );
      } finally {
        setIsLoadingAdvice(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="xl:col-span-3 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your journey to mindful learning.
        </p>
      </div>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Mood Over Time</CardTitle>
          <CardDescription>
            Your mood entries from the last 7 days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoodChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Focus Analysis</CardTitle>
          <CardDescription>
            Your balance of study and break time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FocusChart />
        </CardContent>
      </Card>

      <Card className="xl:col-span-3 bg-primary/10 border-primary/20">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-3 rounded-full bg-primary/20 text-primary">
            <Lightbulb className="size-6" />
          </div>
          <div>
            <CardTitle>
              Actionable Advice
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              A tip based on your latest journal entry.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingAdvice ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin size-4" />
              <p>Generating your advice...</p>
            </div>
          ) : (
            <p>{advice}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
