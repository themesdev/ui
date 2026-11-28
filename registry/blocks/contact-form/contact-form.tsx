import { ArrowRight, Clock, LifeBuoy, MessageSquareText, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Channel = { label: string; value: string; note: string }
export type Testimonial = { quote: string; name: string; role: string; photo: ImageRef }

export type FieldText = { label: string; placeholder: string }

export type ContactFormProps = {
  kicker: string
  title: string
  body: string
  channels: Channel[]
  testimonial: Testimonial
  form: {
    title: string
    action: string
    reasonsLabel: string
    reasons: string[]
    submit: string
    consent: string
    privacy: LinkRef
    /** The email field. Defaults to "Work email", you@example.com. */
    email?: FieldText
    /** The message field. Defaults to "How can we help?" with a developer prompt as placeholder. */
    message?: FieldText
  }
}

const defaultEmail: FieldText = { label: "Work email", placeholder: "you@example.com" }
const defaultMessage: FieldText = { label: "How can we help?", placeholder: "Your stack, the size of your database, what you are trying to do" }

export const contactFormDefaults: ContactFormProps = {
  kicker: "Sales and support",
  title: "Talk to the engineers who build Quaywire",
  body: "Pricing for a large cluster, a demo on your own schema or a query plan that looks wrong: the message goes to our team in Amsterdam, not to a ticket queue.",
  channels: [
    { label: "Sales", value: "Within 4 working hours", note: "Mon to Fri, 08:00 to 18:00 CET" },
    { label: "Support on paid plans", value: "Within 1 hour", note: "Around the clock for Scale customers" },
  ],
  testimonial: {
    quote:
      "We put a GraphQL API on 340 Postgres tables in an afternoon. Their engineer stayed on the call until our first production query came back in 12 ms.",
    name: "Joris Verbeek",
    role: "Platform lead, Pakketpunt",
    photo: { src: "/ui/photos/contact-form/quote.webp", alt: "Joris Verbeek", width: 112, height: 112 },
  },
  form: {
    title: "Send us a message",
    action: "/contact",
    reasonsLabel: "What is it about?",
    reasons: ["Pricing", "A demo", "Technical support", "Something else"],
    submit: "Send message",
    consent: "We use your details only to answer this message and, if you ask for it, to follow up about Quaywire.",
    privacy: { label: "Privacy policy", href: "/privacy" },
    email: defaultEmail,
    message: defaultMessage,
  },
}

const channelIcons = [Users, LifeBuoy]
const field = "h-11 rounded-lg px-3.5 text-[15px] md:text-[15px]"

export function ContactForm(props: Partial<ContactFormProps>) {
  const c = { ...contactFormDefaults, ...props }
  const f = c.form
  const email = f.email ?? defaultEmail
  const message = f.message ?? defaultMessage
  const t = c.testimonial
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)

  return (
    <section aria-labelledby="contact-title" className="bg-background py-20 text-foreground lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid gap-10 rounded-3xl border border-border bg-muted/40 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16 lg:p-8">
          <div className="flex flex-col px-2 pt-6 sm:px-4 lg:px-6 lg:pt-10">
            <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
            <h2
              id="contact-title"
              className="mt-4 text-[34px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.024em]"
            >
              {c.title}
            </h2>
            <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.5] text-muted-foreground">{c.body}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {c.channels.map((ch, i) => {
                const Icon = channelIcons[i % channelIcons.length]
                return (
                  <div key={ch.label} className="relative pl-12">
                    <dt className="text-[14px] leading-[1.25] text-muted-foreground">
                      <span className="absolute top-0 left-0 grid size-9 place-items-center rounded-full bg-background ring-1 ring-border">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      {ch.label}
                    </dt>
                    <dd className="mt-1 text-[16px] leading-[1.25] font-semibold">{ch.value}</dd>
                    <dd className="mt-1 flex items-center gap-1.5 text-[13px] leading-[1.25] text-muted-foreground">
                      <Clock className="size-3.5" aria-hidden />
                      {ch.note}
                    </dd>
                  </div>
                )
              })}
            </dl>

            <figure className="mt-10 rounded-2xl border border-border bg-background p-6 lg:mt-auto lg:mb-6">
              <blockquote className="text-[19px] leading-[1.45] font-medium tracking-[-0.005em]">
                <p>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar className="size-11">
                  <AvatarImage src={t.photo.src} alt="" width={t.photo.width} height={t.photo.height} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="text-[14px] leading-[1.25]">
                  <p className="font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-xs sm:p-8">
            <p className="flex items-center gap-2 text-[18px] leading-[1.25] font-semibold">
              <MessageSquareText className="size-5" aria-hidden />
              {f.title}
            </p>
            <form action={f.action} method="post" className="mt-6 grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="contact-email">{email.label}</Label>
                <Input id="contact-email" name="email" type="email" autoComplete="email" required placeholder={email.placeholder} className={field} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-first">First name</Label>
                  <Input id="contact-first" name="firstName" autoComplete="given-name" required className={field} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-last">Last name</Label>
                  <Input id="contact-last" name="lastName" autoComplete="family-name" required className={field} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-company">
                  Company <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input id="contact-company" name="company" autoComplete="organization" className={field} />
              </div>
              <fieldset className="grid gap-2.5">
                <legend className="mb-2.5 text-sm leading-none font-medium">{f.reasonsLabel}</legend>
                <div className="flex flex-wrap gap-2">
                  {f.reasons.map((r, i) => (
                    <label key={r} className="cursor-pointer">
                      <input type="radio" name="reason" value={r} defaultChecked={i === 0} className="peer sr-only" />
                      <span className="inline-flex h-9 items-center rounded-full border border-border px-4 text-[14px] font-medium text-muted-foreground transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 hover:text-foreground">
                        {r}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-2">
                <Label htmlFor="contact-message">{message.label}</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder={message.placeholder}
                  className="min-h-28 rounded-lg px-3.5 py-3 text-[15px] md:text-[15px]"
                />
              </div>
              <p className="text-[13px] leading-[1.5] text-muted-foreground">
                {f.consent}{" "}
                <a href={f.privacy.href} className="font-medium text-foreground underline underline-offset-2">
                  {f.privacy.label}
                </a>
              </p>
              <Button type="submit" className="h-12 w-full rounded-lg text-[15px]">
                {f.submit}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
