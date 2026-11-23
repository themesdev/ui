"use client"

import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CodeBlockProps {
  code: string
  /** Shown in the bar and names the scroll box, e.g. "astro.config.mjs" or "Terminal". */
  filename: string
  /** Unique on the page: ties the filename to the scroll box. */
  id: string
  className?: string
}

/** Code with a filename bar and a Copy button, in a focusable scroll box. */
export function CodeBlock({ code, filename, id, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <figure className={cn("w-full overflow-hidden rounded-xl border bg-card text-card-foreground", className)}>
      <figcaption id={`${id}-name`} className="flex h-11 items-center justify-between gap-3 border-b bg-muted/40 pr-2 pl-4 font-mono text-[13px] text-muted-foreground">
        {filename}
        <span role="status" className="sr-only">
          {copied ? "Copied to the clipboard" : ""}
        </span>
        <Button type="button" variant="ghost" size="sm" className="h-8 px-2.5 text-[13px]" onClick={copy}>
          {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </figcaption>
      <pre
        tabIndex={0}
        aria-labelledby={`${id}-name`}
        className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.6] outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
      >
        <code>{code}</code>
      </pre>
    </figure>
  )
}
