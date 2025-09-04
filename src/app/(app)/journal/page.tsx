
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
import AppHeader from '@/components/layout/app-header';

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
    <>
      <AppHeader title="Journal" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>New Entry</CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select your mood</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex justify-around pt-2"
                        >
                          {['😄', '🙂', '😐', '😕', '😔'].map((mood) => (
                            <FormItem
                              key={mood}
                              className="flex items-center"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={mood}
                                  id={`mood-${mood}`}
                                  className="sr-only"
                                />
                              </FormControl>
                              <FormLabel 
                                htmlFor={`mood-${mood}`}
                                className="text-4xl cursor-pointer p-2 rounded-full transition-all transform hover:scale-110 data-[state=checked]:scale-125 data-[state=checked]:bg-accent"
                              >
                                {mood}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-center pt-2" />
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
              <CardFooter className="bg-muted/50 px-6 py-4">
                <Button type="submit" className="w-full">
                  <BookText className="mr-2 size-4" />
                  Save Entry
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline px-1">Past Entries</h2>
          {entries.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              <BookText className="mx-auto size-12 mb-4" />
              <h3 className="font-semibold text-lg">No entries yet</h3>
              <p className="text-sm">Your journal entries will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">{entry.mood}</span>
                            <span className="font-semibold">{format(entry.date.toDate(), 'MMMM d, yyyy')}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleGetTips(entry.entry)}
                            className="text-muted-foreground"
                        >
                            <Sparkles className="size-5" />
                            <span className="sr-only">Get Intelligent Tips</span>
                        </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{entry.entry}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
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
          <div className="py-4 max-h-[60vh] overflow-y-auto">
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
    </>
  );
}
