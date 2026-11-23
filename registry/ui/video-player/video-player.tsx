"use client"

import * as React from "react"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type VideoPlayerProps = {
  src: string
  poster: string
  title: string
  /** e.g. "0:06" */
  duration?: string
  /** A WebVTT captions file. */
  captions?: string
  className?: string
}

/** A poster with one Play button; pressing it plays the video with native controls and captions. Nothing plays by itself. */
export function VideoPlayer({ src, poster, title, duration, captions, className }: VideoPlayerProps) {
  const video = React.useRef<HTMLVideoElement>(null)
  const [started, setStarted] = React.useState(false)
  return (
    <figure className={cn("w-full", className)}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10">
        <video ref={video} src={src} poster={poster} preload="none" playsInline controls={started} tabIndex={started ? 0 : -1} aria-label={title} className="size-full object-cover">
          {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
        </video>
        {!started && (
          <Button
            type="button"
            variant="ghost"
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full rounded-xl bg-black/15 hover:bg-black/25 active:bg-black/35"
            onClick={() => {
              setStarted(true)
              const v = video.current
              if (!v) return
              v.focus()
              void v.play().catch(() => {})
            }}
          >
            <span className="grid size-16 place-items-center rounded-full bg-background text-foreground shadow-lg transition-transform group-hover:scale-105 group-active:scale-95 motion-reduce:transition-none">
              <Play aria-hidden="true" className="size-6 translate-x-px fill-current" />
            </span>
          </Button>
        )}
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
        <span className="font-medium">{title}</span>
        {duration && <span className="text-muted-foreground tabular-nums">{duration}</span>}
      </figcaption>
    </figure>
  )
}
