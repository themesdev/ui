import { CalendarCheck, Clock, CreditCard, Heart, PawPrint, Pill, ShieldCheck, Stethoscope } from "lucide-react"

import { SiteHeader, type SiteHeaderProps } from "@/components/blocks/site-header"
import { BreadcrumbTrail, type BreadcrumbTrailProps } from "@/components/blocks/breadcrumb-trail"
import { ContactForm, type ContactFormProps } from "@/components/blocks/contact-form"
import { PlainTiles, type PlainTilesProps } from "@/components/blocks/plain-tiles"
import { LiftCard, type LiftCardProps } from "@/components/blocks/lift-card"
import { SiteFooter, type SiteFooterProps } from "@/components/blocks/site-footer"
import { MapEmbed, type MapEmbedProps } from "@/components/ui/map-embed"
import { SectionHeader } from "@/components/ui/section-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type OpeningHours = {
  kicker: string
  title: string
  description: string
  map: Omit<MapEmbedProps, "className">
  caption: string
  head: [string, string, string]
  rows: [string, string, string][]
  note: string
}

export type FreeContactPageContent = {
  header: Partial<SiteHeaderProps>
  /** The page's one h1, set as a small label over the form. */
  heading: string
  breadcrumb: Partial<BreadcrumbTrailProps>
  form: Partial<ContactFormProps>
  visit: OpeningHours
  vets: Partial<PlainTilesProps>
  ways: Partial<LiftCardProps>
  footer: Partial<SiteFooterProps>
}

export function FreeContactPage({ content = freeContactPageContent }: { content?: FreeContactPageContent }) {
  const v = content.visit
  return (
    <>
      <SiteHeader {...content.header} />
      <main>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 pt-8 sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:pt-10">
          <h1 className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{content.heading}</h1>
          <BreadcrumbTrail {...content.breadcrumb} />
        </div>
        <div className="-mt-12 lg:-mt-16">
          <ContactForm {...content.form} />
        </div>

        <section aria-labelledby="visit-title" className="bg-background pb-20 lg:pb-28">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <SectionHeader id="visit-title" kicker={v.kicker} title={v.title} description={v.description} />
            <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
              <MapEmbed {...v.map} />
              <div>
                <p className="flex items-center gap-2 text-[18px] leading-[1.25] font-semibold">
                  <Clock className="size-5" aria-hidden />
                  {v.caption}
                </p>
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      {v.head.map((h) => (
                        <TableHead key={h} className="h-11 px-0 text-[14px] first:w-[38%]">
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {v.rows.map(([day, surgery, reception]) => (
                      <TableRow key={day}>
                        <TableCell className="px-0 py-3.5 text-[15px] font-medium whitespace-normal">{day}</TableCell>
                        <TableCell className="px-0 py-3.5 text-[15px] whitespace-normal tabular-nums">{surgery}</TableCell>
                        <TableCell className="px-0 py-3.5 text-[15px] whitespace-normal text-muted-foreground tabular-nums">{reception}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="mt-5 text-[15px] leading-[1.5] text-muted-foreground">{v.note}</p>
              </div>
            </div>
          </div>
        </section>

        <PlainTiles {...content.vets} />
        <LiftCard {...content.ways} />
      </main>
      <SiteFooter {...content.footer} />
    </>
  )
}

export default FreeContactPage

const img = (name: string, alt: string, width: number, height: number) => ({
  src: `/ui/photos/free-contact/${name}.webp`,
  alt,
  width,
  height,
})

const phone = { label: "01632 960 233", href: "tel:+441632960233" }

// The demo business: Hollybank Vets, a three-vet practice in Kendal. Every word and photo on the page. A buyer replaces
// this object.
export const freeContactPageContent: FreeContactPageContent = {
  header: {
    brand: { label: "Hollybank Vets", href: "#" },
    mark: <PawPrint className="size-6" strokeWidth={2.25} aria-hidden />,
    promise: `Emergency, day or night: ${phone.label}`,
    utility: [
      { label: "Register your pet", href: "#register" },
      { label: "Repeat prescriptions", href: "#prescriptions" },
      { label: "Pay a bill", href: "#pay" },
      { label: "Client login", href: "#sign-in" },
    ],
    nav: [
      { label: "Services", href: "#services" },
      { label: "Our vets", href: "#vets" },
      { label: "Prices", href: "#prices" },
      { label: "New clients", href: "#new-clients" },
      { label: "Contact", href: "#contact" },
    ],
    current: "#contact",
    search: { label: "Search Hollybank Vets", placeholder: "Search advice", action: "#search" },
    saved: { label: "Saved pages", href: "#saved" },
    bag: { label: "Pet food basket", href: "#basket" },
  },
  heading: "Contact Hollybank Vets, Kendal",
  breadcrumb: {
    items: [
      { label: "Home", href: "#" },
      { label: "Contact" },
    ],
  },
  form: {
    kicker: "Hollybank Vets, Kendal",
    title: "Talk to the practice",
    body: "Ring us for anything urgent. For a booking, a repeat prescription or a question about a bill, send the form and reception replies the same working day.",
    channels: [
      { label: "Reception", value: phone.label, note: "Monday to Friday, 08:00 to 18:30" },
      { label: "Saturdays", value: "09:00 to 13:00", note: "Book from the Thursday before" },
      { label: "Emergencies", value: "Same number, 24 hours", note: "A vet answers, every night" },
      { label: "Repeat prescriptions", value: "Ready in 1 working day", note: "Order by phone or form" },
    ],
    testimonial: {
      quote:
        "Our spaniel swallowed a sock at ten on a Sunday night. A vet picked up on the second ring and we were on the table within the hour.",
      name: "Martin Holroyd",
      role: "Owner of Biscuit, a cocker spaniel, Staveley",
      photo: img("face", "Martin Holroyd", 192, 192),
    },
    form: {
      title: "Send us a message",
      action: "/contact",
      reasonsLabel: "What is it about?",
      reasons: ["Book a visit", "A prescription", "A bill", "Something else"],
      submit: "Send message",
      consent: "We use your details only to answer this message and to find your pet's records. We never share them.",
      privacy: { label: "Privacy policy", href: "#privacy" },
      email: { label: "Your email", placeholder: "you@example.co.uk" },
      message: { label: "What is happening?", placeholder: "Your pet's age, what you have noticed and since when" },
      extra: { label: "Pet's name", optional: "(optional)", name: "pet", autoComplete: "off" },
    },
  },
  visit: {
    kicker: "Visit us",
    title: "Find the surgery",
    description: "Twelve free parking spaces behind the building, a ramp at the front door and a quiet waiting room for cats.",
    map: { name: "Hollybank Vets", address: "12 Mill Lane, Kendal LA9 5ZZ", lat: 54.3281, lon: -2.7462 },
    caption: "Opening hours",
    head: ["Day", "Consultations", "Reception"],
    rows: [
      ["Monday to Friday", "08:30 to 18:00", "08:00 to 18:30"],
      ["Saturday", "09:00 to 12:30", "09:00 to 13:00"],
      ["Sunday", "Emergencies only", "Phone answered by the vet"],
      ["Bank holidays", "Emergencies only", "Phone answered by the vet"],
    ],
    note: "Every night, weekend and bank holiday one of our three vets is on call and sees emergencies at the surgery, never at an out-of-area clinic.",
  },
  vets: {
    title: "Three vets, one practice",
    body: "Hollybank has looked after the pets and farms of South Lakeland since 1998. You see the same vet whenever you can, and they have your pet's whole history in front of them.",
    tiles: [
      {
        kicker: "Dogs and small animals",
        title: "Dr Priya Nair",
        body: "Joined in 2014 and runs the dental clinic. Booked on Mondays, Wednesdays and Fridays, with the first appointment at 08:30.",
        photo: img("nair", "Dr Priya Nair in navy scrubs gently examines a golden retriever on the table of a bright consulting room.", 800, 533),
      },
      {
        kicker: "Cats and rabbits",
        title: "Dr Tom Hale",
        body: "Runs our cat-friendly clinic on Tuesdays and Thursdays, with its own quiet room and a separate door to the waiting area.",
        photo: img("hale", "Dr Tom Hale in green scrubs holds a calm tabby cat on a consulting table while its owner smiles beside him.", 800, 533),
      },
      {
        kicker: "Farm and horse",
        title: "Dr Ailsa Brandt",
        body: "On the road from 07:00 to 16:00 across South Lakeland, and in the surgery on Saturdays. Ring the main number to book a visit.",
        photo: img("farm", "Dr Ailsa Brandt in green waterproof overalls and wellington boots stands beside a stone gate in a hill field with sheep.", 800, 533),
      },
    ],
    action: { label: "Book an appointment", href: "#book" },
    link: { label: "Join the practice", href: "#jobs" },
  },
  ways: {
    kicker: "Before you visit",
    title: "Four things we do every day",
    body: "Most of what brings people to reception, without the queue: an emergency at night, a new pet, a repeat prescription or a bill to spread.",
    feature: {
      kicker: "Open every day",
      title: "Emergencies seen at the surgery, at any hour",
      href: "#emergency",
      photo: img("night", "A veterinary nurse in navy scrubs holds a small terrier puppy wrapped in a towel in a quiet, lamplit consulting room.", 720, 960),
    },
    items: [
      {
        icon: Stethoscope,
        label: "Emergencies",
        figure: "24",
        unit: "hours",
        text: "A vet answers the main number every night, weekend and bank holiday.",
        action: "What counts as an emergency",
        href: "#emergency",
      },
      {
        icon: CalendarCheck,
        label: "New pets",
        figure: "15",
        unit: "minutes",
        text: "A free health check with a nurse when you register a puppy, kitten or rabbit.",
        action: "Register your pet",
        href: "#register",
      },
      {
        icon: Pill,
        label: "Prescriptions",
        figure: "1",
        unit: "day",
        text: "Repeat medicines ready at reception one working day after you order them.",
        action: "Order a repeat",
        href: "#prescriptions",
      },
      {
        icon: CreditCard,
        label: "Payment plans",
        figure: "6",
        unit: "months",
        text: "Spread the cost of planned work such as dental surgery, with no interest.",
        action: "See payment plans",
        href: "#instalments",
      },
    ],
  },
  footer: {
    brand: { label: "Hollybank Vets", href: "#" },
    mark: PawPrint,
    tagline: "A three-vet practice for dogs, cats, small animals, farms and horses in Kendal and South Lakeland, open every day of the year for emergencies.",
    service: {
      title: "Ring reception",
      hours: "Monday to Friday 08:00 to 18:30",
      phone: phone.label,
      shops: { label: "Find the surgery", href: "#visit-title" },
    },
    groups: [
      {
        title: "Our care",
        links: [
          { label: "Check-ups", href: "#check-ups" },
          { label: "Vaccinations", href: "#vaccinations" },
          { label: "Neutering", href: "#neutering" },
          { label: "Dental care", href: "#dental" },
          { label: "Surgery", href: "#surgery" },
          { label: "Scans and x-rays", href: "#scans" },
          { label: "Senior pet clinic", href: "#senior" },
          { label: "Puppy and kitten care", href: "#puppy" },
          { label: "Microchipping", href: "#microchip" },
          { label: "Farm visits", href: "#farm" },
          { label: "Horses", href: "#horses" },
          { label: "Emergencies", href: "#emergency" },
          { label: "End-of-life care", href: "#end-of-life" },
          { label: "Pet food and medicines", href: "#shop" },
        ],
      },
      {
        title: "Pet advice",
        links: [
          { label: "Ticks and fleas", href: "#ticks" },
          { label: "Worming", href: "#worming" },
          { label: "Weight and diet", href: "#diet" },
          { label: "Seasonal dangers", href: "#dangers" },
          { label: "Insurance", href: "#insurance" },
          { label: "Prices", href: "#prices" },
        ],
      },
      {
        title: "Clients",
        links: [
          { label: "Register your pet", href: "#register" },
          { label: "Repeat prescriptions", href: "#prescriptions" },
          { label: "Pay a bill", href: "#pay" },
          { label: "Client login", href: "#sign-in" },
          { label: "Opening hours", href: "#visit-title" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Hollybank",
        links: [
          { label: "Our vets", href: "#vets" },
          { label: "Our nurses", href: "#nurses" },
          { label: "Jobs", href: "#jobs" },
          { label: "Student placements", href: "#students" },
          { label: "Practice news", href: "#news" },
          { label: "Make a complaint", href: "#complaints" },
        ],
      },
    ],
    trust: [
      { label: "A vet on call every night", note: "Emergencies seen at the surgery", icon: Stethoscope },
      { label: "Fixed price vaccinations", note: "Dog booster £52, cat £44", icon: ShieldCheck },
      { label: "Independent since 1998", note: "Owned by our three vets", icon: Heart },
    ],
    copyright: "© 2026 Hollybank Veterinary Practice Ltd, Kendal",
    legal: [
      { label: "Privacy", href: "#privacy" },
      { label: "Cookies", href: "#cookies" },
      { label: "Terms of care", href: "#terms" },
      { label: "Accessibility", href: "#accessibility" },
    ],
    age: null,
  },
}
