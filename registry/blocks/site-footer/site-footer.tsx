import { Award, Clock, Phone, ShieldCheck, Star, Wine, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export type LinkRef = { label: string; href: string }
export type LinkGroup = { title: string; links: LinkRef[] }
/** `icon` defaults to a shield, a star and an award, in that order. */
export type TrustMark = { label: string; note: string; icon?: LucideIcon }

export type SiteFooterProps = {
  brand: LinkRef
  /** The icon before the wordmark. */
  mark: LucideIcon
  tagline: string
  service: { title: string; hours: string; phone: string; shops: LinkRef }
  /** The first group is the shop: it gets two columns of links. */
  groups: LinkGroup[]
  trust: TrustMark[]
  copyright: string
  legal: LinkRef[]
  /** The round badge with two lines beside the legal links; `null` leaves it out. */
  age: { mark: string; lines: string[] } | null
}

export const siteFooterDefaults: SiteFooterProps = {
  brand: { label: "Cellar Row", href: "#" },
  mark: Wine,
  tagline: "Wine, beer and spirits from 31 shops across Flanders, or delivered from our Ghent cellar the next working day.",
  service: {
    title: "Ask a cellar hand",
    hours: "Every day 09:00 to 21:00",
    phone: "09 298 41 10",
    shops: { label: "Find your shop", href: "#shops" },
  },
  groups: [
    {
      title: "Shop",
      links: [
        { label: "Wine", href: "#wine" },
        { label: "Sparkling", href: "#sparkling" },
        { label: "Whisky", href: "#whisky" },
        { label: "Gin and genever", href: "#gin" },
        { label: "Liqueurs", href: "#liqueurs" },
        { label: "Cognac and brandy", href: "#cognac" },
        { label: "Mixers", href: "#mixers" },
        { label: "Port and sherry", href: "#port" },
        { label: "Belgian beer", href: "#beer" },
        { label: "Alcohol-free", href: "#alcohol-free" },
        { label: "Gift boxes", href: "#gifts" },
        { label: "This week's offers", href: "#offers" },
        { label: "Cellar clearance", href: "#clearance" },
      ],
    },
    {
      title: "Discover",
      links: [
        { label: "Cocktail recipes", href: "#cocktails" },
        { label: "Food pairing", href: "#pairing" },
        { label: "Your taste profile", href: "#taste" },
        { label: "Tastings in the shops", href: "#tastings" },
        { label: "Wine courses", href: "#courses" },
        { label: "Producers we visit", href: "#producers" },
      ],
    },
    {
      title: "Service",
      links: [
        { label: "Customer service", href: "#help" },
        { label: "Delivery and pickup", href: "#delivery" },
        { label: "Returns", href: "#returns" },
        { label: "Business orders", href: "#business" },
        { label: "My account", href: "#account" },
        { label: "Weekly leaflet", href: "#leaflet" },
      ],
    },
    {
      title: "Cellar Row",
      links: [
        { label: "About us", href: "#about" },
        { label: "Cellar Row Club", href: "#club" },
        { label: "Jobs in the shops", href: "#jobs" },
        { label: "Drinking responsibly", href: "#responsible" },
        { label: "Sustainability", href: "#sustainability" },
        { label: "Report a quality issue", href: "#quality" },
        { label: "Press", href: "#press" },
      ],
    },
  ],
  trust: [
    { label: "Certified webshop", note: "Secure payment, 14-day returns" },
    { label: "9.1 from 14,206 reviews", note: "Rated after every order" },
    { label: "Wine shop of the year", note: "Flemish retail awards 2025" },
  ],
  copyright: "© 2026 Cellar Row NV, Ghent",
  legal: [
    { label: "Terms of sale", href: "#terms" },
    { label: "Privacy", href: "#privacy" },
    { label: "Cookies", href: "#cookies" },
    { label: "Accessibility", href: "#accessibility" },
    { label: "Withdrawal form", href: "#withdrawal" },
  ],
  age: {
    mark: "18+",
    lines: ["Beer and wine from 16, spirits from 18.", "Under 25? We ask for your ID, in the shop and at the door."],
  },
}

const trustIcons = [ShieldCheck, Star, Award]

export function SiteFooter(props: Partial<SiteFooterProps>) {
  const c = { ...siteFooterDefaults, ...props }
  const [shop, ...rest] = c.groups
  const Mark = c.mark
  const link =
    "rounded-sm text-[15px] leading-[1.25] text-muted-foreground outline-none hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:py-14">
          <div>
            <a href={c.brand.href} className="flex w-fit items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <Mark className="size-7" strokeWidth={2} aria-hidden />
              <span className="text-[26px] leading-none font-bold tracking-[-0.03em]">{c.brand.label}</span>
            </a>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.5] text-muted-foreground">{c.tagline}</p>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-6">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">{c.service.title}</p>
              <a
                href={`tel:${c.service.phone.replace(/\s/g, "")}`}
                className="mt-2 flex items-center gap-2.5 rounded-sm text-[26px] leading-[1.15] font-semibold tracking-[-0.01em] tabular-nums outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Phone className="size-5" aria-hidden />
                {c.service.phone}
              </a>
              <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-muted-foreground">
                <Clock className="size-4" aria-hidden />
                {c.service.hours}
              </p>
            </div>
            <a href={c.service.shops.href} className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-5 text-[15px]")}>
              {c.service.shops.label}
            </a>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-x-10 lg:py-14">
          <nav aria-label={shop.title} className="col-span-2 md:col-span-3 lg:col-span-1">
            <p className="text-[13px] font-semibold tracking-[0.08em] uppercase">{shop.title}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-3 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-7">
              {shop.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {rest.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="text-[13px] font-semibold tracking-[0.08em] uppercase">{g.title}</p>
              <ul className="mt-5 space-y-3.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-8 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-10 lg:py-10">
          <div>
            <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {c.trust.map((t, i) => {
                const Icon = t.icon ?? trustIcons[i % trustIcons.length]
                return (
                  <li key={t.label} className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[14px] leading-[1.25] font-semibold">{t.label}</span>
                      <span className="mt-0.5 block text-[13px] leading-[1.25] text-muted-foreground">{t.note}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-8 flex flex-col gap-3 text-[14px] text-muted-foreground lg:flex-row lg:items-center lg:gap-6">
              <p>{c.copyright}</p>
              <ul aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
                {c.legal.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="rounded-sm outline-none hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {c.age ? (
            <div className="flex items-center gap-4 lg:max-w-[340px]">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-foreground text-[18px] leading-none font-bold tracking-[-0.035em] tabular-nums">
                {c.age.mark}
              </span>
              <p className="text-[13px] leading-[1.4] text-muted-foreground">
                {c.age.lines.map((line, i) => (
                  <span key={line} className={cn("block", i === 0 && "font-semibold text-foreground")}>
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
