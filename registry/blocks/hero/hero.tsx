import { ArrowRight, ArrowUpDown, Bike, CalendarDays, Clock, Info, RotateCcw, Ticket, TrainFront, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }

export type HeroProps = {
  /** One quiet service line above the planner. */
  notice: { text: string; link: LinkRef }
  kicker: string
  /** The icon before the kicker: the brand's or the trade's. */
  mark: LucideIcon
  title: string
  planner: {
    action: string
    from: { label: string; value: string }
    to: { label: string; placeholder: string }
    depart: string
    arrive: string
    date: { label: string; value: string }
    time: { label: string; value: string }
    submit: string
    secondary: LinkRef
  }
  help: LinkRef
  /** The photo card on the right: a day-out idea. */
  feature: { badge: string; title: string; body: string; link: LinkRef; photo: ImageRef }
  /** Four quick tasks under the planner. */
  tasks: { label: string; note: string; href: string }[]
}

export const heroDefaults: HeroProps = {
  notice: {
    text: "No trains between Exeter and Okehampton on 29 and 30 November. Buses replace them.",
    link: { label: "See the bus times", href: "#engineering" },
  },
  kicker: "Moorline trains across Dartmoor and the Devon coast",
  mark: TrainFront,
  title: "Where are you going today?",
  planner: {
    action: "#journeys",
    from: { label: "From", value: "Exeter St Davids" },
    to: { label: "To", placeholder: "Station, town or postcode" },
    depart: "Leave at",
    arrive: "Arrive by",
    date: { label: "Date", value: "2026-11-28" },
    time: { label: "Time", value: "09:15" },
    submit: "Find trains",
    secondary: { label: "Buy a ticket", href: "#tickets" },
  },
  help: { label: "Live departures and delays", href: "#live" },
  feature: {
    badge: "Day out by train",
    title: "Ride the sea wall from Dawlish to Teignmouth",
    body: "Four miles of track between the red cliffs and the water. A day return from Exeter costs £9.80, children travel for £2.",
    link: { label: "Plan a day by the sea", href: "#days-out" },
    photo: {
      src: "/ui/photos/hero/coast-line.webp",
      alt: "A two-car regional train running along the sea wall below red sandstone cliffs in early morning light.",
      width: 1200,
      height: 675,
    },
  },
  tasks: [
    { label: "Tickets and railcards", note: "Save a third with a Devon Card", href: "#tickets" },
    { label: "Season tickets", note: "Renew or change your route", href: "#season" },
    { label: "Delay refund", note: "Claim from 15 minutes late", href: "#refund" },
    { label: "Bikes on board", note: "Free, book a space on weekends", href: "#bikes" },
  ],
}

const TASK_ICONS = [Ticket, CalendarDays, RotateCcw, Bike]

export function Hero(props: Partial<HeroProps>) {
  const c = { ...heroDefaults, ...props }
  const Mark = c.mark
  const p = c.planner

  const when = (prefix: string, legend: string) => (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="grid gap-1.5">
        <Label htmlFor={`${prefix}-date`} className="text-[13px] text-muted-foreground">
          {c.planner.date.label}
        </Label>
        <div className="relative">
          <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input id={`${prefix}-date`} name="date" type="date" defaultValue={p.date.value} className="h-11 min-w-0 pl-9 text-[15px] tabular-nums" />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor={`${prefix}-time`} className="text-[13px] text-muted-foreground">
          {legend}
        </Label>
        <div className="relative">
          <Clock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input id={`${prefix}-time`} name="time" type="time" defaultValue={p.time.value} className="h-11 min-w-0 pl-9 text-[15px] tabular-nums" />
        </div>
      </div>
    </div>
  )

  return (
    <section aria-labelledby="hero-title" className="bg-background pt-6 pb-20 lg:pt-8 lg:pb-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <p className="flex items-start gap-2.5 text-[14px] leading-[1.4] text-muted-foreground sm:items-center">
          <Info className="mt-0.5 size-4 shrink-0 text-foreground sm:mt-0" aria-hidden />
          <span>
            {c.notice.text}{" "}
            <a href={c.notice.link.href} className="font-medium text-foreground underline underline-offset-4 hover:decoration-2">
              {c.notice.link.label}
            </a>
          </span>
        </p>

        <div className="mt-5 grid gap-10 rounded-3xl border bg-muted/40 p-4 sm:p-8 lg:grid-cols-[minmax(0,11fr)_minmax(0,12fr)] lg:items-center lg:gap-14 lg:p-12">
          <div>
            <p className="flex items-center gap-2 px-2 text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase sm:px-0">
              <Mark className="size-4" aria-hidden />
              {c.kicker}
            </p>
            <h1
              id="hero-title"
              className="mt-4 px-2 text-[36px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance sm:px-0 lg:text-[52px] lg:leading-[1.04] lg:tracking-[-0.024em]"
            >
              {c.title}
            </h1>

            <form action={p.action} method="get" className="mt-8 rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
              <div className="relative rounded-xl border bg-background">
                <div className="flex items-center gap-3 rounded-t-xl px-4 pt-3 pb-2.5 has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50">
                  <span className="size-2.5 shrink-0 rounded-full border-2 border-foreground" aria-hidden />
                  <div className="grid min-w-0 flex-1">
                    <Label htmlFor="hero-from" className="text-[12px] text-muted-foreground">
                      {p.from.label}
                    </Label>
                    <input
                      id="hero-from"
                      name="from"
                      defaultValue={p.from.value}
                      autoComplete="off"
                      className="h-7 w-full bg-transparent text-[16px] font-medium outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="ml-[22px] h-px bg-border" aria-hidden />
                <span className="absolute top-[29px] left-[20px] h-[44px] w-0.5 bg-border" aria-hidden />
                <div className="flex items-center gap-3 rounded-b-xl px-4 pt-2.5 pb-3 has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50">
                  <span className="size-2.5 shrink-0 rounded-full bg-foreground" aria-hidden />
                  <div className="grid min-w-0 flex-1">
                    <Label htmlFor="hero-to" className="text-[12px] text-muted-foreground">
                      {p.to.label}
                    </Label>
                    <input
                      id="hero-to"
                      name="to"
                      placeholder={p.to.placeholder}
                      autoComplete="off"
                      className="h-7 w-full bg-transparent text-[16px] font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  name="swap"
                  value="1"
                  variant="outline"
                  size="icon"
                  aria-label="Swap from and to"
                  className="absolute top-1/2 right-3 size-9 -translate-y-1/2 rounded-full bg-background"
                >
                  <ArrowUpDown className="size-4" aria-hidden />
                </Button>
              </div>

              <Tabs defaultValue="depart" className="mt-4 gap-3">
                <TabsList className="h-10 w-full">
                  <TabsTrigger value="depart" className="text-[14px]">
                    {p.depart}
                  </TabsTrigger>
                  <TabsTrigger value="arrive" className="text-[14px]">
                    {p.arrive}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="depart">{when("hero-depart", p.depart)}</TabsContent>
                <TabsContent value="arrive">{when("hero-arrive", p.arrive)}</TabsContent>
              </Tabs>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button type="submit" size="lg" className="h-11 flex-1 rounded-full px-6 text-[15px] sm:flex-none">
                  {p.submit}
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Button>
                <a
                  href={p.secondary.href}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 flex-1 rounded-full px-6 text-[15px] sm:flex-none")}
                >
                  {p.secondary.label}
                </a>
              </div>
            </form>

            <a
              href={c.help.href}
              className="mt-5 inline-flex items-center gap-2 px-2 text-[15px] font-medium underline-offset-4 hover:underline sm:px-0"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500" />
              </span>
              {c.help.label}
            </a>
          </div>

          <article className="overflow-hidden rounded-2xl border bg-card">
            <div className="relative">
              <img
                src={c.feature.photo.src}
                alt={c.feature.photo.alt}
                width={c.feature.photo.width}
                height={c.feature.photo.height}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
              />
              <Badge className="absolute top-4 left-4 h-7 rounded-full border-0 bg-background px-3 text-[13px] text-foreground shadow-sm">
                {c.feature.badge}
              </Badge>
            </div>
            <div className="p-6 lg:p-8">
              <h2 className="text-[24px] leading-[1.15] font-semibold tracking-[-0.01em] text-balance lg:text-[27px]">
                {c.feature.title}
              </h2>
              <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.5] text-muted-foreground">{c.feature.body}</p>
              <a
                href={c.feature.link.href}
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                {c.feature.link.label}
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </article>
        </div>

        <nav aria-label="Quick tasks" className="mt-6 lg:mt-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {c.tasks.map((t, i) => {
              const Icon = TASK_ICONS[i % TASK_ICONS.length]
              return (
                <li key={t.href + t.label}>
                  <a
                    href={t.href}
                    className="group flex h-full items-center gap-4 rounded-2xl border bg-card p-5 outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-muted">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] leading-[1.25] font-semibold">{t.label}</span>
                      <span className="mt-1 block text-[14px] leading-[1.35] text-muted-foreground">{t.note}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </section>
  )
}
