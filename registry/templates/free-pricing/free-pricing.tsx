import { CalendarCheck, Clock, Gauge, Scissors, ShieldCheck, Store, Undo2, Users } from "lucide-react"

import { HeaderBar, type HeaderBarProps } from "@/components/blocks/header-bar"
import { Pricing, type PricingProps } from "@/components/blocks/pricing"
import { LogoStrip, type LogoStripProps } from "@/components/blocks/logo-strip"
import { ComparisonTable, type ComparisonTableProps } from "@/components/blocks/comparison-table"
import { Testimonial, type TestimonialProps } from "@/components/blocks/testimonial"
import { Faq, type FaqProps } from "@/components/blocks/faq"
import { SiteFooter, type SiteFooterProps } from "@/components/blocks/site-footer"

export type FreePricingPageContent = {
  header: Partial<HeaderBarProps>
  /** The page's one h1, set as a small label over the plans. */
  heading: string
  plans: Partial<PricingProps>
  customers: Partial<LogoStripProps>
  compare: Partial<ComparisonTableProps>
  testimonial: Partial<TestimonialProps>
  faq: Partial<FaqProps>
  footer: Partial<SiteFooterProps>
}

export function FreePricingPage({ content = freePricingPageContent }: { content?: FreePricingPageContent }) {
  return (
    <>
      <HeaderBar {...content.header} />
      <main>
        <div className="mx-auto max-w-[1280px] px-6 pt-12 lg:px-10 lg:pt-16">
          <h1 className="text-center text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{content.heading}</h1>
        </div>
        <div className="-mt-10 lg:-mt-14">
          <Pricing {...content.plans} />
        </div>
        <LogoStrip {...content.customers} />
        <ComparisonTable {...content.compare} />
        <Testimonial {...content.testimonial} />
        <Faq {...content.faq} />
      </main>
      <SiteFooter {...content.footer} />
    </>
  )
}

export default FreePricingPage

const img = (name: string, alt: string, width: number, height: number) => ({
  src: `/ui/photos/free-pricing/${name}.webp`,
  alt,
  width,
  height,
})

const phone = { label: "0161 496 0842", href: "tel:+441614960842" }

// The demo business: Combline, online booking and reminders for hair and barber salons in the UK. Every word and photo
// on the page. A buyer replaces this object.
export const freePricingPageContent: FreePricingPageContent = {
  header: {
    brand: { label: "Combline", href: "#" },
    mark: <Scissors className="size-4" strokeWidth={2.5} aria-hidden />,
    links: [
      { label: "Product", href: "#product" },
      { label: "Pricing", href: "#pricing" },
      { label: "Customers", href: "#customers" },
      { label: "Help centre", href: "#help" },
    ],
    current: "#pricing",
    secondary: { label: "Sign in", href: "#sign-in" },
    search: { label: "Search the help centre", href: "#search", keys: "⌘K" },
    action: { label: "Start free trial", href: "#trial" },
  },
  heading: "Combline pricing for hair and barber salons",
  plans: {
    title: "Three plans, no setup fee",
    body: "Combline keeps the diaries of 2,300 salons and barbershops full, with online booking and reminders that cut no-shows. You pay by the month and can leave whenever you like.",
    freePlan: { label: "try it free for 30 days", href: "#trial" },
    billing: [
      { id: "monthly", label: "Monthly" },
      { id: "yearly", label: "Yearly", badge: "2 months free" },
    ],
    defaultBilling: "monthly",
    featuredLabel: "Most chosen",
    plans: [
      {
        name: "Chair",
        line: "For one stylist or barber.",
        prices: {
          monthly: { price: "£12", period: "per month, billed monthly, plus VAT" },
          yearly: { price: "£10", period: "per month, £120 billed yearly, plus VAT" },
        },
        action: { label: "Get Chair", href: "#chair" },
        trial: { label: "start a 30-day trial", href: "#trial-chair" },
        allowances: [
          { icon: Users, label: "1 diary" },
          { icon: Gauge, label: "300 reminders a month" },
          { icon: Store, label: "1 location" },
          { icon: CalendarCheck, label: "Your own booking page" },
        ],
        featuresTitle: "Everything you need to start",
        features: [
          "Online booking, day and night",
          "Text and email reminders",
          "Deposits taken by card",
          "Client notes and colour history",
        ],
      },
      {
        name: "Salon",
        line: "For a team of two to six chairs.",
        prices: {
          monthly: { price: "£34", period: "per month, billed monthly, plus VAT" },
          yearly: { price: "£28", period: "per month, £336 billed yearly, plus VAT" },
        },
        action: { label: "Get Salon", href: "#salon" },
        trial: { label: "start a 30-day trial", href: "#trial-salon" },
        allowances: [
          { icon: Users, label: "Up to 6 diaries" },
          { icon: Gauge, label: "1,500 reminders a month" },
          { icon: Store, label: "1 location" },
          { icon: CalendarCheck, label: "Booking widget for your site" },
        ],
        featuresTitle: "Everything in Chair, plus",
        features: [
          "A waitlist that fills cancelled slots",
          "Rotas and holiday cover",
          "Product sales and stock counts",
          "Takings reported by stylist",
          "Support answered within 2 hours",
        ],
      },
      {
        name: "Group",
        line: "For two or more sites.",
        prices: {
          monthly: { price: "£89", period: "per month, billed monthly, plus VAT" },
          yearly: { price: "£74", period: "per month, £888 billed yearly, plus VAT" },
        },
        action: { label: "Get Group", href: "#group" },
        trial: { label: "start a 30-day trial", href: "#trial-group" },
        allowances: [
          { icon: Users, label: "Unlimited diaries" },
          { icon: Gauge, label: "5,000 reminders a month" },
          { icon: Store, label: "Up to 5 locations" },
          { icon: CalendarCheck, label: "One client list across sites" },
        ],
        featuresTitle: "Everything in Salon, plus",
        features: [
          "Opening hours and prices per site",
          "Commission export for payroll",
          "Staff who work at more than one site",
          "A named contact person",
        ],
      },
    ],
    compare: { label: "Compare all features", href: "#compare" },
    aside: {
      photo: img("aside", "A hairdresser in a black apron checks the appointment diary on a tablet at the salon's white reception counter.", 600, 750),
      title: "Running six or more salons?",
      body: "One price per site, one invoice and an onboarding day with us in your salon.",
      action: { label: "Talk to our team", href: "#talk" },
    },
    note: "Prices in pounds, plus VAT. Cancel before your next billing date and you pay nothing more; yearly plans are refunded for the full months you have left.",
  },
  customers: {
    title: "2,300 UK salons run on Combline",
    logos: [
      { name: "Loft & Lather", href: "#loft-lather" },
      { name: "Hairloom", href: "#hairloom" },
      { name: "The Fade Room", href: "#fade-room" },
      { name: "Marlowe", href: "#marlowe" },
      { name: "Nine Chairs", href: "#nine-chairs" },
      { name: "Tangle", href: "#tangle" },
      { name: "Rook & Raven", href: "#rook-raven" },
    ],
    link: { label: "How Hairloom filled 31% more chairs", href: "#case-hairloom" },
  },
  compare: {
    kicker: "Compare",
    title: "Combline next to the alternatives",
    body: "Here is what four stylists pay and get with us, with a paper diary and with a typical booking app, including where we are not the cheapest.",
    pros: {
      title: "Where we are strong",
      items: [
        "Reminders are included, not sold by the text",
        "Deposits and a waitlist cut no-shows by 7 in 10",
        "No fee per booking, however busy you get",
        "UK phone support until 18:00 on weekdays",
      ],
    },
    cons: {
      title: "Where we are not",
      items: [
        "A paper diary costs nothing, if you can bear the phone calls",
        "No payroll: we export to the software you already use",
        "No card reader of our own; we work with the one you have",
      ],
    },
    columns: [
      { name: "Combline", note: "Salon plan", action: { label: "Start free trial", href: "#trial" }, featured: true },
      { name: "Paper diary", note: "And a busy phone" },
      { name: "Booking apps", note: "Typical, monthly" },
    ],
    rows: [
      { label: "Monthly cost for 4 stylists", note: "Excluding VAT", values: ["£34", "£0", "£45 to £120"] },
      { label: "Reminders by text and email", values: [true, false, "Extra charge"] },
      { label: "Deposits to cut no-shows", values: [true, false, true] },
      { label: "Waitlist for cancelled slots", values: [true, false, false] },
      { label: "Colour formulas on the client card", values: [true, "Index cards", false] },
      { label: "Fee per booking", values: ["None", "None", "Up to 1.5%"] },
      { label: "Support by phone", values: ["Mon to Fri until 18:00", false, "Email only"] },
    ],
    caption: "Combline compared with a paper diary and a typical online booking app for a four-chair salon",
    note: "Prices for a salon with four stylists, in November 2026. Booking apps vary: we looked at the prices of six that UK salons use and show the range.",
    updated: "Updated 20 November 2026",
  },
  testimonial: {
    title: "From a salon owner",
    testimonial: {
      quote:
        "We had fourteen no-shows a month. Deposits and reminders took it to two, and Saturday mornings stopped being a guessing game.",
      name: "Janine Okafor",
      role: "Owner, Loft & Lather, Bristol",
      photo: img("face", "", 192, 192),
    },
    stats: [
      { value: "2", label: "no-shows a month, down from 14" },
      { value: "9 min", label: "to move four diaries from paper" },
      { value: "£310", label: "a month back in chairs that stay full" },
    ],
    link: { label: "Read how Loft & Lather did it", href: "#case-loft" },
  },
  faq: {
    kicker: "Before you sign up",
    title: "Questions salon owners ask",
    body: "What we hear most from owners who are moving their diary from paper or from another app.",
    items: [
      {
        question: "Do I need a card to start the trial?",
        answer:
          "No. The 30 days are free with every feature of the plan you pick. We ask for a card only when you decide to carry on, and we email you a week before the trial ends.",
        link: { label: "Start a free trial", href: "#trial" },
      },
      {
        question: "Can I move my clients from another system?",
        answer:
          "Yes. Send us a spreadsheet or an export from your old app and we load your clients, notes and future bookings for you, usually within one working day. Nobody gets an email until you say so.",
      },
      {
        question: "What does a reminder cost?",
        answer:
          "Nothing. Texts and emails are included up to the limit of your plan, and over it we charge 4p a text. We warn you at 80% of your limit, so a quiet or a busy month never surprises you.",
      },
      {
        question: "Can I change plan or leave whenever I like?",
        answer:
          "At any time, from the settings page. Changes start from your next billing date. If you leave we keep your client list for 90 days, and you can export it as a spreadsheet whenever you want.",
      },
      {
        question: "How do deposits reach me?",
        answer:
          "Through your own Stripe or card reader account, so the money goes straight to your bank, usually the next working day. Combline never holds your takings and takes no cut of them.",
      },
      {
        question: "Where is my clients' data kept?",
        answer:
          "On servers in London, encrypted, and never sold or used for marketing. You are the controller of your clients' details and we are the processor; our data agreement is one page of plain English.",
      },
    ],
    help: {
      photo: img("support", "A support adviser with a headset smiles at his laptop at a tidy desk by a bright window.", 840, 560),
      title: "Ask the Combline team",
      body: "Sam and the team answer questions about moving your diary and how reminders work.",
      phone,
      hours: "Weekdays 08:00 to 18:00",
      action: { label: "Send us a message", href: "#contact" },
    },
  },
  footer: {
    brand: { label: "Combline", href: "#" },
    mark: Scissors,
    tagline: "Online booking and reminders for hair salons and barbershops across the UK, built and supported from Manchester.",
    service: {
      title: "Talk to a person",
      hours: "Weekdays 08:00 to 18:00",
      phone: phone.label,
      shops: { label: "Book a demo", href: "#demo" },
    },
    groups: [
      {
        title: "Product",
        links: [
          { label: "Online booking", href: "#booking" },
          { label: "Reminders", href: "#reminders" },
          { label: "Deposits", href: "#deposits" },
          { label: "Waitlist", href: "#waitlist" },
          { label: "Client cards", href: "#clients" },
          { label: "Rotas and holidays", href: "#rotas" },
          { label: "Product sales", href: "#sales" },
          { label: "Reports", href: "#reports" },
          { label: "Booking widget", href: "#widget" },
          { label: "Multi-site", href: "#multi-site" },
          { label: "Mobile app", href: "#app" },
          { label: "What is new", href: "#changelog" },
          { label: "Pricing", href: "#pricing" },
          { label: "Integrations", href: "#integrations" },
        ],
      },
      {
        title: "Salons",
        links: [
          { label: "Hair salons", href: "#hair" },
          { label: "Barbershops", href: "#barbers" },
          { label: "Mobile stylists", href: "#mobile" },
          { label: "Chair renters", href: "#renters" },
          { label: "Customer stories", href: "#customers" },
          { label: "Salon owner guides", href: "#guides" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help centre", href: "#help" },
          { label: "Move your diary", href: "#move" },
          { label: "Contact us", href: "#contact" },
          { label: "System status", href: "#status" },
          { label: "Book a demo", href: "#demo" },
          { label: "Trainers' sessions", href: "#training" },
        ],
      },
      {
        title: "Combline",
        links: [
          { label: "About us", href: "#about" },
          { label: "Jobs", href: "#jobs" },
          { label: "Data and security", href: "#security" },
          { label: "Partners", href: "#partners" },
          { label: "Journal", href: "#journal" },
          { label: "Press", href: "#press" },
        ],
      },
    ],
    trust: [
      { label: "Data kept in the UK", note: "On servers in London", icon: ShieldCheck },
      { label: "30 days free", note: "No card needed to start", icon: Clock },
      { label: "Leave whenever you like", note: "You keep your client list", icon: Undo2 },
    ],
    copyright: "© 2026 Combline Ltd, Manchester",
    legal: [
      { label: "Terms", href: "#terms" },
      { label: "Privacy", href: "#privacy" },
      { label: "Cookies", href: "#cookies" },
      { label: "Data agreement", href: "#dpa" },
      { label: "Accessibility", href: "#accessibility" },
    ],
    age: null,
  },
}
