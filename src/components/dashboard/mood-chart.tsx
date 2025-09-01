
'use client';
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  limit,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/auth-context';
import { format, subDays } from 'date-fns';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const moodMapping: { [key: string]: number } = {
  '😄': 5,
  '🙂': 4,
  '😐': 3,
  '😕': 2,
  '😔': 1,
};

const chartConfig = {
  mood: {
    label: 'Mood',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const moodLevels = {
  1: '😔',
  2: '😕',
  3: '😐',
  4: '🙂',
  5: '😄',
} as const;

export default function MoodChart() {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const today = new Date();
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(today, i);
      return { date: format(d, 'EEE'), mood: 0 };
    }).reverse();

    if (!user) {
      setChartData(last7Days);
      return;
    }

    const q = query(
      collection(db, 'journalEntries'),
      where('userId', '==', user.uid),
      orderBy('date', 'desc'),
      limit(20) // Fetch more to average
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dailyAverages: { [key: string]: { total: number; count: number } } = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = (data.date as Timestamp).toDate();
        const dayStr = format(date, 'EEE');
        
        if (!dailyAverages[dayStr]) {
          dailyAverages[dayStr] = { total: 0, count: 0 };
        }
        dailyAverages[dayStr].total += moodMapping[data.mood] || 0;
        dailyAverages[dayStr].count += 1;
      });

      const newChartData = last7Days.map(day => {
        if (dailyAverages[day.date]) {
          return { ...day, mood: Math.round(dailyAverages[day.date].total / dailyAverages[day.date].count) }
        }
        return day;
      })

      setChartData(newChartData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tickFormatter={(value) => moodLevels[value as keyof typeof moodLevels]}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="mood" fill="var(--color-mood)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
