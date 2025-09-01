
'use client';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { writeBatch, doc, Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database } from 'lucide-react';
import { subDays, format } from 'date-fns';

const moods = ['😄', '🙂', '😐', '😕', '😔'] as const;

export default function SeedPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const seedDatabase = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to seed the database.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const batch = writeBatch(db);
      const today = new Date();

      for (let i = 0; i < 15; i++) {
        const entryDate = subDays(today, Math.floor(Math.random() * 7));
        const mood = moods[Math.floor(Math.random() * moods.length)];
        const entryRef = doc(db, 'journalEntries', `${user.uid}_${Date.now()}_${i}`);
        batch.set(entryRef, {
          userId: user.uid,
          date: Timestamp.fromDate(entryDate),
          mood: mood,
          entry: `This is a sample journal entry from ${format(entryDate, 'MMMM d')}. Feeling ${mood}.`,
        });
      }
      
      await batch.commit();

      toast({
        title: 'Success!',
        description: 'Database has been seeded with sample journal entries.',
      });
    } catch (error: any) {
      toast({
        title: 'Error Seeding Database',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Database className="size-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Seed Database</h1>
          <p className="text-muted-foreground">
            Populate your database with sample data for demonstration.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate Sample Data</CardTitle>
          <CardDescription>
            Click the button below to add sample journal entries to your Firestore
            database. This will help you visualize data in the dashboard charts.
            This action is only available in the development environment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={seedDatabase} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding...
              </>
            ) : (
              'Seed My Database'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
