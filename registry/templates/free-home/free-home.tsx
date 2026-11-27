import { Anchor, Bike, CalendarDays, Car, ShieldCheck, Ship, Star, Users } from "lucide-react"

import { SiteHeader, type SiteHeaderProps } from "@/components/blocks/site-header"
import { Hero, type HeroProps } from "@/components/blocks/hero"
import { LinkCard, type LinkCardProps } from "@/components/blocks/link-card"
import { Pricing, type PricingProps } from "@/components/blocks/pricing"
import { Testimonial, type TestimonialProps } from "@/components/blocks/testimonial"
import { StatsRow, type StatsRowProps } from "@/components/blocks/stats-row"
import { Faq, type FaqProps } from "@/components/blocks/faq"
import { Newsletter, type NewsletterProps } from "@/components/blocks/newsletter"
import { SiteFooter, type SiteFooterProps } from "@/components/blocks/site-footer"

export type FreeHomePageContent = {
  header: Partial<SiteHeaderProps>
  hero: Partial<HeroProps>
  islands: Partial<LinkCardProps>
  fares: Partial<PricingProps>
  testimonial: Partial<TestimonialProps>
  stats: Partial<StatsRowProps>
  faq: Partial<FaqProps>
  newsletter: Partial<NewsletterProps>
  footer: Partial<SiteFooterProps>
}

export function FreeHomePage({ content = freeHomePageContent }: { content?: FreeHomePageContent }) {
  return (
    <>
      <SiteHeader {...content.header} />
      <main>
        <Hero {...content.hero} />
        <LinkCard {...content.islands} />
        <Pricing {...content.fares} />
        <Testimonial {...content.testimonial} />
        <StatsRow {...content.stats} />
        <Faq {...content.faq} />
        <Newsletter {...content.newsletter} />
      </main>
      <SiteFooter {...content.footer} />
    </>
  )
}

export default FreeHomePage

const img = (name: string, alt: string, width: number, height: number) => ({
  src: `/ui/photos/free-home/${name}.webp`,
  alt,
  width,
  height,
})

const phone = { label: "01632 960 418", href: "tel:+441632960418" }

// The demo business: Holmsound Ferries, Port Ardlan to the Corran Isles. Every word and photo on the page. A buyer
// replaces this object.
export const freeHomePageContent: FreeHomePageContent = {
  header: {
    brand: { label: "Holmsound", href: "#" },
    mark: <Ship className="size-6" strokeWidth={2.25} aria-hidden />,
    promise: "Book a car space up to 12 weeks ahead. On foot, just turn up.",
    utility: [
      { label: "Service updates", href: "#status" },
      { label: "Help", href: "#help" },
      { label: "Island residents", href: "#residents" },
      { label: "Sign in", href: "#sign-in" },
    ],
    nav: [
      { label: "Timetables", href: "#timetables" },
      { label: "Fares", href: "#fares" },
      { label: "Islands", href: "#islands" },
      { label: "With a car", href: "#cars" },
      { label: "Groups", href: "#groups" },
    ],
    current: "",
    search: { label: "Search Holmsound", placeholder: "Search sailings and islands", action: "#search" },
    saved: { label: "Saved journeys", href: "#saved" },
    bag: { label: "Basket", href: "#basket" },
  },
  hero: {
    notice: {
      text: "Eskay sailings on Saturday 28 November may be cancelled: a south-westerly gale is forecast.",
      link: { label: "Check before you travel", href: "#status" },
    },
    kicker: "Holmsound Ferries to the Corran Isles",
    mark: Anchor,
    title: "Where are you sailing today?",
    planner: {
      action: "#sailings",
      from: { label: "From", value: "Port Ardlan" },
      to: { label: "To", placeholder: "Island, pier or village" },
      depart: "Leave at",
      arrive: "Arrive by",
      date: { label: "Date", value: "2026-11-28" },
      time: { label: "Time", value: "09:40" },
      submit: "Find sailings",
      secondary: { label: "Book a car space", href: "#cars" },
    },
    help: { label: "Live sailing status", href: "#status" },
    feature: {
      badge: "Day trip on foot",
      title: "Walk the Ulvaig cliffs, home by tea",
      body: "The 08:15 boat lands you at Ulvaig pier by 09:05. Six miles to the lighthouse and back, and a day return costs £11.40, children £5.70.",
      link: { label: "Plan a day on Ulvaig", href: "#ulvaig" },
      photo: img(
        "feature",
        "Two walkers on a heather clifftop path above the sound, a small white ferry crossing the calm water below.",
        1200,
        750
      ),
    },
    tasks: [
      { label: "Tickets and passes", note: "Books of ten from £48", href: "#fares" },
      { label: "Timetables", note: "Winter times until 28 March", href: "#timetables" },
      { label: "Change or refund", note: "Free up to an hour before", href: "#change" },
      { label: "Bikes and kayaks", note: "Bikes free, kayaks £4 a way", href: "#bikes" },
    ],
  },
  islands: {
    kicker: "Four islands, one sound",
    title: "Where our boats go",
    body: "Up to twelve sailings a day in summer and eight in winter, all from the pier at Port Ardlan.",
    cities: [
      {
        name: "Corran Mhor",
        count: "35 min, 8 a day",
        href: "#corran-mhor",
        photo: img("corran", "White stone cottages along the harbour at Corran Mhor, small boats on still water.", 560, 700),
      },
      {
        name: "Ulvaig",
        count: "50 min, 4 a day",
        href: "#ulvaig",
        photo: img("ulvaig", "The white lighthouse on the rocky headland of Ulvaig, heather in flower below.", 560, 700),
      },
      {
        name: "Eskay",
        count: "70 min, 3 a day",
        href: "#eskay",
        photo: img("eskay", "A long white beach on Eskay with turquoise water and someone walking a dog.", 560, 700),
      },
      {
        name: "Little Corran",
        count: "15 min, on request",
        href: "#little-corran",
        photo: img("little-corran", "A stone bothy and a wooden jetty on Little Corran, sheep grazing around it.", 560, 700),
      },
    ],
    link: { label: "The full winter timetable", href: "#timetables" },
  },
  fares: {
    title: "Ten crossings for the price of seven",
    body: "Books of ten single crossings for people who sail often. Use them on any route in the book, share them with your household, and they last a year.",
    freePlan: { label: "buy a single crossing on board", href: "#singles" },
    billing: [
      { id: "foot", label: "On foot" },
      { id: "car", label: "With a car", badge: "Book ahead" },
    ],
    defaultBilling: "foot",
    featuredLabel: "Most bought",
    plans: [
      {
        name: "Short hop",
        line: "Little Corran and Corran Mhor.",
        prices: {
          foot: { price: "£48", period: "for ten single crossings, £4.80 each instead of £6.90" },
          car: { price: "£196", period: "for ten crossings with a car up to 5 metres, driver included" },
        },
        action: { label: "Buy Short hop", href: "#short-hop" },
        trial: { label: "see the single fares", href: "#singles" },
        allowances: [
          { icon: Ship, label: "Two routes" },
          { icon: Users, label: "Share with your household" },
          { icon: CalendarDays, label: "Valid for 12 months" },
          { icon: Bike, label: "Bikes always free" },
        ],
        featuresTitle: "Every book includes",
        features: [
          "Book car spaces online with the book",
          "Change a booking until an hour before",
          "Unused crossings refunded on request",
        ],
      },
      {
        name: "Island",
        line: "Adds Ulvaig, our walking island.",
        prices: {
          foot: { price: "£74", period: "for ten single crossings, £7.40 each instead of £10.60" },
          car: { price: "£298", period: "for ten crossings with a car up to 5 metres, driver included" },
        },
        action: { label: "Buy Island", href: "#island" },
        trial: { label: "see the single fares", href: "#singles" },
        allowances: [
          { icon: Ship, label: "Three routes" },
          { icon: Users, label: "Share with your household" },
          { icon: CalendarDays, label: "Valid for 12 months" },
          { icon: Car, label: "Car spaces held until 10 minutes before" },
        ],
        featuresTitle: "Everything in Short hop, plus",
        features: [
          "Boarding first on the 08:15 to Ulvaig",
          "Free parking at Ulvaig pier for 24 hours",
          "Kayaks carried free",
        ],
        featured: true,
      },
      {
        name: "All isles",
        line: "Every route, Eskay included.",
        prices: {
          foot: { price: "£96", period: "for ten single crossings, £9.60 each instead of £13.80" },
          car: { price: "£410", period: "for ten crossings with a car up to 5 metres, driver included" },
        },
        action: { label: "Buy All isles", href: "#all-isles" },
        trial: { label: "see the single fares", href: "#singles" },
        allowances: [
          { icon: Ship, label: "All four routes" },
          { icon: Users, label: "Share with your household" },
          { icon: CalendarDays, label: "Valid for 12 months" },
          { icon: Car, label: "Car spaces held until 10 minutes before" },
        ],
        featuresTitle: "Everything in Island, plus",
        features: [
          "Eskay sailings, Saturdays included",
          "A space kept on the last boat home",
          "Pallets on the car deck at half price",
        ],
      },
    ],
    compare: { label: "Compare every fare", href: "#fares" },
    aside: {
      photo: img(
        "resident",
        "A woman carrying two shopping bags walks along the island pier off the ferry, cars queued beside her.",
        600,
        800
      ),
      title: "Live on one of the islands?",
      body: "Residents pay half fare on every route with an Island Card. It is free to apply.",
      action: { label: "Apply for an Island Card", href: "#residents" },
    },
    note: "Prices in pounds, VAT included, for winter 2026 to 2027. Books are valid for 12 months from the first crossing; we refund unused crossings at the single fare, less £5.",
  },
  testimonial: {
    title: "From the islands",
    testimonial: {
      quote:
        "I run the shop on Eskay, so the 07:30 boat is my supply line. In four winters it has stayed in nine times, and each time someone rang me before I had left the house.",
      name: "Callum Rennie",
      role: "Eskay Stores, sailing with us since 2019",
      photo: img("face", "", 192, 192),
    },
    stats: [
      { value: "9", label: "sailings cancelled in four winters, all for gales" },
      { value: "07:30", label: "first boat to Eskay, Monday to Saturday" },
      { value: "£3.20", label: "for a pallet of shop goods on the car deck" },
    ],
    link: { label: "More from island customers", href: "#stories" },
  },
  stats: {
    kicker: "Holmsound Ferries, since 1974",
    title: "Fifty-two years on the same sound",
    intro:
      "Three boats, 41 crew and a slipway at every pier. We are still owned by the three families who ran the first passenger launch from Port Ardlan.",
    link: { label: "Meet the boats and crew", href: "#about" },
    photos: [
      img("crew", "A deckhand in an orange jacket and hard hat loops a mooring rope over a bollard on the pier.", 600, 800),
      img("ramp", "A small car ferry with its ramp down at a stone slipway below green cliffs.", 600, 800),
      img("deck", "A cyclist with his bike at the deck rail watching green cliffs go by.", 600, 800),
      img("dusk", "The ferry coming in to the pier at dusk, lit windows along the shore.", 600, 800),
    ],
    stats: [
      { value: "98.6%", label: "of sailings ran last year", note: "the rest stayed in for weather, never for want of crew" },
      { value: "212k", label: "passengers in 2025", note: "with 38,400 cars, vans and tractors" },
      { value: "15 min", label: "to Little Corran", note: "our shortest crossing; Eskay is the longest at 70" },
    ],
  },
  faq: {
    kicker: "Before you sail",
    title: "What people ask at the ticket office",
    body: "The questions our Port Ardlan office hears most, from car spaces to dogs on deck.",
    items: [
      {
        question: "Do I need to book?",
        answer:
          "On foot or with a bike, no: turn up and pay on board. Cars, vans and campers need a space, and the 08:15 and 17:30 boats fill a week ahead on Fridays and all summer.",
        link: { label: "Book a car space", href: "#cars" },
      },
      {
        question: "What happens if a sailing is cancelled?",
        answer:
          "We text and email everyone booked on it as soon as the skipper decides, usually by 06:30. Move to the next boat or take a full refund; we never charge to change.",
        link: { label: "Today's sailing status", href: "#status" },
      },
      {
        question: "How early should I arrive?",
        answer:
          "Thirty minutes before with a car, ten on foot. Car loading closes ten minutes before departure, and an empty space goes to the standby queue.",
      },
      {
        question: "Can I bring my dog?",
        answer:
          "Yes, dogs travel free on a lead, on the open deck or in the corner of the lounge kept for them. Assistance dogs can go anywhere on board.",
      },
      {
        question: "Is there food on board?",
        answer:
          "Hot drinks, soup and rolls on the Corran Mhor and Eskay boats. The Little Corran boat is too small for a galley, so bring a flask.",
      },
      {
        question: "Is the ferry step-free?",
        answer:
          "Every boat has a lift from the car deck to the lounge, and every pier has a ramp. Tell us when you book and the crew will meet you at the gangway.",
      },
    ],
    help: {
      photo: img("desk", "Morag smiling behind the wooden counter of the ticket office, the pier and sea through the window.", 840, 560),
      title: "Ask the ticket office",
      body: "Morag and the team answer questions on fares, bookings and getting to the pier.",
      phone,
      hours: "Every day 06:30 to 19:00",
      action: { label: "Send us a message", href: "#contact" },
    },
  },
  newsletter: {
    kicker: "Sailing notes",
    title: "Timetable changes, before they happen",
    body: "One email when the timetable changes, with island events and the weeks a boat goes in for overhaul.",
    photo: img("winter", "A small white ferry crossing a calm sea loch below snowy mountains in low winter sun.", 480, 480),
    tag: "December: winter timetable",
    mark: CalendarDays,
    form: {
      action: "/newsletter",
      label: "Email address",
      placeholder: "you@example.co.uk",
      submit: "Sign up",
      note: "About one email a month. Leave with one click at the bottom of any of them.",
      privacy: { label: "How we use your address", href: "#privacy" },
    },
    facts: [
      { label: "First of the month", note: "plus urgent changes" },
      { label: "5,800 readers", note: "most of them islanders" },
      { label: "Gale warnings", note: "by text, if you add a number" },
    ],
  },
  footer: {
    brand: { label: "Holmsound", href: "#" },
    mark: Ship,
    tagline:
      "Car and passenger ferries from Port Ardlan to Corran Mhor, Little Corran, Ulvaig and Eskay, every day the weather allows.",
    service: {
      title: "Ticket office",
      hours: "Every day 06:30 to 19:00",
      phone: phone.label,
      shops: { label: "Live sailing status", href: "#status" },
    },
    groups: [
      {
        title: "Sail with us",
        links: [
          { label: "Timetables", href: "#timetables" },
          { label: "Fares", href: "#fares" },
          { label: "Books of ten", href: "#books" },
          { label: "Book a car space", href: "#cars" },
          { label: "Island Card", href: "#residents" },
          { label: "Bikes and kayaks", href: "#bikes" },
          { label: "Groups and schools", href: "#groups" },
          { label: "Freight and pallets", href: "#freight" },
          { label: "Day trips", href: "#day-trips" },
          { label: "Corran Mhor", href: "#corran-mhor" },
          { label: "Little Corran", href: "#little-corran" },
          { label: "Ulvaig", href: "#ulvaig" },
          { label: "Eskay", href: "#eskay" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Service updates", href: "#status" },
          { label: "Change a booking", href: "#change" },
          { label: "Refunds", href: "#refunds" },
          { label: "Step-free travel", href: "#step-free" },
          { label: "Travelling with pets", href: "#pets" },
          { label: "Lost property", href: "#lost" },
        ],
      },
      {
        title: "Holmsound",
        links: [
          { label: "About us", href: "#about" },
          { label: "Our boats", href: "#boats" },
          { label: "Jobs at sea", href: "#jobs" },
          { label: "Port Ardlan pier", href: "#pier" },
          { label: "News", href: "#news" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    trust: [
      { label: "Full refund if we cancel", note: "Or move to the next boat", icon: ShieldCheck },
      { label: "4.7 from 3,180 reviews", note: "Asked after every crossing", icon: Star },
      { label: "Sailing since 1974", note: "Owned by three island families", icon: Anchor },
    ],
    copyright: "© 2026 Holmsound Ferries Ltd, Port Ardlan",
    legal: [
      { label: "Conditions of carriage", href: "#conditions" },
      { label: "Privacy", href: "#privacy" },
      { label: "Cookies", href: "#cookies" },
      { label: "Accessibility", href: "#accessibility" },
    ],
    age: {
      mark: "U16",
      lines: ["Under 16s travel with an adult.", "Under 5s sail free on every route."],
    },
  },
}
