"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { RetirementInputs } from "../types"
import { INPUT_CONSTRAINTS } from "../constants"
import { formatCurrency } from "@/src/lib/utils"

interface RetirementInputsFormProps {
  inputs: RetirementInputs
  onChange: (inputs: RetirementInputs) => void
}

function InputField({
  label,
  name,
  value,
  onChange,
  prefix,
  suffix,
  constraints,
}: {
  label: string
  name: keyof RetirementInputs
  value: number
  onChange: (name: keyof RetirementInputs, value: number) => void
  prefix?: string
  suffix?: string
  constraints: { min: number; max: number; step: number }
}) {
  return (
    <div className="space-y-3">
      <div className="flex-between">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
        <span className="text-sm font-semibold text-foreground">
          {prefix}
          {prefix === "$" ? formatCurrency(value).replace("$", "") : value}
          {suffix}
        </span>
      </div>
      <Slider
        id={name}
        min={constraints.min}
        max={constraints.max}
        step={constraints.step}
        value={[value]}
        onValueChange={([v]) => onChange(name, v)}
        className="py-2"
      />
    </div>
  )
}

export function RetirementInputsForm({ inputs, onChange }: RetirementInputsFormProps) {
  const handleChange = (name: keyof RetirementInputs, value: number) => {
    onChange({ ...inputs, [name]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Details</CardTitle>
        <CardDescription>Adjust the sliders to see how changes affect your retirement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <InputField
            label="Current Age"
            name="currentAge"
            value={inputs.currentAge}
            onChange={handleChange}
            suffix=" years"
            constraints={INPUT_CONSTRAINTS.currentAge}
          />
          <InputField
            label="Retirement Age"
            name="retirementAge"
            value={inputs.retirementAge}
            onChange={handleChange}
            suffix=" years"
            constraints={INPUT_CONSTRAINTS.retirementAge}
          />
        </div>

        <InputField
          label="Life Expectancy"
          name="lifeExpectancy"
          value={inputs.lifeExpectancy}
          onChange={handleChange}
          suffix=" years"
          constraints={INPUT_CONSTRAINTS.lifeExpectancy}
        />

        <div className="border-t pt-6">
          <h4 className="mb-4 text-sm font-semibold text-muted-foreground">Savings</h4>
          <div className="space-y-6">
            <InputField
              label="Current Savings"
              name="currentSavings"
              value={inputs.currentSavings}
              onChange={handleChange}
              prefix="$"
              constraints={INPUT_CONSTRAINTS.currentSavings}
            />
            <InputField
              label="Monthly Contribution"
              name="monthlyContribution"
              value={inputs.monthlyContribution}
              onChange={handleChange}
              prefix="$"
              constraints={INPUT_CONSTRAINTS.monthlyContribution}
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="mb-4 text-sm font-semibold text-muted-foreground">Assumptions</h4>
          <div className="space-y-6">
            <InputField
              label="Annual Return Rate"
              name="annualReturnRate"
              value={inputs.annualReturnRate}
              onChange={handleChange}
              suffix="%"
              constraints={INPUT_CONSTRAINTS.annualReturnRate}
            />
            <InputField
              label="Inflation Rate"
              name="inflationRate"
              value={inputs.inflationRate}
              onChange={handleChange}
              suffix="%"
              constraints={INPUT_CONSTRAINTS.inflationRate}
            />
            <InputField
              label="Monthly Retirement Spending"
              name="monthlyRetirementSpending"
              value={inputs.monthlyRetirementSpending}
              onChange={handleChange}
              prefix="$"
              constraints={INPUT_CONSTRAINTS.monthlyRetirementSpending}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
