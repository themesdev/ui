"use client"

import * as React from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const controls = (bar: Element) => [...bar.querySelectorAll<HTMLButtonElement>("button")].filter((b) => !b.disabled)

/** Roving tabindex over the buttons inside: one Tab stop, Left/Right wrap, Home and End. */
function useRoving(ref: React.RefObject<HTMLDivElement | null>) {
  React.useEffect(() => {
    const bar = ref.current
    if (!bar) return
    const sync = () => {
      const list = controls(bar)
      if (list.length && !list.some((b) => b.tabIndex === 0)) list.forEach((b, k) => (b.tabIndex = k === 0 ? 0 : -1))
    }
    sync()
    const mo = new MutationObserver(sync)
    mo.observe(bar, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [ref])
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const list = controls(e.currentTarget)
    const i = list.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    const next = e.key === "ArrowRight" ? list[(i + 1) % list.length] : e.key === "ArrowLeft" ? list[(i - 1 + list.length) % list.length] : e.key === "Home" ? list[0] : e.key === "End" ? list.at(-1) : undefined
    if (!next) return
    e.preventDefault()
    for (const x of list) x.tabIndex = x === next ? 0 : -1
    next.focus()
  }
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const b = (e.target as Element).closest<HTMLButtonElement>("button")
    if (!b) return
    for (const x of controls(e.currentTarget)) x.tabIndex = x === b ? 0 : -1
  }
  return { onKeyDown, onClick }
}

export type ToolbarProps = {
  /** The toolbar's name, e.g. "Text formatting". */
  label: string
  children: React.ReactNode
  className?: string
}

/** A row of controls that is one Tab stop; arrow keys, Home and End move between them. */
export function Toolbar({ label, children, className }: ToolbarProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const handlers = useRoving(ref)
  return (
    <div ref={ref} role="toolbar" aria-label={label} className={cn("flex w-fit items-center gap-1 rounded-lg border bg-background p-1", className)} {...handlers}>
      {children}
    </div>
  )
}

export function ToolbarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div role="group" className={cn("flex items-center gap-1", className)} {...props} />
}

export function ToolbarSeparator() {
  return <Separator orientation="vertical" className="mx-1 h-5" />
}

/** A plain toolbar button. */
export function ToolbarButton({ className, variant = "ghost", size = "sm", ...props }: React.ComponentProps<typeof Button>) {
  return <Button type="button" variant={variant} size={size} className={cn("h-8 px-2.5 text-sm", className)} {...props} />
}

export type ToolbarToggleProps = Omit<React.ComponentProps<typeof Button>, "onChange"> & {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

/** A toggle button (aria-pressed) for a toolbar. */
export function ToolbarToggle({ pressed, defaultPressed = false, onPressedChange, className, onClick, ...props }: ToolbarToggleProps) {
  const [own, setOwn] = React.useState(defaultPressed)
  const on = pressed ?? own
  return (
    <ToolbarButton
      aria-pressed={on}
      className={cn("aria-pressed:bg-muted aria-pressed:text-foreground", className)}
      onClick={(e) => {
        onClick?.(e)
        setOwn(!on)
        onPressedChange?.(!on)
      }}
      {...props}
    />
  )
}

export type ToolbarFeedbackProps = {
  /** The question, e.g. "Was this page helpful?" */
  label?: string
  yes?: string
  no?: string
  thanks?: string
  onAnswer?: (answer: "yes" | "no") => void
  className?: string
}

/** "Was this helpful?": one press records the answer, thanks the reader in a status line and turns the other button off. */
export function ToolbarFeedback({ label = "Was this page helpful?", yes = "Yes", no = "No", thanks = "Thanks, noted.", onAnswer, className }: ToolbarFeedbackProps) {
  const [answer, setAnswer] = React.useState<"yes" | "no">()
  const ref = React.useRef<HTMLDivElement>(null)
  const handlers = useRoving(ref)
  const pick = (a: "yes" | "no") => {
    setAnswer(a)
    onAnswer?.(a)
  }
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <span aria-hidden="true" className="text-sm font-medium">
        {label}
      </span>
      <div ref={ref} role="toolbar" aria-label={label} className="flex items-center gap-2" {...handlers}>
        <Button type="button" variant="outline" aria-pressed={answer === "yes"} disabled={answer === "no"} onClick={() => pick("yes")} className="h-9 aria-pressed:bg-muted">
          <ThumbsUp aria-hidden="true" />
          {yes}
        </Button>
        <Button type="button" variant="outline" aria-pressed={answer === "no"} disabled={answer === "yes"} onClick={() => pick("no")} className="h-9 aria-pressed:bg-muted">
          <ThumbsDown aria-hidden="true" />
          {no}
        </Button>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {answer ? thanks : ""}
      </p>
    </div>
  )
}
