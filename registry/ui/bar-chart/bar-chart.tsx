import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export type Bar = { label: string; value: number }

export interface BarChartProps {
  title: string
  data: Bar[]
  /** Added after the numbers in the table for screen readers, e.g. " deploys" or "%". */
  unit?: string
  /** A line at the top right, e.g. "Total 412". */
  summary?: string
  /** The label of one column to draw in full strength; the others are softer. */
  highlight?: string
  className?: string
}

/** Columns with their values on top and labels under them, drawn without a chart library; the same data sits in a
 *  table for screen readers. */
export function BarChart({ title, data, unit = "", summary, highlight, className }: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <figure className={cn("w-full rounded-xl border bg-card p-5 text-card-foreground", className)} style={{ "--bars": data.length } as CSSProperties}>
      <figcaption className="mb-6 flex items-baseline justify-between gap-4">
        <span className="text-base leading-[1.25] font-medium">{title}</span>
        {summary && <span className="text-sm text-muted-foreground tabular-nums">{summary}</span>}
      </figcaption>
      <div aria-hidden="true">
        <div className="flex h-48 items-end gap-2 border-b sm:gap-3">
          {data.map((d) => (
            <div key={d.label} className="flex h-full min-w-0 flex-1 items-end justify-center">
              <span
                className={cn(
                  "relative block w-full max-w-12 rounded-t-md",
                  highlight === undefined || highlight === d.label ? "bg-primary" : "bg-primary/25",
                )}
                style={{ height: `max(4px, ${((d.value / max) * 88).toFixed(2)}%)` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground tabular-nums">{d.value}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2 sm:gap-3">
          {data.map((d) => (
            <span key={d.label} className="min-w-0 flex-1 truncate text-center text-xs text-muted-foreground">
              {d.label}
            </span>
          ))}
        </div>
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>
                {d.value}
                {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
