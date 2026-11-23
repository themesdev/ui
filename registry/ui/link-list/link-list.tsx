import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type LinkItem = { title: string; href: string; description?: string }

export type LinkListProps = {
  items: LinkItem[]
  /** Names the list for screen readers when there is no heading right above it. */
  label?: string
  className?: string
}

/** Links as rows with a chevron; the whole row is the target. */
export function LinkList({ items, label, className }: LinkListProps) {
  return (
    <ul aria-label={label} className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((it) => (
        <li key={it.href + it.title}>
          <a
            href={it.href}
            className="group/row flex items-center gap-4 px-3 py-4 outline-none transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-base font-medium leading-[1.25] text-foreground">{it.title}</span>
              {it.description && <span className="text-sm leading-normal text-muted-foreground">{it.description}</span>}
            </span>
            <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/row:translate-x-0.5 group-hover/row:text-foreground" />
          </a>
        </li>
      ))}
    </ul>
  )
}
