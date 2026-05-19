"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from "recharts"
import type { YearlyProjection } from "../types"
import { formatCurrency } from "@/src/lib/utils"

interface RetirementChartProps {
  projections: YearlyProjection[]
  retirementAge: number
}

const chartConfig: ChartConfig = {
  balance: {
    label: "Balance",
    color: "var(--chart-1)",
  },
}

export function RetirementChart({ projections, retirementAge }: RetirementChartProps) {
  const data = projections.map((p) => ({
    age: p.age,
    balance: Math.round(p.balance),
    isRetired: p.isRetired,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Projected Balance Over Time</CardTitle>
        <CardDescription>
          See how your retirement savings grow and sustain you through retirement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="age"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={(value) => {
                if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
                if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
                return `$${value}`
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <span className="font-medium">
                      {formatCurrency(value as number)}
                    </span>
                  )}
                  labelFormatter={(label) => `Age ${label}`}
                />
              }
            />
            <ReferenceLine
              x={retirementAge}
              stroke="var(--muted-foreground)"
              strokeDasharray="5 5"
              label={{
                value: "Retirement",
                position: "top",
                fill: "var(--muted-foreground)",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#balanceGradient)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
