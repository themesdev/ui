import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Stat = { value: string; label: string; note: string }

export type StatsRowProps = {
  kicker: string
  title: string
  intro: string
  link: LinkRef
  /** Four photos in one strip above the figures. */
  photos: ImageRef[]
  /** Three figures read best: the value leads, the label says what it counts. */
  stats: Stat[]
}

export const statsRowDefaults: StatsRowProps = {
  kicker: "Northyard, product studio in Glasgow",
  title: "Nine years of shipping with the people who use it",
  intro:
    "We design and build apps for banks, health services and councils, and we test every screen with real users before a line of code goes live.",
  link: { label: "Read the case studies", href: "#work" },
  photos: [
    {
      src: "/ui/photos/stats-row/workshop.webp",
      alt: "Four designers at a wall of printed screens and notes, one pointing at a flow.",
      width: 600,
      height: 800,
    },
    {
      src: "/ui/photos/stats-row/testing.webp",
      alt: "A woman testing a banking app prototype on her phone while a designer takes notes.",
      width: 600,
      height: 800,
    },
    {
      src: "/ui/photos/stats-row/review.webp",
      alt: "A designer and a developer reviewing an app screen together on a large monitor.",
      width: 600,
      height: 800,
    },
    {
      src: "/ui/photos/stats-row/demo.webp",
      alt: "A small audience in a warehouse studio watching a product demo on a big screen.",
      width: 600,
      height: 800,
    },
  ],
  stats: [
    { value: "86", label: "products launched", note: "since 2017, 31 of them for the public sector" },
    { value: "2,400+", label: "hours with real users", note: "in labs, homes, wards and council offices" },
    { value: "4.1M", label: "people use our apps", note: "every month across the UK" },
  ],
}

export function StatsRow(props: Partial<StatsRowProps>) {
  const c = { ...statsRowDefaults, ...props }

  return (
    <section aria-labelledby="stats-row-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
            <h2
              id="stats-row-title"
              className="mt-4 text-[34px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[50px] lg:leading-[1.04] lg:tracking-[-0.024em]"
            >
              {c.title}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1.5">
            <p className="max-w-[48ch] text-[17px] leading-[1.5] text-muted-foreground">{c.intro}</p>
            <a
              href={c.link.href}
              className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {c.link.label}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-[3fr_2fr_3fr_2fr] lg:gap-4">
          {c.photos.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              loading="lazy"
              className={cn(
                "h-[180px] w-full rounded-2xl object-cover sm:h-[240px] lg:h-[300px]",
                i % 2 === 1 && "lg:mt-10 lg:h-[260px]"
              )}
            />
          ))}
        </div>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-20 lg:gap-12">
          {c.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse border-t border-foreground/15 pt-6">
              <dt className="mt-4">
                <span className="block text-[17px] leading-[1.25] font-semibold">{s.label}</span>
                <span className="mt-1 block max-w-[30ch] text-[15px] leading-[1.45] text-muted-foreground">{s.note}</span>
              </dt>
              <dd className="text-[72px] leading-[0.9] font-semibold tracking-[-0.035em] tabular-nums lg:text-[96px]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
