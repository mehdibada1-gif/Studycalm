'use client';

import { Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { activity: 'Study', value: 275, fill: 'var(--color-study)' },
  { activity: 'Break', value: 90, fill: 'var(--color-break)' },
];

const chartConfig = {
  value: {
    label: 'Minutes',
  },
  study: {
    label: 'Study',
    color: 'hsl(var(--chart-1))',
  },
  break: {
    label: 'Break',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function FocusChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="activity"
          innerRadius={60}
          strokeWidth={5}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="activity" />}
          className="-mt-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
