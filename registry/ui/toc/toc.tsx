"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TocEntry = { label: string; href: string; level?: 2 | 3 }

export type TocProps = {
  entries: TocEntry[]
  /** The visible heading and the nav's name. */
  label?: string
  /** Pixels a heading must pass the top of the screen to count as read: a sticky header's height, plus a little. */
  offset?: number
  className?: string
}

/** "On this page": the sections as links, the one you are reading marked (aria-current="true") while you scroll. */
export function Toc({ entries, label = "On this page", offset = 96, className }: TocProps) {
  const [current, setCurrent] = React.useState<string>()
  React.useEffect(() => {
    let queued = false
    const update = () => {
      queued = false
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let found: string | undefined
      for (const e of entries) {
        const target = document.getElementById(decodeURIComponent(e.href.replace(/^#/, "")))
        if (!target) continue
        const top = target.getBoundingClientRect().top
        if (top - offset <= 1 || (atEnd && top < window.innerHeight)) found = e.href
      }
      setCurrent(found)
    }
    const schedule = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(update)
    }
    schedule()
    addEventListener("scroll", schedule, { passive: true })
    addEventListener("resize", schedule)
    addEventListener("hashchange", schedule)
    return () => {
      removeEventListener("scroll", schedule)
      removeEventListener("resize", schedule)
      removeEventListener("hashchange", schedule)
    }
  }, [entries, offset])

  return (
    <nav aria-label={label} className={cn("text-sm", className)}>
      <p aria-hidden="true" className="mb-3 text-sm font-semibold">
        {label}
      </p>
      <ul className="grid border-l">
        {entries.map((e) => (
          <li key={e.href}>
            <a
              href={e.href}
              aria-current={e.href === current ? "true" : undefined}
              className={cn(
                "-ml-px block border-l border-transparent py-1.5 pr-2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=true]:border-foreground aria-[current=true]:font-medium aria-[current=true]:text-foreground",
                e.level === 3 ? "pl-7" : "pl-3"
              )}
            >
              {e.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
