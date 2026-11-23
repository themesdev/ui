import { ArrowRight } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type TestimonialItem = { quote: string; name: string; role: string; photo?: ImageRef }
export type Stat = { value: string; label: string }

export type TestimonialProps = {
  /** Small heading over the panel; the quote is the anchor. */
  title: string
  testimonial: TestimonialItem
  /** Figures from the customer's own story, under the quote. */
  stats: Stat[]
  link: LinkRef
}

export const testimonialDefaults: TestimonialProps = {
  title: "Customer story",
  testimonial: {
    quote:
      "We used to close the month in eleven days, with three spreadsheets and a lot of hope. Since we moved our subscriptions to Sumwise, revenue is closed in four, and our auditor stopped asking for exports.",
    name: "Tomás Herrera",
    role: "Finance director, Rovald HR software, Rotterdam",
    photo: { src: "/ui/photos/testimonial/face.webp", alt: "", width: 192, height: 192 },
  },
  stats: [
    { value: "4 days", label: "to close revenue each month, was 11" },
    { value: "2,300", label: "subscriptions moved in one weekend" },
    { value: "€0", label: "spent on the audit follow-up" },
  ],
  link: { label: "Read how Rovald closes faster", href: "#rovald" },
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
}

export function Testimonial(props: Partial<TestimonialProps>) {
  const c = { ...testimonialDefaults, ...props }
  const t = c.testimonial

  return (
    <section aria-labelledby="testimonial-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <figure className="rounded-3xl bg-muted/50 px-7 py-12 sm:px-12 lg:px-20 lg:py-20">
          <h2
            id="testimonial-title"
            className="text-[13px] leading-[1.25] font-medium tracking-[0.08em] text-muted-foreground uppercase"
          >
            {c.title}
          </h2>
          <blockquote className="mt-6 max-w-[30ch] text-[26px] leading-[1.3] font-medium tracking-[-0.01em] text-pretty sm:text-[32px] lg:mt-8 lg:max-w-[34ch] lg:text-[40px] lg:leading-[1.22] lg:tracking-[-0.02em]">
            <p>“{t.quote}”</p>
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4 lg:mt-12">
            <Avatar className="size-16">
              {t.photo ? (
                <AvatarImage src={t.photo.src} alt={t.photo.alt} width={t.photo.width} height={t.photo.height} />
              ) : null}
              <AvatarFallback className="text-lg font-semibold">{initials(t.name)}</AvatarFallback>
            </Avatar>
            <p className="text-[16px] leading-[1.4]">
              <span className="block font-semibold">{t.name}</span>
              <span className="block text-muted-foreground">{t.role}</span>
            </p>
          </figcaption>

          <Separator className="mt-12 lg:mt-16" />

          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <dl className="grid gap-8 sm:grid-cols-3">
              {c.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="order-2 mt-3 max-w-[24ch] text-[15px] leading-[1.35] text-muted-foreground">{s.label}</dt>
                  <dd className="order-1 text-[44px] leading-[0.9] font-semibold tracking-[-0.035em] tabular-nums">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={c.link.href}
              className="inline-flex w-fit items-center gap-1.5 rounded-sm text-[15px] font-medium underline decoration-border decoration-2 underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {c.link.label}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </figure>
      </div>
    </section>
  )
}
