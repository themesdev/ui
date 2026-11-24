"use client"

import { isValidElement, useEffect, useId, useState, type ReactElement } from "react"
import { Footprints, Heart, Menu, Search, ShoppingBag, X, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export type LinkRef = { label: string; href: string }
export type CountLink = LinkRef & { count?: number }

export type SiteHeaderProps = {
  brand: LinkRef
  /** The icon before the wordmark: a lucide icon, or an element (`<Ship />`) when a server page passes it, since a
   *  component can't be passed from a server page into this client block. */
  mark: LucideIcon | ReactElement
  promise: string
  utility: LinkRef[]
  nav: LinkRef[]
  /** The href of the page you are on; that link gets aria-current. */
  current: string
  search: { label: string; placeholder: string; action: string }
  saved: CountLink
  bag: CountLink
}

export const siteHeaderDefaults: SiteHeaderProps = {
  brand: { label: "Harrier", href: "#" },
  mark: Footprints,
  promise: "Free gait analysis in all four Utrecht and Amersfoort shops",
  utility: [
    { label: "Find a shop", href: "#shops" },
    { label: "Help", href: "#help" },
    { label: "Join the run club", href: "#club" },
    { label: "Sign in", href: "#sign-in" },
  ],
  nav: [
    { label: "New in", href: "#new" },
    { label: "Road", href: "#road" },
    { label: "Trail", href: "#trail" },
    { label: "Clothing", href: "#clothing" },
    { label: "Watches", href: "#watches" },
    { label: "Outlet", href: "#outlet" },
  ],
  current: "#trail",
  search: { label: "Search Harrier", placeholder: "Search shoes, sizes, brands", action: "#search" },
  saved: { label: "Saved items", href: "#saved", count: 3 },
  bag: { label: "Bag", href: "#bag", count: 2 },
}

export function SiteHeader(props: Partial<SiteHeaderProps>) {
  const c = { ...siteHeaderDefaults, ...props }
  const Mark = c.mark
  const id = useId()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const iconLink =
    "relative grid size-11 place-items-center rounded-full text-foreground outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
  const count = (n?: number) =>
    n ? (
      <span className="absolute top-1 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[11px] leading-none font-semibold text-primary-foreground tabular-nums">
        {n}
      </span>
    ) : null

  return (
    <header className="relative z-40 bg-background">
      <div className="hidden bg-muted/70 lg:block">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-10 text-[13px]">
          <p className="text-foreground/75">{c.promise}</p>
          <ul className="flex items-center">
            {c.utility.map((l, i) => (
              <li key={l.href} className="flex items-center">
                {i > 0 ? <span aria-hidden className="mx-3 h-3 w-px bg-border" /> : null}
                <a href={l.href} className="rounded-sm font-medium outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="mx-auto grid h-16 max-w-[1280px] grid-cols-[1fr_auto] items-center gap-6 px-6 lg:h-[72px] lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <a href={c.brand.href} className="flex w-fit items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            {isValidElement(Mark) ? Mark : <Mark className="size-6" strokeWidth={2.25} aria-hidden />}
            <span className="text-[22px] leading-none font-bold tracking-[-0.03em]">{c.brand.label}</span>
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {c.nav.map((l) => {
                const on = l.href === c.current
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={on ? "page" : undefined}
                      className={cn(
                        "flex h-11 items-center rounded-full px-4 text-[16px] font-semibold outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
                        on && "underline decoration-2 underline-offset-[10px]"
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-1">
            <form action={c.search.action} role="search" className="relative mr-2 hidden xl:block">
              <Label htmlFor={`${id}-q`} className="sr-only">
                {c.search.label}
              </Label>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                id={`${id}-q`}
                name="q"
                type="search"
                placeholder={c.search.placeholder}
                className="h-11 w-[248px] rounded-full border-transparent bg-muted pl-10 text-[15px] md:text-[15px] dark:bg-muted"
              />
            </form>
            <a href={c.search.action} className={cn(iconLink, "xl:hidden")}>
              <Search className="size-[22px]" aria-hidden />
              <span className="sr-only">{c.search.label}</span>
            </a>
            <a href={c.saved.href} className={cn(iconLink, "hidden sm:grid")}>
              <Heart className="size-[22px]" aria-hidden />
              {count(c.saved.count)}
              <span className="sr-only">
                {c.saved.label}
                {c.saved.count ? `, ${c.saved.count}` : ""}
              </span>
            </a>
            <a href={c.bag.href} className={iconLink}>
              <ShoppingBag className="size-[22px]" aria-hidden />
              {count(c.bag.count)}
              <span className="sr-only">
                {c.bag.label}
                {c.bag.count ? `, ${c.bag.count} items` : ""}
              </span>
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${id}-menu`}
              onClick={() => setOpen((o) => !o)}
              className={cn(iconLink, "lg:hidden")}
            >
              {open ? <X className="size-[22px]" aria-hidden /> : <Menu className="size-[22px]" aria-hidden />}
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div id={`${id}-menu`} className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg lg:hidden">
          <div className="px-6 pt-4 pb-8">
            <form action={c.search.action} role="search" className="relative">
              <Label htmlFor={`${id}-qm`} className="sr-only">
                {c.search.label}
              </Label>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                id={`${id}-qm`}
                name="q"
                type="search"
                placeholder={c.search.placeholder}
                className="h-12 rounded-full border-transparent bg-muted pl-10 text-[16px] dark:bg-muted"
              />
            </form>
            <nav aria-label="Main (mobile)" className="mt-4">
              <ul>
                {c.nav.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={l.href === c.current ? "page" : undefined}
                      className="flex h-14 items-center border-b border-border text-[22px] leading-[1.15] font-semibold tracking-[-0.01em] aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-1 text-[15px]">
              {c.utility.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="flex h-11 items-center font-medium">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <p className="text-[14px] leading-[1.5] text-muted-foreground">{c.promise}</p>
            <a href={c.saved.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-5 h-11 w-full rounded-full text-[15px] sm:hidden")}>
              <Heart className="size-4" aria-hidden />
              {c.saved.label}
              {c.saved.count ? ` (${c.saved.count})` : ""}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
