'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClipboardCheck,
  HeartPulse,
  Lightbulb,
  MessageCircleQuestion,
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
  const [result, setResult] = useState<{ score: number; message: string; title: string } | null>(null);

  const form = useForm<z.infer<typeof checkinSchema>>({
    resolver: zodResolver(checkinSchema),
  });

  function onSubmit(data: z.infer<typeof checkinSchema>) {
    let score = 0;
    Object.values(data).forEach(value => {
        const index = questions[0].options.indexOf(value);
        score += (4 - index); // 'Very High' (index 0) is 4 points, 'Very Low' (index 4) is 0 points
    });

    if (score >= 9) {
      setResult({ score, title: 'Feeling Great!', message: 'You seem to be managing your stress well. Keep up the great work with your healthy habits!' });
    } else if (score >= 5) {
      setResult({ score, title: 'Doing Okay', message: 'There might be some signs of stress. Consider using the toolkit for a breathing exercise or a scheduled break.' });
    } else {
      setResult({ score, title: 'Time to Recharge', message: 'It looks like you might be feeling overwhelmed. It’s important to prioritize rest. Explore our resources for more support.' });
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <ClipboardCheck className="size-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Weekly Burnout Check-in</h1>
          <p className="text-muted-foreground">A quick self-assessment to check on your well-being.</p>
        </div>
      </div>

      {!result ? (
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
                <Button type="submit">
                  <HeartPulse className="mr-2" />
                  See My Results
                </Button>
              </CardContent>
            </form>
          </Form>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Check-in Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>{result.title}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
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
  );
}
