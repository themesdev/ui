import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Tile = { kicker: string; title: string; body: string; photo: ImageRef }

export type PlainTilesProps = {
  title: string
  body: string
  tiles: Tile[]
  action: LinkRef
  link: LinkRef
}

const photo = (name: string, alt: string): ImageRef => ({
  src: `/ui/photos/plain-tiles/${name}.webp`,
  alt,
  width: 800,
  height: 533,
})

export const plainTilesDefaults: PlainTilesProps = {
  title: "How Roomhop works",
  body: "Around 4,100 student rooms in Groningen, from canal-house attics to new studios near the Zernike campus. Most students sign within three weeks.",
  tiles: [
    {
      kicker: "Step 1",
      title: "Search the rooms",
      body: "Filter by rent, neighbourhood and cycling time to your faculty. A new match lands in your inbox within the hour.",
      photo: photo("search", "A student sits cross-legged on her bed with a laptop, browsing room listings."),
    },
    {
      kicker: "Step 2",
      title: "Meet the house",
      body: "Reply to as many rooms as you like for €9.95 a month. Landlords and housemates invite you to a viewing from the chat.",
      photo: photo("viewing", "A landlady shows two students a bright room with a wooden desk by a canal-side window."),
    },
    {
      kicker: "Step 3",
      title: "Get your keys",
      body: "Sign the contract online and pay the deposit through Roomhop, held until you move out. No agency fee, ever.",
      photo: photo("keys", "A young man carries a moving box up the steep stairs of a Dutch canal house."),
    },
  ],
  action: { label: "Start searching", href: "#search" },
  link: { label: "Renting out a room?", href: "#landlords" },
}

export function PlainTiles(props: Partial<PlainTilesProps>) {
  const c = { ...plainTilesDefaults, ...props }

  return (
    <section aria-labelledby="plain-tiles-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h2
            id="plain-tiles-title"
            className="text-4xl leading-[1.08] font-bold tracking-[-0.018em] text-balance lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.024em]"
          >
            {c.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-lg leading-[1.5] text-pretty text-muted-foreground">{c.body}</p>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3 lg:mt-16">
          {c.tiles.map((t) => (
            <li key={t.title} className="flex flex-col">
              <img
                src={t.photo.src}
                alt={t.photo.alt}
                width={t.photo.width}
                height={t.photo.height}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
              <p className="mt-6 text-[13px] leading-[1.25] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                {t.kicker}
              </p>
              <h3 className="mt-2 text-[24px] leading-[1.15] font-bold tracking-[-0.01em]">{t.title}</h3>
              <p className="mt-2.5 max-w-[40ch] text-[16px] leading-[1.55] text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
          <a href={c.action.href} className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-[15px]")}>
            {c.action.label}
            <ArrowRight data-icon="inline-end" aria-hidden />
          </a>
          <a
            href={c.link.href}
            className="rounded-sm text-[15px] font-semibold underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            {c.link.label}
          </a>
        </div>
      </div>
    </section>
  )
}
