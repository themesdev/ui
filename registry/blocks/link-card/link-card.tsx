import { ArrowRight } from "lucide-react"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type City = { name: string; count: string; href: string; photo: ImageRef }

export type LinkCardProps = {
  kicker: string
  title: string
  body: string
  cities: City[]
  link: LinkRef
}

const photo = (name: string, alt: string): ImageRef => ({
  src: `/ui/photos/link-card/${name}.webp`,
  alt,
  width: 560,
  height: 560,
})

export const linkCardDefaults: LinkCardProps = {
  kicker: "Letwell rentals",
  title: "Popular cities",
  body: "Homes to rent from checked landlords, with no holding fees. New listings every hour.",
  cities: [
    {
      name: "Bristol",
      count: "1,284 homes",
      href: "#bristol",
      photo: photo("bristol", "Colourful terraced houses on a hill above Bristol harbour."),
    },
    {
      name: "Leeds",
      count: "962 homes",
      href: "#leeds",
      photo: photo("leeds", "A Victorian red brick arcade on a street in Leeds."),
    },
    {
      name: "Glasgow",
      count: "1,107 homes",
      href: "#glasgow",
      photo: photo("glasgow", "Sandstone tenements along a tree-lined street in Glasgow."),
    },
    {
      name: "Manchester",
      count: "1,531 homes",
      href: "#manchester",
      photo: photo("manchester", "Brick warehouses beside a canal in Manchester."),
    },
  ],
  link: { label: "All 46 cities", href: "#cities" },
}

export function LinkCard(props: Partial<LinkCardProps>) {
  const c = { ...linkCardDefaults, ...props }

  return (
    <section aria-labelledby="link-card-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
          <h2
            id="link-card-title"
            className="mt-4 text-[36px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[52px] lg:leading-[1.04] lg:tracking-[-0.024em]"
          >
            {c.title}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.5] text-pretty text-muted-foreground">{c.body}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {c.cities.map((city) => (
            <li key={city.href}>
              <a
                href={city.href}
                className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl bg-muted text-white outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background "
              >
                <img
                  src={city.photo.src}
                  alt={city.photo.alt}
                  width={city.photo.width}
                  height={city.photo.height}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none"
                />
                <span aria-hidden className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                <span aria-hidden className="absolute inset-3 rounded-md border border-white/70 sm:inset-4" />
                <span className="relative flex flex-col items-center px-4 text-center">
                  <span className="text-[22px] leading-[1.15] font-semibold tracking-[-0.01em] sm:text-[28px]">
                    {city.name}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-white/90 tabular-nums sm:text-[15px]">
                    {city.count}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={c.link.href}
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-[15px] font-medium underline decoration-border underline-offset-[6px] transition-colors hover:decoration-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {c.link.label}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
