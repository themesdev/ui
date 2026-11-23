"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Badge, badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type TagProps = {
  label: string
  /** Makes the tag a link (a topic). */
  href?: string
  /** Shows a remove button named "Remove <label>". Focus moves to the next tag's remove button, else the previous one. */
  onRemove?: () => void
  className?: string
}

const size = "h-7 gap-1 px-3 text-sm font-normal"

/** A tag: static, a link, or removable. Put each tag in an <li> of a <TagList>. */
export function Tag({ label, href, onRemove, className }: TagProps) {
  if (href)
    return (
      <a href={href} className={cn(badgeVariants({ variant: "secondary" }), size, "hover:bg-secondary/70", className)}>
        {label}
      </a>
    )
  return (
    <Badge variant="secondary" className={cn(size, onRemove && "pr-1", className)}>
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          className="-my-1 grid size-6 place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          onClick={(e) => {
            const item = e.currentTarget.closest("li")
            const sel = "button[aria-label^='Remove '], a"
            const next = (item?.nextElementSibling ?? item?.previousElementSibling)?.querySelector<HTMLElement>(sel)
            onRemove()
            // After React has removed the tag.
            setTimeout(() => next?.focus(), 0)
          }}
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>
      )}
    </Badge>
  )
}

export type TagListProps = { label: string; children: React.ReactNode; className?: string }

/** A list of tags: wraps `<li>` items, named for screen readers. */
export function TagList({ label, children, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {React.Children.toArray(children).map((c, i) => (
        <li key={React.isValidElement(c) && c.key != null ? c.key : i}>{c}</li>
      ))}
    </ul>
  )
}
