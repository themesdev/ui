"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export type SidebarLink = { label: string; href: string }
export type SidebarGroup = {
  title: string
  links: SidebarLink[]
  /** Folds the group behind its title. */
  collapsible?: boolean
  /** A collapsible group starts open (default true). A group holding the current page always starts open. */
  open?: boolean
}

export type SidebarNavProps = {
  groups: SidebarGroup[]
  /** The page you are on: its link gets aria-current="page". */
  currentPath?: string
  label?: string
  className?: string
}

const linkClass =
  "block rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"

function Links({ links, currentPath }: { links: SidebarLink[]; currentPath?: string }) {
  return (
    <ul className="grid gap-0.5">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} aria-current={l.href === currentPath ? "page" : undefined} className={linkClass}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function FoldingGroup({ group, currentPath }: { group: SidebarGroup; currentPath?: string }) {
  const holdsCurrent = group.links.some((l) => l.href === currentPath)
  const [open, setOpen] = React.useState(holdsCurrent || (group.open ?? true))
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm font-semibold outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
        {group.title}
        <ChevronRight aria-hidden="true" className={cn("size-4 text-muted-foreground transition-transform motion-reduce:transition-none", open && "rotate-90")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1">
        <Links links={group.links} currentPath={currentPath} />
      </CollapsibleContent>
    </Collapsible>
  )
}

/** A docs sidebar: groups of links, the current page marked, groups that fold. */
export function SidebarNav({ groups, currentPath, label = "Docs", className }: SidebarNavProps) {
  return (
    <nav aria-label={label} className={cn("grid gap-5 text-sm", className)}>
      {groups.map((g) =>
        g.collapsible ? (
          <FoldingGroup key={g.title} group={g} currentPath={currentPath} />
        ) : (
          <div key={g.title}>
            <p className="px-2.5 pb-1.5 text-sm font-semibold">{g.title}</p>
            <Links links={g.links} currentPath={currentPath} />
          </div>
        )
      )}
    </nav>
  )
}
