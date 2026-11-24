"use client"

import { isValidElement, useEffect, useId, useRef, useState, type ReactElement } from "react"
import { ChevronRight, Magnet, Menu, Search, X, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type LinkRef = { label: string; href: string }
export type TabLink = LinkRef & { badge?: string }

export type HeaderBarProps = {
  brand: LinkRef
  /** The icon in the square before the wordmark: a lucide icon, or an element (`<Magnet />`) when a server page passes
   *  it, since a component can't be passed from a server page into this client block. */
  mark: LucideIcon | ReactElement
  links: TabLink[]
  /** The href of the section you are in; that tab gets aria-current. */
  current: string
  secondary: LinkRef
  search: LinkRef & { keys: string }
  action: LinkRef
}

export const headerBarDefaults: HeaderBarProps = {
  brand: { label: "Ferrite", href: "#" },
  mark: Magnet,
  links: [
    { label: "Documentation", href: "#docs" },
    { label: "API reference", href: "#api" },
    { label: "Changelog", href: "#changelog", badge: "v2.4" },
  ],
  current: "#docs",
  secondary: { label: "Blog", href: "#blog" },
  search: { label: "Search the docs", href: "#search", keys: "⌘K" },
  action: { label: "Console", href: "#console" },
}

export function HeaderBar(props: Partial<HeaderBarProps>) {
  const c = { ...headerBarDefaults, ...props }
  const Mark = c.mark
  const id = useId()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      toggle.current?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const ring = "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"

  return (
    <header className="@container relative z-30 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-5 @2xl:grid @2xl:grid-cols-[1fr_auto_1fr] @2xl:px-6">
        <a href={c.brand.href} className={cn("flex w-fit items-center gap-2 rounded-md", ring)}>
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            {isValidElement(Mark) ? Mark : <Mark className="size-4" strokeWidth={2.5} aria-hidden />}
          </span>
          <span className="text-[19px] leading-none font-semibold tracking-[-0.02em]">{c.brand.label}</span>
        </a>

        <nav aria-label="Sections" className="hidden @2xl:block">
          <ul className="flex items-center gap-1">
            {c.links.map((l) => {
              const on = l.href === c.current
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "flex h-9 items-center gap-2 rounded-full px-3.5 text-[15px] font-medium text-muted-foreground hover:text-foreground",
                      on && "bg-muted text-foreground",
                      ring
                    )}
                  >
                    {l.label}
                    {l.badge ? (
                      <Badge variant="outline" className="h-5 px-1.5 text-[11px] font-medium tabular-nums">
                        {l.badge}
                      </Badge>
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center justify-end gap-1.5">
          <a href={c.search.href} className={cn("hidden h-9 items-center gap-2 rounded-full px-3 text-[15px] text-muted-foreground hover:text-foreground @5xl:flex", ring)}>
            <Search className="size-4" aria-hidden />
            <span className="sr-only">{c.search.label}</span>
            <kbd className="rounded border border-border px-1.5 text-[12px] leading-5 font-medium">{c.search.keys}</kbd>
          </a>
          <a href={c.secondary.href} className={cn("hidden h-9 items-center rounded-full px-3 text-[15px] font-medium hover:bg-muted @4xl:flex", ring)}>
            {c.secondary.label}
          </a>
          <a href={c.action.href} className={cn(buttonVariants(), "hidden h-9 gap-1 rounded-full pr-2.5 pl-4 text-[15px] @2xl:inline-flex")}>
            {c.action.label}
            <ChevronRight className="size-4" aria-hidden />
          </a>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls={`${id}-menu`}
            onClick={() => setOpen((o) => !o)}
            className={cn(buttonVariants({ variant: "outline" }), "h-10 gap-2 rounded-full px-3.5 text-[15px] @2xl:hidden")}
          >
            {open ? <X className="size-[18px]" aria-hidden /> : <Menu className="size-[18px]" aria-hidden />}
            Menu
          </button>
        </div>
      </div>

      {open ? (
        <div id={`${id}-menu`} className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg @2xl:hidden">
          <nav aria-label="Sections (menu)" className="px-5 pt-3 pb-6">
            <ul>
              {[...c.links, c.secondary].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={l.href === c.current ? "page" : undefined}
                    className="flex h-12 items-center justify-between border-b border-border text-[17px] font-medium aria-[current=page]:font-semibold"
                  >
                    {l.label}
                    {l.href === c.current ? <span className="size-2 rounded-full bg-foreground" aria-hidden /> : null}
                  </a>
                </li>
              ))}
              <li>
                <a href={c.search.href} className="flex h-12 items-center gap-2 border-b border-border text-[17px] font-medium">
                  <Search className="size-[18px]" aria-hidden />
                  {c.search.label}
                </a>
              </li>
            </ul>
            <a href={c.action.href} className={cn(buttonVariants({ size: "lg" }), "mt-5 h-11 w-full rounded-full text-[15px]")}>
              {c.action.label}
              <ChevronRight className="size-4" aria-hidden />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
