import { ArrowRight, Clock, Phone, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type FaqItem = { question: string; answer: string; link?: LinkRef }

export type FaqProps = {
  kicker: string
  title: string
  body: string
  /** Native details rows; the first starts open. */
  items: FaqItem[]
  help: { photo: ImageRef; title: string; body: string; phone: LinkRef; hours: string; action: LinkRef }
}

export const faqDefaults: FaqProps = {
  kicker: "Your appointment",
  title: "Before you come to the clinic",
  body: "Oogpunt sees 160 patients a day for cataract, glaucoma and retina care on the Rapenburg in Leiden. The questions our front desk hears most.",
  items: [
    {
      question: "Do I need a referral from my GP or optician?",
      answer:
        "Yes, for a first appointment we need a referral from your GP, optometrist or another medical specialist. They send it to us digitally, and we call you within three working days to plan your visit. For a follow-up you do not need a new referral.",
      link: { label: "What a referral should include", href: "#referral" },
    },
    {
      question: "How long will my first visit take?",
      answer:
        "Plan on two to three hours. We measure your eye pressure and sight, and usually widen your pupils with drops, which takes 30 minutes to work. Afterwards you see the ophthalmologist, who explains the results the same day.",
    },
    {
      question: "Can I drive home after the eye drops?",
      answer:
        "No. The drops blur your sight and make you sensitive to light for four to six hours. Come by public transport or ask someone to drive you; bus 5 stops 200 metres from the entrance, and the Garenmarkt car park is a five-minute walk.",
    },
    {
      question: "How do I change or cancel an appointment?",
      answer:
        "In the Mijn Oogpunt app, or by phone at least 24 hours ahead. A slot you give back goes to someone on the waiting list, which is now six weeks for a first visit.",
      link: { label: "Open Mijn Oogpunt", href: "#app" },
    },
    {
      question: "What should I bring?",
      answer:
        "Your ID, your insurance card, the glasses or lenses you wear now, and a list of the medicines you take, including eye drops. Wear your glasses rather than contact lenses on the day.",
    },
    {
      question: "Is my visit covered by my health insurance?",
      answer:
        "Yes, specialist eye care is part of the basic Dutch insurance. Your own risk (€385 in 2026) applies to the first visit of the year. Glasses and lenses are not covered by the basic insurance.",
    },
  ],
  help: {
    photo: {
      src: "/ui/photos/faq/desk.webp",
      alt: "A smiling receptionist with glasses behind the light wooden front desk of the clinic.",
      width: 840,
      height: 560,
    },
    title: "Ask the front desk",
    body: "Ilse and her team answer questions about appointments, referrals and getting here.",
    phone: { label: "071 512 40 80", href: "tel:+31715124080" },
    hours: "Weekdays 08:00 to 17:00",
    action: { label: "Send us a message", href: "#contact" },
  },
}

export function Faq(props: Partial<FaqProps>) {
  const c = { ...faqDefaults, ...props }

  return (
    <section aria-labelledby="faq-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20 lg:px-10">
        <div className="flex flex-col">
          <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
          <h2
            id="faq-title"
            className="mt-4 text-4xl leading-[1.08] font-bold tracking-[-0.018em] text-balance lg:text-[48px] lg:leading-[1.04] lg:tracking-[-0.024em]"
          >
            {c.title}
          </h2>
          <p className="mt-5 text-lg leading-[1.5] text-pretty text-muted-foreground">{c.body}</p>

          <div className="mt-10 lg:mt-auto lg:pt-12">
          <div className="rounded-3xl bg-muted/50 p-2">
            <img
              src={c.help.photo.src}
              alt={c.help.photo.alt}
              width={c.help.photo.width}
              height={c.help.photo.height}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-[18px] object-cover"
            />
            <div className="px-5 pt-5 pb-6">
              <h3 className="text-[22px] leading-[1.15] font-semibold tracking-[-0.01em]">{c.help.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-muted-foreground">{c.help.body}</p>
              <ul className="mt-5 grid gap-2.5 text-[15px]">
                <li className="flex items-center gap-3">
                  <Phone className="size-[18px] shrink-0" aria-hidden />
                  <a
                    href={c.help.phone.href}
                    className="rounded-sm font-semibold tabular-nums underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {c.help.phone.label}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="size-[18px] shrink-0" aria-hidden />
                  {c.help.hours}
                </li>
              </ul>
              <a
                href={c.help.action.href}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-6 h-11 w-full bg-background text-[15px]")}
              >
                {c.help.action.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </a>
            </div>
          </div>
          </div>
        </div>

        <div className="border-t-2 border-foreground">
          {c.items.map((item, i) => (
            <details
              key={item.question}
              name="faq"
              open={i === 0}
              className="group border-b border-border"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-7 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 lg:py-8 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[20px] leading-[1.25] font-bold text-pretty lg:text-[22px] lg:leading-[1.2]">
                  {item.question}
                </h3>
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-[background-color,color,transform] duration-200 group-open:rotate-45 group-open:border-foreground group-open:bg-foreground group-open:text-background">
                  <Plus className="size-4" strokeWidth={2.25} aria-hidden />
                </span>
              </summary>
              <div className="-mt-2 max-w-[62ch] pr-14 pb-8 text-[17px] leading-[1.6] text-muted-foreground">
                <p>{item.answer}</p>
                {item.link ? (
                  <a
                    href={item.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-sm font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {item.link.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
