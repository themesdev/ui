import { ArrowRight, CalendarDays, Mail, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Person = { name: string; role: string; photo: ImageRef }

export type CallToActionProps = {
  kicker: string
  title: string
  body: string
  /** Three ways in: call, mail, book. The last one is the primary. */
  actions: LinkRef[]
  people: Person[]
  /** One line next to the faces: who answers and how fast. */
  reply: string
}

export const callToActionDefaults: CallToActionProps = {
  kicker: "Oxbow, brand studio in Bristol",
  title: "Tell us what you are making",
  body: "A new name, a tired identity or a site that no longer fits. Send two lines and we will tell you honestly whether we are the right studio.",
  actions: [
    { label: "Call 0117 496 0381", href: "tel:+441174960381" },
    { label: "Email hello@oxbow.example", href: "mailto:hello@oxbow.example" },
    { label: "Book a 30-minute call", href: "#book" },
  ],
  people: [
    {
      name: "Maud Ellery",
      role: "Founder, strategy",
      photo: {
        src: "/ui/photos/call-to-action/maud.webp",
        alt: "Maud Ellery",
        width: 192,
        height: 192,
      },
    },
    {
      name: "Tobias Wren",
      role: "Founder, design",
      photo: {
        src: "/ui/photos/call-to-action/tobias.webp",
        alt: "Tobias Wren",
        width: 192,
        height: 192,
      },
    },
  ],
  reply: "Maud or Tobias answers every message within one working day.",
}

const ICONS = [Phone, Mail, CalendarDays]

export function CallToAction(props: Partial<CallToActionProps>) {
  const c = { ...callToActionDefaults, ...props }
  const last = c.actions.length - 1

  return (
    <section aria-labelledby="call-to-action-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="rounded-[28px] border bg-muted/40 px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
          <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
          <h2
            id="call-to-action-title"
            className="mx-auto mt-5 max-w-[14ch] text-[44px] leading-[1.04] font-semibold tracking-[-0.024em] text-balance sm:text-[60px] sm:leading-none sm:tracking-[-0.03em] lg:text-[84px]"
          >
            {c.title}
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-[17px] leading-[1.5] text-muted-foreground lg:text-[18px]">{c.body}</p>

          <ul className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {c.actions.map((a, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <li key={a.href}>
                  <a
                    href={a.href}
                    className={cn(
                      buttonVariants({ variant: i === last ? "default" : "outline", size: "lg" }),
                      "h-12 w-full rounded-full px-6 text-[15px] sm:w-auto",
                      i !== last && "border-foreground/25 bg-background"
                    )}
                  >
                    <Icon data-icon="inline-start" aria-hidden />
                    {a.label}
                    {i === last && <ArrowRight data-icon="inline-end" aria-hidden />}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-foreground/10 pt-8 sm:flex-row sm:gap-4 lg:mx-auto lg:max-w-[720px]">
            <div className="flex -space-x-3">
              {c.people.map((p) => (
                <Avatar key={p.name} className="size-12 ring-4 ring-background">
                  <AvatarImage src={p.photo.src} alt={p.photo.alt} width={96} height={96} />
                  <AvatarFallback>
                    {p.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-[15px] leading-[1.4] text-muted-foreground">{c.reply}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
