"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface DateFieldProps {
  /** Unique on the page. */
  id: string
  label: string
  defaultValue?: string
  min?: string
  max?: string
  hint?: string
  /** An error message; marks the field invalid. */
  error?: string
  name?: string
  required?: boolean
  disabled?: boolean
  /** A from–to pair in one fieldset: `label` becomes the legend, and defaultValue/min/max are for "from". */
  range?: { toValue?: string; fromLabel?: string; toLabel?: string }
  className?: string
}

const input = "h-10 text-base md:text-sm"

/** A native date field in the field style, or a from–to pair whose end can't be before its start. */
export function DateField({ id, label, defaultValue, min, max, hint, error, name, required, disabled, range, className }: DateFieldProps) {
  const [from, setFrom] = useState(defaultValue ?? "")
  const [to, setTo] = useState(range?.toValue ?? "")
  const note = error ?? hint
  const noteId = note ? `${id}-note` : undefined
  const noteEl = note && (
    <p id={noteId} className={cn("text-sm leading-[1.25]", error ? "text-destructive" : "text-muted-foreground")}>
      {note}
    </p>
  )

  if (range)
    return (
      <fieldset disabled={disabled} aria-describedby={noteId} className={cn("grid gap-2 border-0 p-0", className)}>
        <legend className="mb-2 text-sm font-medium">{label}</legend>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor={`${id}-from`}>{range.fromLabel ?? "From"}</Label>
            <Input
              type="date"
              id={`${id}-from`}
              name={name ? `${name}-from` : undefined}
              value={from}
              min={min}
              max={max}
              required={required}
              aria-invalid={error ? true : undefined}
              className={input}
              onChange={(e) => {
                const v = e.target.value
                setFrom(v)
                // The end never sits before the start: move it up to the new start.
                if (to && v && to < v) setTo(v)
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${id}-to`}>{range.toLabel ?? "To"}</Label>
            <Input
              type="date"
              id={`${id}-to`}
              name={name ? `${name}-to` : undefined}
              value={to}
              min={from || min}
              max={max}
              required={required}
              aria-invalid={error ? true : undefined}
              className={input}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        {noteEl}
      </fieldset>
    )

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="date"
        id={id}
        name={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={noteId}
        className={input}
      />
      {noteEl}
    </div>
  )
}
