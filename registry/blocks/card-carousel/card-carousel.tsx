"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Offer = {
  deal: string
  title: string
  price: string
  was?: string
  own?: boolean
  href: string
  photo: ImageRef
}

export type CardCarouselProps = {
  kicker: string
  title: string
  note: string
  /** Shown over the title of an offer with `own`. */
  ownLabel: string
  /** The first card: a photo that leads to every offer. */
  lead: { title: string; href: string; photo: ImageRef }
  offers: Offer[]
}

const photo = (name: string, alt: string): ImageRef => ({
  src: `/ui/photos/card-carousel/${name}.webp`,
  alt,
  width: 560,
  height: 560,
})

export const cardCarouselDefaults: CardCarouselProps = {
  kicker: "Tillyard, Hereford",
  title: "Offers for the weekend garden",
  note: "Prices in store and online until Sunday 30 November.",
  ownLabel: "Tillyard own",
  lead: {
    title: "See all 38 offers this week",
    href: "#offers",
    photo: {
      src: "/ui/photos/card-carousel/promo.webp",
      alt: "A wooden wheelbarrow full of fresh vegetables beside a raised bed on an allotment.",
      width: 600,
      height: 800,
    },
  },
  offers: [
    {
      deal: "£10 off",
      title: "Fieldwalker wellington boots, all sizes",
      price: "£29.99",
      was: "£39.99",
      own: true,
      href: "#wellies",
      photo: photo("wellies", "A pair of olive green rubber wellington boots."),
    },
    {
      deal: "25% off",
      title: "Galvanised watering can, 9 litres",
      price: "£17.99",
      was: "£23.99",
      href: "#watering-can",
      photo: photo("watering-can", "A galvanised steel watering can with a brass rose."),
    },
    {
      deal: "2 for £12",
      title: "Hanging seed feeder, sunflower hearts",
      price: "£6.99",
      href: "#feeder",
      photo: photo("feeder", "A metal hanging bird feeder filled with seed."),
    },
    {
      deal: "3 for £15",
      title: "Peat-free multipurpose compost, 50 litres",
      price: "£6.49",
      own: true,
      href: "#compost",
      photo: photo("compost", "A brown paper sack of peat-free compost, open at the top."),
    },
    {
      deal: "30% off",
      title: "Wall-mounted hose reel, 25 metres",
      price: "£41.99",
      was: "£59.99",
      href: "#hose",
      photo: photo("hose", "A green garden hose coiled on a wall-mounted reel with a brass nozzle."),
    },
    {
      deal: "£5 off",
      title: "Flexible trug with trowel and hand fork",
      price: "£14.99",
      was: "£19.99",
      own: true,
      href: "#trug",
      photo: photo("trug", "A sage green flexible trug holding a trowel and a hand fork."),
    },
  ],
}

export function CardCarousel(props: Partial<CardCarouselProps>) {
  const c = { ...cardCarouselDefaults, ...props }
  const track = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const move = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.children[0] as HTMLElement | undefined
    if (!el || !card) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: dir * (card.offsetWidth + 20) * 2, behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <section aria-labelledby="card-carousel-title" className="overflow-hidden bg-background py-20 lg:py-28">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-10">
        <div>
          <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
          <h2
            id="card-carousel-title"
            className="mt-4 max-w-[20ch] text-[34px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.024em]"
          >
            {c.title}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.5] text-muted-foreground">{c.note}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="outline"
            aria-controls="card-carousel-track"
            aria-label="Previous offers"
            disabled={edge.start}
            onClick={() => move(-1)}
            className="size-12 rounded-full p-0 [&_svg]:size-5"
          >
            <ArrowLeft aria-hidden />
          </Button>
          <Button
            variant="outline"
            aria-controls="card-carousel-track"
            aria-label="Next offers"
            disabled={edge.end}
            onClick={() => move(1)}
            className="size-12 rounded-full p-0 [&_svg]:size-5"
          >
            <ArrowRight aria-hidden />
          </Button>
        </div>
      </div>

      <ul
        id="card-carousel-track"
        ref={track}
        aria-label={`${c.title}: ${c.offers.length} offers`}
        className="mt-10 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-3 [scrollbar-width:none] lg:mt-14 lg:scroll-px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        <li className="w-[264px] shrink-0 snap-start sm:w-[288px]">
          <a
            href={c.lead.href}
            className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl bg-muted p-6 text-white outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img
              src={c.lead.photo.src}
              alt={c.lead.photo.alt}
              width={c.lead.photo.width}
              height={c.lead.photo.height}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            <span className="relative text-[26px] leading-[1.15] font-semibold tracking-[-0.01em] text-balance">
              {c.lead.title}
            </span>
            <span className="relative mt-5 inline-flex size-11 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
              <ArrowRight className="size-5" aria-hidden />
            </span>
          </a>
        </li>
        {c.offers.map((o) => (
          <li key={o.href} className="w-[264px] shrink-0 snap-start sm:w-[288px]">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/25">
              <div className="relative aspect-square bg-muted">
                <img
                  src={o.photo.src}
                  alt={o.photo.alt}
                  width={o.photo.width}
                  height={o.photo.height}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                <Badge className="absolute top-3 left-3 h-7 rounded-full px-3 text-[13px] font-semibold">{o.deal}</Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                {o.own ? (
                  <p className="text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.ownLabel}</p>
                ) : null}
                <h3 className={cn("text-[16px] leading-[1.3] font-semibold text-balance", o.own && "mt-1.5")}>
                  <a
                    href={o.href}
                    className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-[3px] focus-visible:after:ring-ring focus-visible:after:ring-inset"
                  >
                    {o.title}
                  </a>
                </h3>
                <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                  <p className="leading-[1.25]">
                    <span className="text-[22px] font-semibold tracking-[-0.01em] tabular-nums">{o.price}</span>
                    {o.was ? (
                      <span className="ml-2 text-[14px] text-muted-foreground tabular-nums line-through">
                        <span className="sr-only">was </span>
                        {o.was}
                      </span>
                    ) : null}
                  </p>
                  <span
                    aria-hidden
                    className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  >
                    <ArrowRight className="size-[18px]" />
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
