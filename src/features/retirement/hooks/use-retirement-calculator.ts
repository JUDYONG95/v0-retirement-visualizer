"use client"

import { useMemo } from "react"
import type { RetirementInputs, YearlyProjection, RetirementSummary } from "../types"

export function useRetirementCalculator(inputs: RetirementInputs) {
  const projections = useMemo(() => {
    const results: YearlyProjection[] = []
    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentSavings,
      monthlyContribution,
      annualReturnRate,
      inflationRate,
      monthlyRetirementSpending,
    } = inputs

    const monthlyReturnRate = annualReturnRate / 100 / 12
    const monthlyInflationRate = inflationRate / 100 / 12
    const currentYear = new Date().getFullYear()

    let balance = currentSavings
    let totalContributions = currentSavings
    let totalReturns = 0
    let adjustedMonthlySpending = monthlyRetirementSpending

    for (let age = currentAge; age <= lifeExpectancy; age++) {
      const isRetired = age >= retirementAge
      const year = currentYear + (age - currentAge)

      let yearContributions = 0
      let yearReturns = 0
      let yearWithdrawals = 0

      for (let month = 0; month < 12; month++) {
        if (!isRetired) {
          balance += monthlyContribution
          yearContributions += monthlyContribution
          totalContributions += monthlyContribution
        } else {
          const withdrawal = Math.min(adjustedMonthlySpending, balance)
          balance -= withdrawal
          yearWithdrawals += withdrawal
          adjustedMonthlySpending *= 1 + monthlyInflationRate
        }

        const monthReturn = balance * monthlyReturnRate
        balance += monthReturn
        yearReturns += monthReturn
        totalReturns += monthReturn
      }

      results.push({
        age,
        year,
        balance: Math.max(0, balance),
        contributions: yearContributions,
        returns: yearReturns,
        withdrawals: yearWithdrawals,
        isRetired,
      })

      if (balance <= 0) break
    }

    return results
  }, [inputs])

  const summary = useMemo((): RetirementSummary => {
    const retirementYearData = projections.find((p) => p.age === inputs.retirementAge)
    const lastYearData = projections[projections.length - 1]
    const runOutYear = projections.find((p) => p.balance <= 0)

    const totalContributions = projections
      .filter((p) => !p.isRetired)
      .reduce((sum, p) => sum + p.contributions, inputs.currentSavings)

    const totalReturns = projections.reduce((sum, p) => sum + p.returns, 0)

    return {
      totalAtRetirement: retirementYearData?.balance ?? 0,
      totalContributions,
      totalReturns,
      yearsInRetirement: inputs.lifeExpectancy - inputs.retirementAge,
      monthlyIncomeAtRetirement: inputs.monthlyRetirementSpending,
      willOutlive: lastYearData?.balance > 0 && lastYearData?.age >= inputs.lifeExpectancy,
      runOutAge: runOutYear?.age ?? null,
    }
  }, [projections, inputs])

  return { projections, summary }
}
