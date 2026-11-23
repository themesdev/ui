import { Bell, CalendarClock, Mail, ShoppingBasket, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Fact = { label: string; note: string }

export type NewsletterProps = {
  kicker: string
  title: string
  body: string
  photo: ImageRef
  /** The small tag on the photo: what this week's letter is. */
  tag: string
  /** The icon on the photo tag. */
  mark: LucideIcon
  form: { action: string; label: string; placeholder: string; submit: string; note: string; privacy: LinkRef }
  facts: Fact[]
}

export const newsletterDefaults: NewsletterProps = {
  kicker: "Vershoek weekly",
  title: "Next week's offers, in your inbox on Sunday",
  body: "The offers for all 38 Vershoek shops in Utrecht province, one seasonal recipe and what came in from local growers that week.",
  photo: {
    src: "/ui/photos/newsletter/crate.webp",
    alt: "A wooden crate of leeks, red apples, carrots and cauliflower",
    width: 480,
    height: 480,
  },
  tag: "Week 48: veg from Houten",
  mark: ShoppingBasket,
  form: {
    action: "/newsletter",
    label: "Email address",
    placeholder: "you@example.com",
    submit: "Subscribe",
    note: "One email a week. Unsubscribe with one click at the bottom of every letter.",
    privacy: { label: "How we use your address", href: "/privacy" },
  },
  facts: [
    { label: "Sundays at 18:00", note: "before the week's offers start" },
    { label: "41,600 households", note: "already read it" },
    { label: "€3 voucher", note: "in your first letter" },
  ],
}

const factIcons = [CalendarClock, Mail, Bell]

export function Newsletter(props: Partial<NewsletterProps>) {
  const c = { ...newsletterDefaults, ...props }
  const f = c.form
  const Mark = c.mark

  return (
    <section aria-labelledby="newsletter-title" className="bg-background py-20 text-foreground lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted/40">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,400px)] lg:items-center lg:gap-12 lg:p-12">
            <figure className="relative w-full max-w-[200px]">
              <img
                src={c.photo.src}
                alt={c.photo.alt}
                width={c.photo.width}
                height={c.photo.height}
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-background/95 px-3 py-2 text-[13px] leading-[1.25] font-medium shadow-sm">
                <Mark className="size-4 shrink-0" aria-hidden />
                {c.tag}
              </figcaption>
            </figure>

            <div>
              <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
              <h2
                id="newsletter-title"
                className="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[36px]"
              >
                {c.title}
              </h2>
              <p className="mt-4 max-w-[54ch] text-[17px] leading-[1.5] text-muted-foreground">{c.body}</p>
            </div>

            <div>
              <form action={f.action} method="post" className="grid gap-2.5">
                <Label htmlFor="newsletter-email" className="text-[14px]">
                  {f.label}
                </Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={f.placeholder}
                    aria-describedby="newsletter-note"
                    className="h-12 w-full rounded-xl bg-background px-4 sm:flex-1 text-base md:text-base"
                  />
                  <Button type="submit" className="h-12 rounded-xl px-6 text-[15px]">
                    {f.submit}
                  </Button>
                </div>
                <p id="newsletter-note" className="text-[13px] leading-[1.5] text-muted-foreground">
                  {f.note}{" "}
                  <a href={f.privacy.href} className="font-medium text-foreground underline underline-offset-2">
                    {f.privacy.label}
                  </a>
                </p>
              </form>
            </div>
          </div>

          <ul className="grid border-t border-border sm:grid-cols-3">
            {c.facts.map((fact, i) => {
              const Icon = factIcons[i % factIcons.length]
              return (
                <li
                  key={fact.label}
                  className="flex items-center gap-3 border-border px-6 py-5 not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l sm:px-10 lg:px-12"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-background ring-1 ring-border">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <p className="text-[15px] leading-[1.25]">
                    <span className="font-semibold">{fact.label}</span>{" "}
                    <span className="text-muted-foreground">{fact.note}</span>
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
