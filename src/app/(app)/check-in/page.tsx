
'use client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClipboardCheck,
  HeartPulse,
  Lightbulb,
  MessageCircleQuestion,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { generateIntelligentTips } from '@/ai/flows/intelligent-tips-from-journal';
import AppHeader from '@/components/layout/app-header';

const questions = [
  {
    id: 'energy',
    text: 'How have your energy levels been this week?',
    options: ['Very High', 'High', 'Moderate', 'Low', 'Very Low'],
  },
  {
    id: 'motivation',
    text: 'How motivated did you feel to study?',
    options: ['Very Motivated', 'Motivated', 'Neutral', 'Unmotivated', 'Very Unmotivated'],
  },
  {
    id: 'sleep',
    text: 'How would you rate your sleep quality?',
    options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
  },
];

const schemaFields = questions.reduce((acc, q) => {
  acc[q.id as keyof typeof acc] = z.string({ required_error: 'Please select an option.' });
  return acc;
}, {} as Record<string, z.ZodString>);

const checkinSchema = z.object(schemaFields);

export default function CheckinPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<z.infer<typeof checkinSchema>>({
    resolver: zodResolver(checkinSchema),
  });

  function onSubmit(data: z.infer<typeof checkinSchema>) {
    startTransition(async () => {
        setResult(null);
        const journalEntry = `This week, my energy was ${data.energy}, my study motivation was ${data.motivation}, and my sleep quality was ${data.sleep}.`;

        try {
            const aiResult = await generateIntelligentTips({ journalEntries: journalEntry });
            setResult(aiResult.tips);
        } catch (error) {
            console.error(error);
            setResult('Sorry, I could not generate advice right now. Please try again later.');
        }
    })
  }

  return (
    <>
    <AppHeader title="Weekly Check-in" />
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <ClipboardCheck className="size-10 text-primary" />
        <div>
          <h1 className="text-2xl font-bold font-headline">Burnout Check-in</h1>
          <p className="text-muted-foreground text-sm">A quick self-assessment to check on your well-being.</p>
        </div>
      </div>

      {!result && !isPending ? (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Answer a few questions</CardTitle>
                <CardDescription>
                  Reflect honestly on your past week.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {questions.map((q) => (
                  <FormField
                    key={q.id}
                    control={form.control}
                    name={q.id}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="font-semibold text-base flex items-center gap-2">
                          <MessageCircleQuestion className="size-5 text-muted-foreground" />
                          {q.text}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {q.options.map((option) => (
                              <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal">{option}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </CardContent>
              <CardContent>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <HeartPulse className="mr-2" />
                      See My Results
                    </>
                  )}
                </Button>
              </CardContent>
            </form>
          </Form>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Check-in Results</CardTitle>
             <CardDescription>Here's some AI-powered feedback based on your answers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {isPending ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="animate-spin size-4" />
                    <p>Generating your advice...</p>
                </div>
             ) : (
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Personalized Feedback</AlertTitle>
                  <AlertDescription>
                    <div dangerouslySetInnerHTML={{ __html: result?.replace(/\n/g, '<br />') ?? '' }} />
                  </AlertDescription>
                </Alert>
             )}
            <Button onClick={() => {
                setResult(null);
                form.reset();
            }} variant="outline">
              Take Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
    </>
  );
}
