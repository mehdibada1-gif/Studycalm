
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';

import { generateStudyPlan } from '@/ai/flows/personalized-study-plan-generation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppHeader from '@/components/layout/app-header';

const formSchema = z.object({
  studyGoals: z.string().min(10, 'Please describe your study goals in a bit more detail.'),
  academicWorkload: z.string().min(1, 'Please select your academic workload.'),
  stressLevel: z.string().min(1, 'Please select your current stress level.'),
  availableTime: z.string().min(3, 'e.g., "2 hours per day"'),
  focusHabits: z.string().min(10, 'e.g., "I get distracted easily by my phone."'),
});

export default function StudyPlanPage() {
  const [isPending, startTransition] = useTransition();
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studyGoals: '',
      academicWorkload: '',
      stressLevel: '',
      availableTime: '',
      focusHabits: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setError(null);
      setStudyPlan(null);
      try {
        const result = await generateStudyPlan(values);
        if (result.studyPlan) {
          setStudyPlan(result.studyPlan);
        } else {
          setError('Could not generate a study plan. Please try again.');
        }
      } catch (e) {
        console.error(e);
        setError('An unexpected error occurred. Please try again later.');
      }
    });
  }

  return (
    <>
    <AppHeader title="Study Plan" />
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <BrainCircuit className="size-10 text-primary" />
        <div>
          <h1 className="text-2xl font-bold font-headline">Personalized Study Plan</h1>
          <p className="text-muted-foreground text-sm">Let our AI create a study schedule tailored just for you.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Fill this out to get a plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="studyGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are your main study goals?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ace my biology final" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="academicWorkload"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Academic Workload</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your workload" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="heavy">Heavy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stressLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Stress Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your stress level" />
                          </Trigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availableTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How much time can you study daily?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3 hours on weekdays" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="focusHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your focus habits</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Prefer quiet, use timers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate My Plan
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isPending && (
          <Card className="mt-8">
            <CardHeader>
                <CardTitle>Generating your plan...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
            </CardContent>
          </Card>
      )}

      {studyPlan && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-foreground">
            <div dangerouslySetInnerHTML={{ __html: studyPlan.replace(/\n/g, '<br />') }} />
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="mt-8 text-destructive text-center">{error}</div>
      )}
    </div>
    </>
  );
}
