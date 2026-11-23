"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Source =
  | { value: string; from?: never; url?: never }
  | { from: string; value?: never; url?: never }
  | { url: string; value?: never; from?: never }

export type CopyButtonProps = Source & {
  /** The label, e.g. "Copy link". With size icon it is read out but not shown. */
  label?: string
  copiedLabel?: string
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
  className?: string
}

const fetchText = async (url: string) => {
  const target = new URL(url, location.href)
  if (target.origin !== location.origin) throw new Error("cross-origin copy url")
  const res = await fetch(target, { credentials: "same-origin" })
  if (!res.ok) throw new Error(String(res.status))
  return res.text()
}

/** Copies a value, the text of an element (`from`, a CSS selector) or a file from this site (`url`), then says
 *  "Copied" for a moment, announced to screen readers. */
export function CopyButton({ value, from, url, label = "Copy", copiedLabel = "Copied", variant = "outline", size = "default", className }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const iconOnly = size === "icon" || size === "icon-sm" || size === "icon-lg"

  const copy = async () => {
    let ok = true
    try {
      const text = url ? await fetchText(url) : from ? (document.querySelector(from)?.textContent ?? "").trim() : (value ?? "")
      await navigator.clipboard.writeText(text)
    } catch {
      ok = false
    }
    setState(ok ? "copied" : "failed")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState("idle"), 1800)
  }

  const shown = state === "copied" ? copiedLabel : state === "failed" ? "Couldn't copy" : label
  const Icon = state === "copied" ? CheckIcon : state === "failed" ? XIcon : CopyIcon
  return (
    <>
      <Button type="button" variant={variant} size={size} data-state={state === "idle" ? undefined : state} className={cn(className)} onClick={copy}>
        <Icon aria-hidden="true" />
        <span className={iconOnly ? "sr-only" : undefined}>{shown}</span>
      </Button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Copied to the clipboard" : state === "failed" ? "Couldn't copy to the clipboard" : ""}
      </span>
    </>
  )
}
