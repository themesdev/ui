"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRightIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface AnnouncementProps {
  /** Unique on the page: the key the closed state is remembered under. */
  id: string
  text: string
  link?: { label: string; href: string }
  /** Keep it closed for the rest of the session once closed. */
  remember?: boolean
  className?: string
}

/** One line at the top of the site, a read-more link, and a close button that can remember its choice. */
export function Announcement({ id, text, link, remember, className }: AnnouncementProps) {
  const [closed, setClosed] = useState(false)
  const bar = useRef<HTMLElement>(null)
  const key = `announcement:${id}`

  useEffect(() => {
    if (!remember) return
    try {
      if (sessionStorage.getItem(key) === "closed") setClosed(true)
    } catch {
      /* storage blocked: the bar simply shows */
    }
  }, [remember, key])

  if (closed) return null

  const close = () => {
    setClosed(true)
    if (remember) {
      try {
        sessionStorage.setItem(key, "closed")
      } catch {
        /* ignore */
      }
    }
    // The button is gone: move focus to the page's main landmark so it is not lost.
    const main = document.querySelector<HTMLElement>("main")
    if (main) {
      if (!main.hasAttribute("tabindex")) main.tabIndex = -1
      main.focus({ preventScroll: true })
    }
  }

  return (
    <aside
      ref={bar}
      id={id}
      aria-label="Announcement"
      className={cn("relative flex items-center justify-center gap-3 border-b bg-muted px-12 py-2.5 text-sm", className)}
    >
      <p className="text-center leading-[1.25] text-foreground">
        {text}
        {link && (
          <>
            {" "}
            <a
              href={link.href}
              className="inline-flex items-center gap-1 rounded-sm font-medium underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {link.label}
              <ArrowRightIcon className="size-3.5" aria-hidden="true" />
            </a>
          </>
        )}
      </p>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Close the announcement"
        className="absolute top-1/2 right-2 -translate-y-1/2"
        onClick={close}
      >
        <XIcon aria-hidden="true" />
      </Button>
    </aside>
  )
}
