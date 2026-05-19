"use client"

import { useState } from "react"
import {
  RetirementInputsForm,
  RetirementChart,
  RetirementSummaryCards,
  useRetirementCalculator,
  DEFAULT_INPUTS,
  type RetirementInputs,
} from "@/src/features/retirement"

export default function HomePage() {
  const [inputs, setInputs] = useState<RetirementInputs>(DEFAULT_INPUTS)
  const { projections, summary } = useRetirementCalculator(inputs)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-site px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Retirement Visualiser
          </h1>
          <p className="mt-2 text-muted-foreground text-balance">
            Plan your financial future by adjusting your savings, returns, and spending goals
          </p>
        </header>

        {/* Summary Cards */}
        <section className="mb-8">
          <RetirementSummaryCards summary={summary} />
        </section>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Chart */}
          <section>
            <RetirementChart
              projections={projections}
              retirementAge={inputs.retirementAge}
            />
          </section>

          {/* Inputs */}
          <aside>
            <RetirementInputsForm inputs={inputs} onChange={setInputs} />
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            This calculator provides estimates based on the assumptions you provide.
            Actual results may vary. Consult a financial advisor for personalized advice.
          </p>
        </footer>
      </div>
    </main>
  )
}
