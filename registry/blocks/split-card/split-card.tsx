import { ArrowRight, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }

export type SplitCardProps = {
  kicker: string
  title: string
  body: string
  points: string[]
  action: LinkRef
  /** A short line beside the button: the price, a guarantee. */
  note: string
  photo: ImageRef
}

export const splitCardDefaults: SplitCardProps = {
  kicker: "Fairshare Health, Edinburgh",
  title: "Health cover that answers to its members",
  body: "Fairshare has been owned by the people it covers since 1948. There are no shareholders to pay, so what is left at the end of the year goes back into lower premiums and better cover.",
  points: [
    "New babies covered from birth, with no extra premium in their first year",
    "Physio, mental health and dental in every plan, not as add-ons",
    "Claims paid in four working days on average last year",
  ],
  action: { label: "Compare our three plans", href: "#plans" },
  note: "From £38 a month",
  photo: {
    src: "/ui/photos/split-card/parent.webp",
    alt: "A father holds his newborn in his arms by a tall window at home.",
    width: 800,
    height: 1067,
  },
}

export function SplitCard(props: Partial<SplitCardProps>) {
  const c = { ...splitCardDefaults, ...props }

  return (
    <section aria-labelledby="split-card-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Card className="grid gap-0 overflow-hidden rounded-3xl bg-muted/40 p-3 shadow-none ring-0 border border-border sm:p-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <img
            src={c.photo.src}
            alt={c.photo.alt}
            width={c.photo.width}
            height={c.photo.height}
            loading="lazy"
            className="aspect-[4/3] size-full rounded-2xl object-cover md:aspect-auto md:min-h-[520px]"
          />
          <div className="flex flex-col justify-center px-3 pt-8 pb-5 sm:px-6 md:px-10 md:py-12 lg:px-16">
            <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
            <h2
              id="split-card-title"
              className="mt-4 max-w-[18ch] text-[32px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[44px] lg:leading-[1.04] lg:tracking-[-0.024em]"
            >
              {c.title}
            </h2>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.5] text-muted-foreground">{c.body}</p>
            <ul className="mt-7 grid gap-3.5">
              {c.points.map((p) => (
                <li key={p} className="flex gap-3 text-[16px] leading-[1.45]">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={c.action.href} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6 text-[15px]")}>
                {c.action.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </a>
              <p className="text-[15px] font-medium text-muted-foreground">{c.note}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
