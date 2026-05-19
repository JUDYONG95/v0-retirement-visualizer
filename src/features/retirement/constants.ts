import type { RetirementInputs } from "./types"

export const DEFAULT_INPUTS: RetirementInputs = {
  currentAge: 30,
  retirementAge: 65,
  lifeExpectancy: 90,
  currentSavings: 50000,
  monthlyContribution: 1000,
  annualReturnRate: 7,
  inflationRate: 2.5,
  monthlyRetirementSpending: 5000,
}

export const INPUT_CONSTRAINTS = {
  currentAge: { min: 18, max: 80, step: 1 },
  retirementAge: { min: 40, max: 85, step: 1 },
  lifeExpectancy: { min: 60, max: 110, step: 1 },
  currentSavings: { min: 0, max: 10000000, step: 1000 },
  monthlyContribution: { min: 0, max: 50000, step: 100 },
  annualReturnRate: { min: 0, max: 15, step: 0.5 },
  inflationRate: { min: 0, max: 10, step: 0.5 },
  monthlyRetirementSpending: { min: 0, max: 50000, step: 100 },
}

export const CHART_COLORS = {
  balance: "var(--chart-1)",
  contributions: "var(--chart-2)",
  withdrawals: "var(--chart-5)",
}
