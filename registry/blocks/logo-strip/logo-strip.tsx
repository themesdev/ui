import { ArrowRight, Leaf, Sun, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type LinkRef = { label: string; href: string }
/** A client's name, set in type as a wordmark. */
export type Logo = { name: string; href: string }

export type LogoStripProps = {
  title: string
  /** Seven names fill one row at full width. */
  logos: Logo[]
  link: LinkRef
}

export const logoStripDefaults: LogoStripProps = {
  title: "Counterpart runs the online shops of 140 independent retailers across the north",
  logos: [
    { name: "the larder", href: "#larder" },
    { name: "Holm & Co", href: "#holm" },
    { name: "Fettle", href: "#fettle" },
    { name: "Oakmoor", href: "#oakmoor" },
    { name: "kiln/goods", href: "#kiln" },
    { name: "Brackley's", href: "#brackleys" },
    { name: "North Folk", href: "#north-folk" },
  ],
  link: { label: "How Fettle grew online sales by 64%", href: "#case-fettle" },
}

/** One wordmark style per position, so the row reads like seven different brands. */
const MARKS: { className: string; icon?: LucideIcon }[] = [
  { className: "text-[27px] font-light lowercase tracking-[-0.03em]" },
  { className: "text-[16px] font-bold uppercase tracking-[0.2em]" },
  { className: "text-[29px] font-black italic tracking-[-0.05em]" },
  { className: "text-[15px] font-semibold uppercase tracking-[0.32em]", icon: Sun },
  { className: "text-[24px] font-medium tracking-[-0.02em]" },
  { className: "text-[25px] font-extrabold tracking-[-0.035em]" },
  { className: "text-[17px] font-medium uppercase tracking-[0.08em]", icon: Leaf },
]

export function LogoStrip(props: Partial<LogoStripProps>) {
  const c = { ...logoStripDefaults, ...props }

  return (
    <section aria-labelledby="logo-strip-title" className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <h2
          id="logo-strip-title"
          className="mx-auto max-w-[46ch] text-center text-[16px] leading-[1.45] font-medium text-balance text-muted-foreground lg:text-[17px]"
        >
          {c.title}
        </h2>
        <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:mt-12 lg:flex lg:flex-nowrap lg:justify-between lg:gap-8">
          {c.logos.map((l, i) => {
            const m = MARKS[i % MARKS.length]
            const Icon = m.icon
            return (
              <li key={l.name} className={cn("flex justify-center", i === c.logos.length - 1 && c.logos.length % 2 === 1 && "col-span-2 sm:col-span-1")}>
                <a
                  href={l.href}
                  className="inline-flex h-12 items-center gap-2 rounded-md px-2 whitespace-nowrap text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {Icon && <Icon className="size-5" strokeWidth={2.25} aria-hidden />}
                  <span className={cn("leading-none", m.className)}>{l.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
        <p className="mt-10 text-center lg:mt-12">
          <a
            href={c.link.href}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            {c.link.label}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </p>
      </div>
    </section>
  )
}
