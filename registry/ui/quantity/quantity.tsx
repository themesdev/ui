"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type QuantityProps = {
  id: string
  label: string
  defaultValue: number
  min?: number
  max?: number
  step?: number
  name?: string
  onValueChange?: (value: number) => void
  className?: string
}

/** Minus, a number field and plus as one control; the buttons turn off at min and max. */
export function Quantity({ id, label, defaultValue, min = 0, max, step = 1, name, onValueChange, className }: QuantityProps) {
  const [v, setV] = useState(defaultValue)
  const [text, setText] = useState(String(defaultValue))
  const set = (n: number) => {
    const c = Number.isFinite(n) ? Math.max(min, max === undefined ? n : Math.min(max, n)) : min
    setV(c)
    setText(String(c))
    onValueChange?.(c)
  }
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="inline-flex w-fit items-center">
        <Button type="button" variant="outline" size="icon-lg" aria-label={`Fewer: ${label}`} aria-controls={id} disabled={v <= min} onClick={() => set(v - step)} className="size-10 rounded-r-none">
          <Minus aria-hidden="true" />
        </Button>
        <Input
          type="number"
          id={id}
          name={name}
          value={text}
          min={min}
          max={max}
          step={step}
          inputMode="numeric"
          onChange={(e) => {
            setText(e.target.value)
            if (e.target.value !== "" && Number.isFinite(Number(e.target.value))) setV(Number(e.target.value))
          }}
          onBlur={() => set(text === "" ? min : Number(text))}
          className="h-10 w-16 -mx-px rounded-none text-center tabular-nums [appearance:textfield] focus-visible:z-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button type="button" variant="outline" size="icon-lg" aria-label={`More: ${label}`} aria-controls={id} disabled={max !== undefined && v >= max} onClick={() => set(v + step)} className="size-10 rounded-l-none">
          <Plus aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
