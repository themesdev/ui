"use client"

import { useRef, type CSSProperties, type KeyboardEvent } from "react"
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Language = {
  /** BCP 47 code, e.g. "nl" or "pt-BR": the link's lang and hreflang. */
  code: string
  /** The language's name in that language, e.g. "Nederlands". */
  name: string
  /** The same page in that language. */
  href: string
}

export interface LanguageSwitcherProps {
  /** Unique on the page: the list's id. */
  id: string
  /** What is switched, read before the current value: "Language" or "Region". */
  label?: string
  languages: Language[]
  /** The code of the page's language. */
  current: string
  /** Line the list up with the trigger's start or end. */
  align?: "start" | "end"
  variant?: "default" | "outline" | "secondary" | "ghost"
  className?: string
}

const anchored = () => typeof CSS !== "undefined" && CSS.supports("anchor-name: --a")

/** The page's other languages as links (lang, hreflang, the current one marked) behind one button, on the native
 *  popover. Opening focuses the current language; arrows move, Tab moves on and closes, Escape closes and returns
 *  focus to the button. */
export function LanguageSwitcher({ id, label = "Language", languages, current, align = "start", variant = "outline", className }: LanguageSwitcherProps) {
  const now = languages.find((l) => l.code === current) ?? languages[0]
  const trigger = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLElement>(null)
  const links = () => [...(list.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])]

  const onToggle = (e: React.SyntheticEvent<HTMLElement>) => {
    const open = (e.nativeEvent as ToggleEvent).newState === "open"
    const t = trigger.current
    const el = list.current
    if (!t || !el) return
    t.setAttribute("aria-expanded", String(open))
    if (open) {
      // Without CSS anchor positioning: under the button, flipped up when there is no room below.
      if (!anchored()) {
        const b = t.getBoundingClientRect()
        const m = el.getBoundingClientRect()
        const below = b.bottom + 4 + m.height <= innerHeight || b.top < m.height
        el.style.position = "fixed"
        el.style.top = `${below ? b.bottom + 4 : b.top - 4 - m.height}px`
        el.style.left = `${Math.max(8, Math.min(align === "end" ? b.right - m.width : b.left, innerWidth - m.width - 8))}px`
      }
      const all = links()
      ;(all.find((a) => a.getAttribute("aria-current") === "true") ?? all[0])?.focus()
    } else if (el.contains(document.activeElement) || document.activeElement === document.body) t.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const all = links()
    const i = all.indexOf(e.target as HTMLAnchorElement)
    let next: HTMLElement | undefined
    if (e.key === "ArrowDown") next = all[(i + 1) % all.length]
    else if (e.key === "ArrowUp") next = all[(i - 1 + all.length) % all.length]
    else if (e.key === "Home") next = all[0]
    else if (e.key === "End") next = all.at(-1)
    if (next) {
      e.preventDefault()
      next.focus()
    }
  }

  // Tab past the first or last link: the list closes and focus goes where Tab took it.
  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    const to = e.relatedTarget as Node | null
    if (!to || list.current?.contains(to) || to === trigger.current) return
    if (list.current?.matches(":popover-open")) list.current.hidePopover()
  }

  const anchor = `--${id.replace(/[^a-zA-Z0-9_-]/g, "")}`
  return (
    <div className={cn("inline-block", className)}>
      <button
        ref={trigger}
        type="button"
        popoverTarget={id}
        aria-expanded="false"
        className={cn(buttonVariants({ variant, size: "lg" }), "group/lang")}
        style={{ anchorName: anchor } as CSSProperties}
      >
        <GlobeIcon className="text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">{label}: </span>
        <span lang={now.code}>{now.name}</span>
        <ChevronDownIcon className="size-3.5 text-muted-foreground transition-transform duration-150 group-aria-expanded/lang:rotate-180" aria-hidden="true" />
      </button>
      <nav
        ref={list}
        id={id}
        popover="auto"
        aria-label={label}
        data-align={align}
        onToggle={onToggle}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        style={{ positionAnchor: anchor } as CSSProperties}
        className="m-0 min-w-52 rounded-lg border bg-popover p-1 text-popover-foreground opacity-0 shadow-md ring-1 ring-foreground/5 transition-[opacity,display,overlay] transition-discrete duration-100 [inset:auto] open:opacity-100 starting:open:opacity-0 supports-[anchor-name:--a]:mt-1 supports-[anchor-name:--a]:[left:anchor(left)] supports-[anchor-name:--a]:[position-try-fallbacks:flip-block,flip-inline] supports-[anchor-name:--a]:[top:anchor(bottom)] supports-[anchor-name:--a]:data-[align=end]:[left:auto] supports-[anchor-name:--a]:data-[align=end]:[right:anchor(right)]"
      >
        <ul role="list" className="grid">
          {languages.map((l) => (
            <li key={l.code}>
              <a
                href={l.href}
                lang={l.code}
                hrefLang={l.code}
                aria-current={l.code === now.code ? "true" : undefined}
                className="group flex h-9 w-full items-center gap-2 rounded-md px-2 text-sm whitespace-nowrap outline-none select-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 aria-[current=true]:font-medium"
              >
                <CheckIcon className="invisible size-4 group-aria-[current=true]:visible" aria-hidden="true" />
                {l.name}
                <span aria-hidden="true" className="ml-auto pl-4 text-xs font-normal text-muted-foreground uppercase tabular-nums">
                  {l.code}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
