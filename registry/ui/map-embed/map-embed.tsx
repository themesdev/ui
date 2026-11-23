"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MapEmbedProps = {
  name: string
  address: string
  lat: number
  lon: number
  className?: string
}

const osmLink = (lat: number, lon: number) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`
const osmEmbed = (lat: number, lon: number) => {
  const d = 0.004
  const r = (n: number) => Math.round(n * 1e5) / 1e5
  return `https://www.openstreetmap.org/export/embed.html?bbox=${r(lon - d * 1.6)},${r(lat - d)},${r(lon + d * 1.6)},${r(lat + d)}&layer=mapnik&marker=${lat},${lon}`
}

/** A location whose map loads from OpenStreetMap only when asked; the address works as a link without it. */
export function MapEmbed({ name, address, lat, lon, className }: MapEmbedProps) {
  const [shown, setShown] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const valid = Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180
  // The map replaces the button that was just pressed: move focus into it so a keyboard user is not dropped.
  useEffect(() => {
    if (shown) frame.current?.focus()
  }, [shown])
  return (
    <div className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground", className)}>
      <div className="relative aspect-[8/5] w-full bg-muted sm:aspect-[2/1]">
        {shown && valid ? (
          <iframe
            ref={frame}
            src={osmEmbed(lat, lon)}
            title={`Map: ${name}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <>
            <svg className="absolute inset-0 size-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
              <path d="M0 150 C60 130 110 170 190 150 S330 120 400 140 V200 H0Z" className="fill-foreground/[0.06]" />
              <rect x="250" y="20" width="110" height="60" rx="14" className="fill-foreground/[0.04]" />
              <path d="M-10 60 L150 90 L260 40 L410 70 M90 -10 L120 110 L100 210 M300 -10 L280 100 L330 210" className="stroke-border" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-foreground" aria-hidden="true">
              <MapPin className="size-8 fill-background" />
            </span>
            <Button size="lg" variant="outline" disabled={!valid} onClick={() => setShown(true)} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background">
              Show the map
            </Button>
          </>
        )}
      </div>
      <address className="flex flex-col gap-1 p-4 text-sm not-italic">
        <span className="text-base font-medium leading-[1.25]">{name}</span>
        <a
          href={osmLink(lat, lon)}
          className="w-fit rounded-sm text-muted-foreground underline decoration-foreground/30 underline-offset-4 outline-none hover:text-foreground hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {address}
        </a>
        <span className="text-xs text-muted-foreground">The map loads from OpenStreetMap when you show it.</span>
      </address>
    </div>
  )
}
