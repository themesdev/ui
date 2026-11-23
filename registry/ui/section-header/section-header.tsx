import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type SectionHeaderProps = {
  title: string
  /** A few words above the heading, e.g. "Pricing". */
  kicker?: string
  description?: string
  align?: "start" | "center"
  id?: string
  as?: "h1" | "h2" | "h3"
  className?: string
  /** An optional action (a Button or a link) at the end. */
  children?: ReactNode
}

/** The head of a page section: kicker, heading, a line or two, and an optional action. */
export function SectionHeader({ title, kicker, description, align = "start", id, as: Heading = "h2", className, children }: SectionHeaderProps) {
  const center = align === "center"
  return (
    <header className={cn("flex gap-6", center ? "flex-col items-center text-center" : "flex-col sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className={cn("flex flex-col gap-3", !center && "max-w-[40rem]")}>
        {kicker && <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">{kicker}</p>}
        <Heading id={id} className="text-balance text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.018em] sm:text-4xl">
          {title}
        </Heading>
        {description && <p className={cn("max-w-[60ch] text-base leading-[1.5] text-muted-foreground", center && "mx-auto")}>{description}</p>}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </header>
  )
}
