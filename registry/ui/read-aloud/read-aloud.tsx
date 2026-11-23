"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ReadAloudProps = {
  /** CSS selector of the element whose text is read, e.g. "#article". */
  from: string
  /** BCP 47 language of the text; defaults to the nearest lang attribute. */
  lang?: string
  /** Speech rate from 0.5 to 2. */
  rate?: number
  /** The idle label, e.g. "Listen". Pause and Resume replace it while it reads. */
  label?: string
  /** Estimated listening time shown after the label, e.g. "4 min". */
  duration?: string
  variant?: "default" | "outline" | "secondary" | "ghost"
  className?: string
}

type State = "idle" | "speaking" | "paused"

/** The text of an element as sentences grouped into chunks of about 200 characters (long utterances stall in some browsers). */
function chunks(el: Element) {
  const blocks = el.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption")
  const text = (blocks.length ? [...blocks].map((b) => b.textContent ?? "") : [el.textContent ?? ""])
    .map((t) => t.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((t) => (/[.!?:]$/.test(t) ? t : `${t}.`))
    .join(" ")
  const sentences = text.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? []
  const out: string[] = []
  for (const s of sentences) {
    if (out.length && out[out.length - 1].length + s.length < 200) out[out.length - 1] += s
    else out.push(s)
  }
  return out.map((c) => c.trim()).filter(Boolean)
}

// One reader speaks at a time: starting one stops the other.
let stopActive: (() => void) | null = null

/** Reads an element's text aloud with the browser's speech synthesis: play, pause, resume and stop. */
export function ReadAloud({ from, lang, rate = 1, label = "Listen", duration, variant = "outline", className }: ReadAloudProps) {
  const [state, setState] = useState<State>("idle")
  const [supported, setSupported] = useState(true)
  const [width, setWidth] = useState<number>()
  const run = useRef(0)
  const toggle = useRef<HTMLButtonElement>(null)
  const stopBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined")
  }, [])

  const stop = () => {
    run.current++
    window.speechSynthesis?.cancel()
    if (stopActive === stop) stopActive = null
    const hadFocus = stopBtn.current?.contains(document.activeElement)
    setState("idle")
    setWidth(undefined)
    // Stop hides itself: keep focus on the reader instead of losing it to the page.
    if (hadFocus) toggle.current?.focus()
  }

  useEffect(() => () => {
    if (stopActive === stop) {
      run.current++
      window.speechSynthesis?.cancel()
      stopActive = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const leave = () => window.speechSynthesis?.cancel()
    window.addEventListener("pagehide", leave)
    return () => window.removeEventListener("pagehide", leave)
  }, [])

  const start = () => {
    const source = document.querySelector(from)
    const parts = source ? chunks(source) : []
    if (!parts.length) return
    stopActive?.()
    const synth = window.speechSynthesis
    synth.cancel()
    const id = ++run.current
    const language = lang || source?.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang
    const r = Math.min(2, Math.max(0.5, rate))
    const say = (i: number) => {
      if (id !== run.current) return
      if (i >= parts.length) {
        stop()
        return
      }
      const u = new SpeechSynthesisUtterance(parts[i])
      if (language) u.lang = language
      u.rate = r
      u.onend = () => say(i + 1)
      u.onerror = (e) => {
        if (e.error !== "canceled" && e.error !== "interrupted" && id === run.current) stop()
      }
      synth.speak(u)
    }
    // "Pause" is shorter than "Listen 4 min": hold the button at its idle width while it reads.
    setWidth(toggle.current?.getBoundingClientRect().width)
    stopActive = stop
    setState("speaking")
    say(0)
  }

  const onToggle = () => {
    const synth = window.speechSynthesis
    if (state === "idle") start()
    else if (state === "speaking") {
      synth.pause()
      setState("paused")
    } else {
      synth.resume()
      setState("speaking")
    }
  }

  const text = !supported ? "Not available in this browser" : state === "idle" ? label : state === "speaking" ? "Pause" : "Resume"
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <Button ref={toggle} type="button" variant={variant} size="lg" disabled={!supported} onClick={onToggle} style={{ minWidth: width }} className="h-9 px-3.5">
        {state === "speaking" ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        <span>{text}</span>
        {duration && state === "idle" && supported && (
          <span className="font-normal text-muted-foreground"><span className="sr-only">, </span>{duration}</span>
        )}
      </Button>
      {state !== "idle" && (
        <Button ref={stopBtn} type="button" variant="ghost" size="icon-lg" onClick={stop}>
          <Square aria-hidden="true" />
          <span className="sr-only">Stop reading</span>
        </Button>
      )}
    </div>
  )
}
