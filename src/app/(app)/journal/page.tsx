
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/auth-context';
import { BookText, Sparkles, Loader2, MessageSquareHeart } from 'lucide-react';
import {
  generateIntelligentTips,
} from '@/ai/flows/intelligent-tips-from-journal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const journalSchema = z.object({
  entry: z.string().min(10, {
    message: 'Please write a bit more about how you are feeling.',
  }),
  mood: z.enum(['😄', '🙂', '😐', '😕', '😔'], {
    required_error: 'You need to select a mood.',
  }),
});

type JournalEntry = {
  id: string;
  date: Timestamp;
  mood: '😄' | '🙂' | '😐' | '😕' | '😔';
  entry: string;
  userId: string;
};

export default function JournalPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isTipsLoading, startTipsTransition] = useTransition();
  const [tips, setTips] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof journalSchema>>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      entry: '',
    },
  });

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'journalEntries'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const entriesData: JournalEntry[] = [];
      querySnapshot.forEach((doc) => {
        entriesData.push({ id: doc.id, ...doc.data() } as JournalEntry);
      });
      setEntries(entriesData);
    });
    return () => unsubscribe();
  }, [user]);

  async function onSubmit(data: z.infer<typeof journalSchema>) {
    if (!user) return;
    try {
      await addDoc(collection(db, 'journalEntries'), {
        ...data,
        date: Timestamp.now(),
        userId: user.uid,
      });
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  function handleGetTips(entry: string) {
    startTipsTransition(async () => {
      setTips(null);
      setIsDialogOpen(true);
      const result = await generateIntelligentTips({ journalEntries: entry });
      setTips(result.tips);
    });
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Mood Journal</h1>
          <p className="text-muted-foreground">
            Reflect on your day and track your emotional well-being.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>New Entry</CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Select your mood</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          {['😄', '🙂', '😐', '😕', '😔'].map((mood) => (
                            <FormItem
                              key={mood}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={mood}
                                  className="sr-only"
                                />
                              </FormControl>
                              <FormLabel className="text-3xl cursor-pointer p-2 rounded-full transition-all data-[state=checked]:bg-accent data-[state=checked]:scale-125">
                                {mood}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="entry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell me about your day</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Today was challenging because..."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  <BookText className="mr-2 size-4" />
                  Save Entry
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-headline">Past Entries</h2>
        {entries.length === 0 ? (
          <p className="text-muted-foreground pt-8 text-center">
            No entries yet. Add one to get started!
          </p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {entries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <span className="text-3xl">{entry.mood}</span>
                    <span>{format(entry.date.toDate(), 'MMMM d, yyyy')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{entry.entry}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleGetTips(entry.entry)}
                  >
                    <Sparkles className="mr-2 size-4" />
                    Get Intelligent Tips
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <MessageSquareHeart className="text-primary"/>
                Personalized Well-being Tips
            </DialogTitle>
            <DialogDescription>
              Here are some AI-generated suggestions based on your entry.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isTipsLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="animate-spin" />
                <span>Analyzing your entry...</span>
              </div>
            ) : (
              <p className="text-sm text-foreground whitespace-pre-wrap">{tips}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
