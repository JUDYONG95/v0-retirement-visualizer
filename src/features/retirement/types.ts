export interface RetirementInputs {
  currentAge: number
  retirementAge: number
  lifeExpectancy: number
  currentSavings: number
  monthlyContribution: number
  annualReturnRate: number
  inflationRate: number
  monthlyRetirementSpending: number
}

export interface YearlyProjection {
  age: number
  year: number
  balance: number
  contributions: number
  returns: number
  withdrawals: number
  isRetired: boolean
}

export interface RetirementSummary {
  totalAtRetirement: number
  totalContributions: number
  totalReturns: number
  yearsInRetirement: number
  monthlyIncomeAtRetirement: number
  willOutlive: boolean
  runOutAge: number | null
}
