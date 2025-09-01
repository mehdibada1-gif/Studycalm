
'use client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookOpen, Search, Loader2, Sparkles } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { answerQuestion } from '@/ai/flows/knowledge-base-flow';

const formSchema = z.object({
  question: z.string().min(5, 'Please ask a more detailed question.'),
});

export default function KnowledgeBasePage() {
  const [isPending, startTransition] = useTransition();
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      setError(null);
      setAnswer(null);
      try {
        const result = await answerQuestion({ query: values.question });
        setAnswer(result.answer);
      } catch (e) {
        setError('Sorry, I could not find an answer to your question. Please try again.');
        console.error(e);
      }
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <BookOpen className="size-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Ask questions about mental health, study techniques, and well-being.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>Our AI will provide an answer based on trusted knowledge sources.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., How can I improve my focus?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Get Answer
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
                <CardTitle>Finding an answer...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
            </CardContent>
          </Card>
      )}

      {answer && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary"/>
                Answer
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-foreground">
             <div dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br />') }} />
          </CardContent>
        </Card>
      )}
       {error && (
        <div className="mt-8 text-destructive text-center">{error}</div>
      )}
    </div>
  );
}
