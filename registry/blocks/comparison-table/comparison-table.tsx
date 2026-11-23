import { ArrowRight, Check, Minus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type LinkRef = { label: string; href: string }
export type Column = { name: string; note: string; action?: LinkRef; featured?: boolean }
/** A cell is true (yes), false (no) or a short text value. */
export type Cell = boolean | string
export type Row = { label: string; note?: string; values: Cell[] }

export type ComparisonTableProps = {
  kicker: string
  title: string
  body: string
  /** The honest summary over the table: where you win and where you do not. */
  pros: { title: string; items: string[] }
  cons: { title: string; items: string[] }
  columns: Column[]
  rows: Row[]
  caption: string
  note: string
  updated: string
}

export const comparisonTableDefaults: ComparisonTableProps = {
  kicker: "Compare suppliers",
  title: "Polderstroom next to the usual choices",
  body: "We supply 41,000 homes with power from 26 wind and solar parks in Friesland and Groningen. Here is how a fixed contract with us compares, including where we are not the cheapest.",
  pros: {
    title: "Where we are strong",
    items: [
      "Every kWh from Dutch wind and sun, traced per park",
      "No feed-in fee if you have solar panels",
      "Leave any time without a cancellation fee",
      "Phone support until 21:00, also on Saturday",
    ],
  },
  cons: {
    title: "Where we are not",
    items: [
      "Dynamic prices are cheaper at night, if you can shift",
      "No gas: we only supply electricity",
      "No welcome bonus or referral discount",
    ],
  },
  columns: [
    {
      name: "Polderstroom",
      note: "1-year fixed",
      action: { label: "Calculate your price", href: "#calculate" },
      featured: true,
    },
    { name: "The big three", note: "1-year fixed, average" },
    { name: "Dynamic-price apps", note: "Hourly market price" },
  ],
  rows: [
    { label: "Price per kWh", note: "Incl. energy tax and VAT", values: ["€0.312", "€0.334", "€0.19 to €0.44"] },
    { label: "Fixed costs a month", values: ["€6.50", "€8.99 to €11.99", "€5.99"] },
    { label: "Power from Dutch wind and sun", values: [true, "38% on average", false] },
    { label: "Price fixed for the contract", values: [true, true, false] },
    { label: "Feed-in fee for solar panels", note: "At 2,000 kWh returned a year", values: ["None", "€14 a month", "€0.11 per kWh"] },
    { label: "Leave without a fee", values: [true, false, true] },
    { label: "Support by phone", values: ["Mon–Sat until 21:00", "Weekdays until 17:00", false] },
  ],
  caption: "Polderstroom compared with the three largest Dutch suppliers and with dynamic-price apps",
  note: "Averages for a home using 2,900 kWh a year, network costs not included. The big three are the three suppliers with the most Dutch households; dynamic prices are the range of November 2026.",
  updated: "Updated 20 November 2026",
}

function Value({ v }: { v: Cell }) {
  if (v === true) {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-foreground text-background">
        <Check className="size-4" strokeWidth={2.5} aria-hidden />
        <span className="sr-only">Yes</span>
      </span>
    )
  }
  if (v === false) {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Minus className="size-4" aria-hidden />
        <span className="sr-only">No</span>
      </span>
    )
  }
  return <span className="text-[16px] leading-[1.3] font-medium tabular-nums">{v}</span>
}

export function ComparisonTable(props: Partial<ComparisonTableProps>) {
  const c = { ...comparisonTableDefaults, ...props }

  return (
    <section aria-labelledby="comparison-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
            <h2
              id="comparison-title"
              className="mt-4 text-4xl leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.024em]"
            >
              {c.title}
            </h2>
          </div>
          <p className="max-w-[56ch] text-lg leading-[1.5] text-pretty text-muted-foreground">{c.body}</p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-3xl border border-border md:grid-cols-2 lg:mt-14">
          {[
            { block: c.pros, good: true },
            { block: c.cons, good: false },
          ].map(({ block, good }) => (
            <div
              key={block.title}
              className={cn("p-7 lg:p-9", good ? "bg-muted/40" : "border-t border-border md:border-t-0 md:border-l")}
            >
              <h3 className="text-[20px] leading-[1.25] font-semibold">{block.title}</h3>
              <ul className="mt-5 grid gap-3.5">
                {block.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[16px] leading-[1.45]">
                    <span
                      className={cn(
                        "mt-px inline-flex size-[22px] shrink-0 items-center justify-center rounded-full",
                        good ? "bg-foreground text-background" : "border border-border text-muted-foreground",
                      )}
                    >
                      {good ? (
                        <Check className="size-3.5" strokeWidth={2.75} aria-hidden />
                      ) : (
                        <X className="size-3.5" strokeWidth={2.5} aria-hidden />
                      )}
                    </span>
                    <span className={good ? "" : "text-muted-foreground"}>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-border">
          <Table className="min-w-[720px] table-fixed text-[15px]">
            <caption className="sr-only">{c.caption}</caption>
            <colgroup>
              <col className="w-[168px] sm:w-[31%]" />
              {c.columns.map((col) => (
                <col key={col.name} />
              ))}
            </colgroup>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="sticky left-0 z-10 h-auto bg-background px-5 py-6 align-bottom text-[13px] sm:static sm:px-6 font-medium tracking-[0.08em] whitespace-normal text-muted-foreground uppercase lg:px-8">
                  {c.updated}
                </TableHead>
                {c.columns.map((col) => (
                  <TableHead
                    key={col.name}
                    scope="col"
                    className={cn(
                      "h-auto px-6 py-6 align-bottom whitespace-normal text-foreground",
                      col.featured && "bg-muted/60",
                    )}
                  >
                    <span className="block text-[20px] leading-[1.25] font-semibold">{col.name}</span>
                    <span className="mt-1 block text-[14px] leading-[1.3] font-normal text-muted-foreground">{col.note}</span>
                    {col.action ? (
                      <a
                        href={col.action.href}
                        className={cn(buttonVariants({ size: "lg" }), "mt-4 h-10 px-4 text-[14px]")}
                      >
                        {col.action.label}
                        <ArrowRight data-icon="inline-end" aria-hidden />
                      </a>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {c.rows.map((row) => (
                <TableRow key={row.label} className="border-border hover:bg-transparent">
                  <TableHead scope="row" className="sticky left-0 z-10 h-auto bg-background px-5 py-5 align-middle shadow-[1px_0_0_var(--border)] sm:static sm:px-6 sm:shadow-none whitespace-normal text-foreground lg:px-8">
                    <span className="block text-[16px] leading-[1.3] font-semibold">{row.label}</span>
                    {row.note ? (
                      <span className="mt-1 block text-[14px] leading-[1.3] font-normal text-muted-foreground">{row.note}</span>
                    ) : null}
                  </TableHead>
                  {c.columns.map((col, i) => (
                    <TableCell
                      key={col.name}
                      className={cn("px-6 py-5 whitespace-normal", col.featured ? "bg-muted/60" : "text-muted-foreground")}
                    >
                      <Value v={row.values[i] ?? false} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mt-6 max-w-[90ch] text-[14px] leading-[1.5] text-muted-foreground">{c.note}</p>
      </div>
    </section>
  )
}
