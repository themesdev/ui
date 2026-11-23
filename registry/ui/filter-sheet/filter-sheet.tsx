"use client"

import { useEffect, useRef, useState } from "react"
import { SlidersHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export type FilterSheetOption = { value: string; label: string; count?: number; checked?: boolean; disabled?: boolean }
export type FilterSheetGroup = { name: string; legend: string; options: FilterSheetOption[] }

export interface FilterSheetProps {
  /** Unique on the page. */
  id: string
  groups: FilterSheetGroup[]
  /** The button and the sheet's title. */
  label?: string
  /** A line under the title in the sheet. */
  description?: string
  /** The closing action, e.g. "Show 24 results". */
  apply?: string
  onChange?: (detail: { active: Record<string, string[]>; total: number }) => void
  onApply?: (detail: { active: Record<string, string[]>; total: number }) => void
  className?: string
}

const initial = (groups: FilterSheetGroup[]) =>
  Object.fromEntries(groups.map((g) => [g.name, g.options.filter((o) => o.checked).map((o) => o.value)]))

/** A "Filters" button with the active count that opens a side sheet of checkbox groups, with Clear all and Show
 *  results. Opening, the focus trap, Escape and the return of focus belong to the shadcn Sheet. */
export function FilterSheet({ id, groups, label = "Filters", description, apply = "Show results", onChange, onApply, className }: FilterSheetProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => initial(groups))
  const trigger = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const total = Object.values(active).reduce((n, v) => n + v.length, 0)
  const clearable = groups.some((g) => g.options.some((o) => !o.disabled && active[g.name]?.includes(o.value)))

  // Focus goes back to the Filters button when the sheet closes.
  useEffect(() => {
    if (wasOpen.current && !open) trigger.current?.focus()
    wasOpen.current = open
  }, [open])

  const commit = (next: Record<string, string[]>) => {
    setActive(next)
    onChange?.({ active: next, total: Object.values(next).reduce((n, v) => n + v.length, 0) })
  }
  const toggle = (name: string, value: string, on: boolean) =>
    commit({ ...active, [name]: on ? [...(active[name] ?? []), value] : (active[name] ?? []).filter((v) => v !== value) })
  const clear = () =>
    commit(
      Object.fromEntries(
        groups.map((g) => [g.name, (active[g.name] ?? []).filter((v) => g.options.find((o) => o.value === v)?.disabled)]),
      ),
    )

  return (
    <div className={cn("inline-block", className)}>
      <Button ref={trigger} type="button" variant="outline" size="lg" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <SlidersHorizontalIcon aria-hidden="true" />
        {label}
        {total > 0 && (
          <Badge className="ml-0.5 h-5 min-w-5 justify-center px-1.5 tabular-nums">
            <span className="sr-only">, </span>
            {total}
            <span className="sr-only"> active</span>
          </Badge>
        )}
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" id={id}>
          <SheetHeader className="border-b p-5">
            <SheetTitle className="text-lg leading-[1.25]">{label}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <div className="flex-1 space-y-7 overflow-y-auto px-5 pb-2">
            {groups.map((g) => (
              <fieldset key={g.name} className="grid gap-3 border-0 p-0">
                <legend className="mb-3 text-sm font-medium">{g.legend}</legend>
                {g.options.map((o) => {
                  const cid = `${id}-${g.name}-${o.value}`
                  return (
                    <div key={o.value} className="flex items-center gap-3">
                      <Checkbox
                        id={cid}
                        name={g.name}
                        value={o.value}
                        checked={active[g.name]?.includes(o.value) ?? false}
                        disabled={o.disabled}
                        onCheckedChange={(v) => toggle(g.name, o.value, v === true)}
                      />
                      <label htmlFor={cid} className={cn("flex flex-1 items-center justify-between gap-3 text-sm", o.disabled && "opacity-50")}>
                        {o.label}
                        {o.count !== undefined && <span className="text-muted-foreground tabular-nums">{o.count}</span>}
                      </label>
                    </div>
                  )
                })}
              </fieldset>
            ))}
          </div>
          <SheetFooter className="flex-row items-center justify-between border-t p-5">
            <Button type="button" variant="ghost" size="lg" disabled={!clearable} onClick={clear}>
              Clear all
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={() => {
                onApply?.({ active, total })
                setOpen(false)
              }}
            >
              {apply}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
