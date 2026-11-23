import { ArrowRight, Check, Film, Gauge, HardDrive, Users, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Billing = { id: string; label: string; badge?: string }
/** The figure and its small print for one billing period. */
export type Price = { price: string; period: string }
export type Allowance = { icon: LucideIcon; label: string }
export type Plan = {
  name: string
  /** One price per billing id. */
  prices: Record<string, Price>
  line: string
  action: LinkRef
  trial: LinkRef
  /** What the plan holds: seats, storage, streaming. */
  allowances: Allowance[]
  /** The heading over the list, e.g. "Everything in Solo, plus". */
  featuresTitle: string
  features: string[]
  featured?: boolean
}

export type PricingProps = {
  title: string
  body: string
  freePlan: LinkRef
  billing: Billing[]
  defaultBilling: string
  featuredLabel: string
  plans: Plan[]
  compare: LinkRef
  aside: { photo: ImageRef; title: string; body: string; action: LinkRef }
  note: string
}

export const pricingDefaults: PricingProps = {
  title: "Host your course, not the ads",
  body: "Cutroom streams the lessons of 6,800 course makers from Utrecht to Lisbon. No ads, no suggested videos, your brand in the player.",
  freePlan: { label: "start on the free plan", href: "#free" },
  billing: [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly", badge: "2 months free" },
  ],
  defaultBilling: "monthly",
  featuredLabel: "Most chosen",
  plans: [
    {
      name: "Solo",
      line: "For your first paid course.",
      prices: {
        monthly: { price: "€14", period: "per month, billed monthly, including VAT" },
        yearly: { price: "€11.67", period: "per month, €140 billed yearly, including VAT" },
      },
      action: { label: "Get Solo", href: "#solo" },
      trial: { label: "start a 14-day trial", href: "#trial-solo" },
      allowances: [
        { icon: Users, label: "1 seat" },
        { icon: Film, label: "Up to 3 courses" },
        { icon: HardDrive, label: "150 GB video storage" },
        { icon: Gauge, label: "600 GB streamed a month" },
      ],
      featuresTitle: "Everything in Free, plus",
      features: [
        "No Cutroom logo in the player",
        "Password and domain lock",
        "Chapters and transcripts",
        "Watch-time per lesson",
      ],
    },
    {
      name: "Studio",
      line: "For a growing course business.",
      prices: {
        monthly: { price: "€36", period: "per month, billed monthly, including VAT" },
        yearly: { price: "€30", period: "per month, €360 billed yearly, including VAT" },
      },
      action: { label: "Get Studio", href: "#studio" },
      trial: { label: "start a 14-day trial", href: "#trial-studio" },
      allowances: [
        { icon: Users, label: "3 seats" },
        { icon: Film, label: "Unlimited courses" },
        { icon: HardDrive, label: "1 TB video storage" },
        { icon: Gauge, label: "3 TB streamed a month" },
      ],
      featuresTitle: "Everything in Solo, plus",
      features: [
        "Your colours and fonts in the player",
        "Quizzes and buttons inside a video",
        "Student-level viewing reports",
        "Subtitles in 30 languages",
        "Priority support, answered in 4 hours",
      ],
      featured: true,
    },
    {
      name: "Academy",
      line: "For schools and teaching teams.",
      prices: {
        monthly: { price: "€96", period: "per month, billed monthly, including VAT" },
        yearly: { price: "€80", period: "per month, €960 billed yearly, including VAT" },
      },
      action: { label: "Get Academy", href: "#academy" },
      trial: { label: "start a 14-day trial", href: "#trial-academy" },
      allowances: [
        { icon: Users, label: "10 seats (up to 25)" },
        { icon: Film, label: "Unlimited courses" },
        { icon: HardDrive, label: "6 TB video storage" },
        { icon: Gauge, label: "10 TB streamed a month" },
      ],
      featuresTitle: "Everything in Studio, plus",
      features: [
        "Live classes and recorded replays",
        "Single sign-on for your students",
        "Roles per teacher and course",
        "API and LMS connections",
        "A named contact person",
      ],
    },
  ],
  compare: { label: "Compare all features", href: "#compare" },
  aside: {
    photo: {
      src: "/ui/photos/pricing/school.webp",
      alt: "A woman in an apron slices vegetables in a bright kitchen while a camera on a tripod records her lesson.",
      width: 600,
      height: 800,
    },
    title: "Running a school with 25+ teachers?",
    body: "Volume pricing, invoicing and a data agreement under Dutch law.",
    action: { label: "See plans for schools", href: "#schools" },
  },
  note: "Prices in euros. Cancel any time before your next billing date; yearly plans are refunded for the months you have left.",
}

function PlanCard({ p, billing, label, compare }: { p: Plan; billing: string; label: string; compare: LinkRef }) {
  const price = p.prices[billing]
  const card = (
    <div className="flex h-full flex-col rounded-[22px] bg-card p-7 text-card-foreground lg:p-8">
      <h3 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.01em]">{p.name}</h3>
      <p className="mt-1.5 text-[15px] leading-[1.4] text-muted-foreground">{p.line}</p>
      <p className="mt-7 text-[52px] leading-[0.9] font-semibold tracking-[-0.035em] tabular-nums">{price.price}</p>
      <p className="mt-3 max-w-[24ch] text-[14px] leading-[1.4] text-muted-foreground">{price.period}</p>
      <a
        href={p.action.href}
        className={cn(
          buttonVariants({ variant: p.featured ? "default" : "outline", size: "lg" }),
          "mt-7 h-11 w-full text-[15px]",
        )}
      >
        {p.action.label}
      </a>
      <p className="mt-3.5 text-center text-[14px] text-muted-foreground">
        or{" "}
        <a
          href={p.trial.href}
          className="rounded-sm font-medium text-foreground underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {p.trial.label}
        </a>
      </p>

      <Separator className="my-7" />
      <ul className="grid gap-3.5">
        {p.allowances.map((a) => {
          const Icon = a.icon
          return (
            <li key={a.label} className="flex items-center gap-3 text-[15px] leading-[1.3] font-medium">
              <Icon className="size-[18px] shrink-0 text-muted-foreground" aria-hidden />
              {a.label}
            </li>
          )
        })}
      </ul>
      <Separator className="my-7" />

      <p className="text-[14px] leading-[1.25] font-semibold">{p.featuresTitle}</p>
      <ul className="mt-4 mb-8 grid gap-3">
        {p.features.map((f) => (
          <li key={f} className="flex gap-3 text-[15px] leading-[1.4] text-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <a
        href={compare.href}
        className="mt-auto w-fit rounded-sm text-[14px] font-medium underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        {compare.label}
        <span className="sr-only"> of {p.name}</span>
      </a>
    </div>
  )

  if (!p.featured) {
    return <li className="rounded-3xl border border-border lg:mt-10">{card}</li>
  }
  return (
    <li className="flex flex-col rounded-3xl bg-foreground p-[2px]">
      <p className="flex h-10 shrink-0 items-center justify-center text-[13px] font-medium tracking-[0.08em] text-background uppercase">
        {label}
      </p>
      <div className="flex-1">{card}</div>
    </li>
  )
}

export function Pricing(props: Partial<PricingProps>) {
  const c = { ...pricingDefaults, ...props }

  return (
    <section aria-labelledby="pricing-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <h2
            id="pricing-title"
            className="text-4xl leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[56px] lg:leading-[1.04] lg:tracking-[-0.024em]"
          >
            {c.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-[1.5] text-pretty text-muted-foreground">
            {c.body} Or{" "}
            <a
              href={c.freePlan.href}
              className="rounded-sm font-medium text-foreground underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {c.freePlan.label}
            </a>
            .
          </p>
        </div>

        <Tabs defaultValue={c.defaultBilling} className="mt-10 gap-0">
          <TabsList aria-label="Billing period" className="mx-auto h-auto! rounded-full p-1">
            {c.billing.map((b) => (
              <TabsTrigger key={b.id} value={b.id} className="h-10! gap-2 rounded-full px-5 text-[15px] max-sm:px-4">
                {b.label}
                {b.badge ? (
                  <Badge variant="outline" className="h-6 rounded-full bg-background px-2 text-[12px]">
                    {b.badge}
                  </Badge>
                ) : null}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,0.8fr)] lg:items-center xl:gap-8">
            {c.billing.map((b) => (
              <TabsContent key={b.id} value={b.id}>
                <ul className="grid gap-6 md:grid-cols-3 md:gap-5">
                  {c.plans.map((p) => (
                    <PlanCard key={p.name} p={p} billing={b.id} label={c.featuredLabel} compare={c.compare} />
                  ))}
                </ul>
              </TabsContent>
            ))}

            <aside aria-labelledby="pricing-aside-title" className="flex flex-col rounded-3xl bg-muted/50 p-2">
              <img
                src={c.aside.photo.src}
                alt={c.aside.photo.alt}
                width={c.aside.photo.width}
                height={c.aside.photo.height}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[18px] object-cover lg:aspect-[4/5]"
              />
              <div className="px-5 pt-6 pb-6">
                <h3 id="pricing-aside-title" className="text-[22px] leading-[1.15] font-semibold tracking-[-0.01em] text-balance">
                  {c.aside.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-muted-foreground">{c.aside.body}</p>
                <a
                  href={c.aside.action.href}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-5 h-11 w-full bg-background text-[15px]")}
                >
                  {c.aside.action.label}
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </a>
              </div>
            </aside>
          </div>
        </Tabs>

        <p className="mt-10 max-w-[80ch] text-[14px] leading-[1.5] text-muted-foreground">{c.note}</p>
      </div>
    </section>
  )
}
