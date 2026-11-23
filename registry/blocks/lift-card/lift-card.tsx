import { ArrowRight, BriefcaseBusiness, CalendarCheck, Repeat2, Tag } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type Lift = { icon: LucideIcon; label: string; figure: string; unit: string; text: string; action: string; href: string }

export type LiftCardProps = {
  kicker: string
  title: string
  body: string
  /** The photo tile that opens the strip. */
  feature: { kicker: string; title: string; href: string; photo: ImageRef }
  items: Lift[]
}

export const liftCardDefaults: LiftCardProps = {
  kicker: "Ampway Vans, Leeds",
  title: "Four ways into an electric van",
  body: "Lease it, try it, buy it from stock or swap your diesel for it. Every route starts at our Kirkstall Road showroom or on your own yard.",
  feature: {
    kicker: "New for 2026",
    title: "Ampway Cargo L2, 264 km on a charge",
    href: "#cargo-l2",
    photo: {
      src: "/ui/photos/lift-card/van.webp",
      alt: "A light grey electric delivery van parked on a brick-paved city street at dusk.",
      width: 720,
      height: 960,
    },
  },
  items: [
    {
      icon: BriefcaseBusiness,
      label: "Business lease",
      figure: "£389",
      unit: "a month",
      text: "Ex VAT on a four-year lease, with servicing and tyres included.",
      action: "See lease deals",
      href: "#lease",
    },
    {
      icon: CalendarCheck,
      label: "Test drive",
      figure: "48",
      unit: "hours",
      text: "Keep a loaded van over two days and run your real routes.",
      action: "Book a van",
      href: "#test-drive",
    },
    {
      icon: Tag,
      label: "Stock offers",
      figure: "£2,500",
      unit: "off",
      text: "On 14 stock vans ready to drive away before 31 December.",
      action: "View stock",
      href: "#offers",
    },
    {
      icon: Repeat2,
      label: "Trade in",
      figure: "1",
      unit: "day",
      text: "A firm price for your diesel van, held for 14 days.",
      action: "Value my van",
      href: "#trade-in",
    },
  ],
}

export function LiftCard(props: Partial<LiftCardProps>) {
  const c = { ...liftCardDefaults, ...props }

  return (
    <section aria-labelledby="lift-card-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
            <h2
              id="lift-card-title"
              className="mt-4 max-w-[18ch] text-[34px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.024em]"
            >
              {c.title}
            </h2>
          </div>
          <p className="max-w-[60ch] text-[17px] leading-[1.5] text-muted-foreground">{c.body}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          <li className="sm:col-span-2 lg:col-span-1">
            <a
              href={c.feature.href}
              className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl bg-muted p-6 text-white outline-none transition-transform duration-300 hover:-translate-y-1.5 focus-visible:-translate-y-1.5 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-[400px]"
            >
              <img
                src={c.feature.photo.src}
                alt={c.feature.photo.alt}
                width={c.feature.photo.width}
                height={c.feature.photo.height}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <span className="relative text-[12px] font-medium tracking-[0.08em] text-white/85 uppercase">
                {c.feature.kicker}
              </span>
              <span className="relative mt-2 text-[22px] leading-[1.15] font-semibold tracking-[-0.01em] text-balance">
                {c.feature.title}
              </span>
            </a>
          </li>
          {c.items.map((it) => {
            const Icon = it.icon
            return (
              <li key={it.href}>
                <a
                  href={it.href}
                  className="group flex h-full flex-col items-center sm:min-h-[300px] rounded-2xl border border-border bg-muted/40 px-6 pt-8 pb-7 text-center sm:pt-10 outline-none transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1.5 hover:bg-card hover:shadow-lg hover:shadow-foreground/5 focus-visible:-translate-y-1.5 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:min-h-[400px] lg:pt-10"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-background">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="mt-6 text-[13px] font-semibold tracking-[0.08em] uppercase">{it.label}</span>
                  <span className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-[44px] leading-[0.9] font-semibold tracking-[-0.035em] tabular-nums">{it.figure}</span>
                    <span className="text-[15px] font-medium text-muted-foreground">{it.unit}</span>
                  </span>
                  <span className="mt-5 max-w-[24ch] text-[15px] leading-[1.5] text-muted-foreground">{it.text}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] sm:pt-8 font-medium">
                    {it.action}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
