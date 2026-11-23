import type { AnchorHTMLAttributes } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  /** inline: underlined in running text. standalone: its own line with an arrow. external: leaves the site, arrow out. */
  variant?: "inline" | "standalone" | "external"
  /** Opens in a new tab and says so to screen readers. */
  newTab?: boolean
}

const base =
  "rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
const styles = {
  inline: "font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground",
  standalone: "group/link inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline",
  external: "group/link inline-flex items-center gap-1 font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground",
}

/** A link: inline in text, standalone with an arrow, or external with an arrow out. */
export function Link({ variant = "inline", href, newTab, className, children, ...props }: LinkProps) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener" : undefined}
      className={cn(base, styles[variant], className)}
      {...props}
    >
      {children}
      {variant === "standalone" && (
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/link:translate-x-0.5" />
      )}
      {variant === "external" && (
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px" />
      )}
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
