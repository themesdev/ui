"use client"

import { useState } from "react"
import { CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { cn } from "@/lib/utils"

export type FilterOption = { value: string; label: string; pressed?: boolean }

export interface FilterBarProps {
  /** Unique on the page. */
  id: string
  /** Names the chip group, e.g. "Filter by status". */
  label: string
  filters: FilterOption[]
  sort: { value: string; label: string }[]
  sortValue?: string
  /** The result line, e.g. "24 deploys". Announced when it changes. */
  count: string
  onChange?: (detail: { active: string[]; sort?: string }) => void
  className?: string
}

/** Toggle chips, a sort choice and a live result count; Clear turns every filter off. */
export function FilterBar({ id, label, filters, sort, sortValue, count, onChange, className }: FilterBarProps) {
  const [active, setActive] = useState(() => filters.filter((f) => f.pressed).map((f) => f.value))
  const [order, setOrder] = useState(sortValue ?? sort[0]?.value)
  const update = (next: string[]) => {
    setActive(next)
    onChange?.({ active: next, sort: order })
  }
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", className)}>
      <ul aria-label={label} className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = active.includes(f.value)
          return (
            <li key={f.value}>
              <Button
                type="button"
                size="lg"
                variant={on ? "default" : "outline"}
                aria-pressed={on}
                className="h-9 rounded-full px-3.5"
                onClick={() => update(on ? active.filter((v) => v !== f.value) : [...active, f.value])}
              >
                {on && <CheckIcon aria-hidden="true" />}
                {f.label}
              </Button>
            </li>
          )
        })}
      </ul>
      <div className="flex shrink-0 items-center gap-3">
        <p role="status" className="text-sm text-muted-foreground tabular-nums">
          {count}
        </p>
        <label htmlFor={`${id}-sort`} className="sr-only">
          Sort by
        </label>
        <NativeSelect
          id={`${id}-sort`}
          value={order}
          onChange={(e) => {
            setOrder(e.target.value)
            onChange?.({ active, sort: e.target.value })
          }}
          className="[&>select]:h-9"
        >
          {sort.map((s) => (
            <NativeSelectOption key={s.value} value={s.value}>
              {s.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <Button type="button" variant="ghost" size="lg" disabled={active.length === 0} onClick={() => update([])}>
          Clear
        </Button>
      </div>
    </div>
  )
}
