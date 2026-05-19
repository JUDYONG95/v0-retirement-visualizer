"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, PiggyBank, Calendar, Wallet, AlertTriangle } from "lucide-react"
import type { RetirementSummary } from "../types"
import { formatCurrency } from "@/src/lib/utils"
import { cn } from "@/lib/utils"

interface RetirementSummaryCardsProps {
  summary: RetirementSummary
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
}: {
  title: string
  value: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  variant?: "default" | "success" | "warning" | "danger"
}) {
  const variants = {
    default: "bg-card",
    success: "bg-emerald-500/10 border-emerald-500/20",
    warning: "bg-amber-500/10 border-amber-500/20",
    danger: "bg-red-500/10 border-red-500/20",
  }

  const iconVariants = {
    default: "text-muted-foreground",
    success: "text-emerald-500",
    warning: "text-amber-500",
    danger: "text-red-500",
  }

  return (
    <Card className={cn("transition-colors", variants[variant])}>
      <CardContent className="p-4">
        <div className="flex-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <Icon className={cn("h-4 w-4", iconVariants[variant])} />
        </div>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function RetirementSummaryCards({ summary }: RetirementSummaryCardsProps) {
  const {
    totalAtRetirement,
    totalContributions,
    totalReturns,
    yearsInRetirement,
    monthlyIncomeAtRetirement,
    willOutlive,
    runOutAge,
  } = summary

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        title="Savings at Retirement"
        value={formatCurrency(totalAtRetirement)}
        description="Total balance when you retire"
        icon={PiggyBank}
        variant="default"
      />
      <SummaryCard
        title="Total Contributions"
        value={formatCurrency(totalContributions)}
        description="What you put in"
        icon={Wallet}
        variant="default"
      />
      <SummaryCard
        title="Investment Returns"
        value={formatCurrency(totalReturns)}
        description="Growth from investments"
        icon={TrendingUp}
        variant="success"
      />
      <SummaryCard
        title="Years in Retirement"
        value={`${yearsInRetirement} years`}
        description="Based on life expectancy"
        icon={Calendar}
        variant="default"
      />
      <SummaryCard
        title="Monthly Income"
        value={formatCurrency(monthlyIncomeAtRetirement)}
        description="Planned monthly spending"
        icon={TrendingDown}
        variant="default"
      />
      <SummaryCard
        title="Retirement Status"
        value={willOutlive ? "On Track" : `Runs out at ${runOutAge}`}
        description={
          willOutlive
            ? "Your savings will last through retirement"
            : "Consider increasing savings or reducing spending"
        }
        icon={willOutlive ? TrendingUp : AlertTriangle}
        variant={willOutlive ? "success" : "danger"}
      />
    </div>
  )
}
