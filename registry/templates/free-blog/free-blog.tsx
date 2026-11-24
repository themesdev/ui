import { CalendarDays, Mail, Sun, Wheat } from "lucide-react"

import { SiteHeader, type SiteHeaderProps } from "@/components/blocks/site-header"
import { PostGrid, type PostGridProps } from "@/components/blocks/post-grid"
import { NumberedPagination, type NumberedPaginationProps } from "@/components/blocks/numbered-pagination"
import { Newsletter, type NewsletterProps } from "@/components/blocks/newsletter"
import { SiteFooter, type SiteFooterProps } from "@/components/blocks/site-footer"
import { SectionHeader, type SectionHeaderProps } from "@/components/ui/section-header"
import { StoryCard, type StoryCardProps } from "@/components/ui/story-card"
import { Tag, TagList } from "@/components/ui/tag"

export type FreeBlogPageContent = {
  header: Partial<SiteHeaderProps>
  /** The page's one h1, with the journal's intro. */
  intro: Pick<SectionHeaderProps, "kicker" | "title" | "description">
  topics: { label: string; tags: { label: string; href: string }[] }
  lead: StoryCardProps
  posts: Partial<PostGridProps>
  pager: Partial<NumberedPaginationProps>
  newsletter: Partial<NewsletterProps>
  footer: Partial<SiteFooterProps>
}

export function FreeBlogPage({ content = freeBlogPageContent }: { content?: FreeBlogPageContent }) {
  return (
    <>
      <SiteHeader {...content.header} />
      <main>
        <section aria-labelledby="journal-title" className="bg-background pt-14 pb-16 lg:pt-20 lg:pb-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <SectionHeader
              as="h1"
              id="journal-title"
              kicker={content.intro.kicker}
              title={content.intro.title}
              description={content.intro.description}
              className="[&_h1]:text-[40px] [&_h1]:leading-[1.04] [&_h1]:tracking-[-0.024em] lg:[&_h1]:text-[56px]"
            />
            <TagList label={content.topics.label} className="mt-8">
              {content.topics.tags.map((t) => (
                <Tag key={t.label} label={t.label} href={t.href} />
              ))}
            </TagList>
            <StoryCard {...content.lead} variant="wide" className="mt-10 lg:mt-12" />
          </div>
        </section>
        <div className="[&_section>div[aria-hidden]]:hidden">
          <PostGrid {...content.posts} />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-20 lg:px-10 lg:pb-28">
          <NumberedPagination {...content.pager} />
        </div>
        <Newsletter {...content.newsletter} />
      </main>
      <SiteFooter {...content.footer} />
    </>
  )
}

export default FreeBlogPage

const img = (name: string, alt: string, width: number, height: number) => ({
  src: `/ui/photos/free-blog/${name}.webp`,
  alt,
  width,
  height,
})

const cover = (name: string, alt: string) => img(name, alt, 760, 475)

const phone = { label: "09 555 01 42", href: "tel:+3295550142" }

// The demo business: Korstwerk, a sourdough bakery in Ghent, and its journal. Every word and photo on the page. A buyer
// replaces this object.
export const freeBlogPageContent: FreeBlogPageContent = {
  header: {
    brand: { label: "Korstwerk", href: "#" },
    mark: <Wheat className="size-6" strokeWidth={2.25} aria-hidden />,
    promise: "Open Tuesday to Sunday, 07:00 until the bread runs out",
    utility: [
      { label: "Find the bakery", href: "#visit" },
      { label: "Order bread", href: "#order" },
      { label: "Opening hours", href: "#hours" },
      { label: "Contact", href: "#contact" },
    ],
    nav: [
      { label: "Bread", href: "#bread" },
      { label: "Journal", href: "#journal" },
      { label: "Courses", href: "#courses" },
      { label: "Visit", href: "#visit" },
      { label: "Wholesale", href: "#wholesale" },
    ],
    current: "#journal",
    search: { label: "Search the journal", placeholder: "Search stories and recipes", action: "#search" },
    saved: { label: "Saved stories", href: "#saved" },
    bag: { label: "Order basket", href: "#basket" },
  },
  intro: {
    kicker: "Korstwerk, a sourdough bakery in Ghent",
    title: "The Korstwerk journal",
    description: "Notes from the bench: what we bake, the flour we buy and why a loaf takes three days. A new story every Thursday.",
  },
  topics: {
    label: "Topics",
    tags: [
      { label: "All stories", href: "#all" },
      { label: "Bread", href: "#bread" },
      { label: "Baking at home", href: "#home" },
      { label: "Recipes", href: "#recipes" },
      { label: "Flour and grain", href: "#flour" },
      { label: "At the bakery", href: "#bakery" },
      { label: "Ghent", href: "#ghent" },
    ],
  },
  lead: {
    title: "Four in the morning, hour by hour",
    href: "#four-in-the-morning",
    kicker: "At the bakery",
    description:
      "The ovens are lit at 02:30, the first dough goes in at 03:00 and the first customer is at the door by 06:50. Follow one Saturday from the first loaf in to the last one sold: the times we never skip, the minute we turn the loaves, and why the shop is quiet until the shutters go up.",
    author: {
      name: "Lotte Verhaeghe",
      role: "Head baker",
      image: { src: "/ui/photos/free-blog/author.webp", alt: "Lotte Verhaeghe, head baker at Korstwerk, smiling in a linen apron." },
    },
    meta: "24 November 2026 · 9 minute read",
    image: {
      src: "/ui/photos/free-blog/lead.webp",
      alt: "A baker slides a long wooden peel of dark sourdough loaves out of the deck oven in the early morning.",
    },
  },
  posts: {
    kicker: "Latest from the bench",
    title: "Recent stories",
    body: "Bread, flour and the people who make them, written by the bakers. Short enough to read on the tram, with the recipes we are happy to share.",
    link: { label: "Subscribe by RSS", href: "#rss" },
    posts: [
      {
        title: "Why rye needs a day to rest",
        tag: "Bread",
        date: "19 November 2026",
        dateTime: "2026-11-19",
        href: "#rye-rest",
        cover: cover("rye", "A round dark rye sourdough loaf cut open on a wooden board to show a dense, moist crumb."),
      },
      {
        title: "Reviving a starter left for a week",
        tag: "Baking at home",
        date: "12 November 2026",
        dateTime: "2026-11-12",
        href: "#starter",
        cover: cover("starter", "A glass jar of bubbly sourdough starter on a floury wooden bench beside scales and a wooden spoon."),
      },
      {
        title: "Saturday on the market: what sells first",
        tag: "Ghent",
        date: "5 November 2026",
        dateTime: "2026-11-05",
        href: "#market",
        cover: cover("market", "A bakery stall on a Ghent market square with crusty loaves piled in baskets, gabled brick houses behind."),
      },
      {
        title: "Meeting the miller who grows our rye",
        tag: "Flour and grain",
        date: "29 October 2026",
        dateTime: "2026-10-29",
        href: "#miller",
        cover: cover("flour", "Sacks of wholegrain flour stacked in a storeroom, with ears of wheat in a wicker basket in front."),
      },
      {
        title: "The winter recipe: cinnamon and speculoos buns",
        tag: "Recipes",
        date: "22 October 2026",
        dateTime: "2026-10-22",
        href: "#buns",
        cover: cover("buns", "A tray of golden cinnamon buns fresh from the oven on baking paper, a little steam rising."),
      },
      {
        title: "Why we proof in the cold",
        tag: "At the bakery",
        date: "15 October 2026",
        dateTime: "2026-10-15",
        href: "#cold-proof",
        cover: cover("racks", "Rows of round cane baskets with proofing dough, dusted in flour, on wooden racks in a cool room."),
      },
    ],
    more: null,
    count: "A new story every Thursday",
  },
  pager: {
    current: 1,
    totalItems: 48,
    perPage: 7,
    noun: "stories",
    href: "/journal?page={page}",
    jump: { label: "Go to page", action: "/journal", button: "Go" },
    label: "Journal pages",
  },
  newsletter: {
    kicker: "The Thursday letter",
    title: "One loaf story, every Thursday",
    body: "A short letter from the bench: what we baked, what went wrong, the week's recipe and the days the bakery is closed.",
    photo: img("loaf", "A rustic sourdough loaf in a paper bag on a kitchen counter beside a dish of butter and a knife.", 480, 480),
    tag: "This week: the three-day rye",
    mark: Mail,
    form: {
      action: "/newsletter",
      label: "Email address",
      placeholder: "you@example.com",
      submit: "Sign up",
      note: "One email a week, in English. Leave with one click at the bottom of any letter.",
      privacy: { label: "How we use your address", href: "#privacy" },
    },
    facts: [
      { label: "Thursdays at 07:00", note: "with the bread still warm" },
      { label: "3,900 readers", note: "most of them in Ghent" },
      { label: "A free recipe card", note: "in your first letter" },
    ],
  },
  footer: {
    brand: { label: "Korstwerk", href: "#" },
    mark: Wheat,
    tagline: "A sourdough bakery in Ghent. Everything is made by hand from stone-milled Flemish flour, water, salt and time.",
    service: {
      title: "At the counter",
      hours: "Tuesday to Sunday 07:00 to 14:00",
      phone: phone.label,
      shops: { label: "Find the bakery", href: "#visit" },
    },
    groups: [
      {
        title: "Bread",
        links: [
          { label: "Country sourdough", href: "#country" },
          { label: "Dark rye", href: "#rye" },
          { label: "Wholemeal", href: "#wholemeal" },
          { label: "Spelt loaf", href: "#spelt" },
          { label: "Seeded loaf", href: "#seeded" },
          { label: "Baguette", href: "#baguette" },
          { label: "Buns and rolls", href: "#buns" },
          { label: "Pastries", href: "#pastries" },
          { label: "Weekend specials", href: "#specials" },
          { label: "Gift boxes", href: "#gifts" },
          { label: "Order for Saturday", href: "#order" },
          { label: "Allergens", href: "#allergens" },
          { label: "Gluten and rye", href: "#gluten" },
          { label: "Bread subscriptions", href: "#subscriptions" },
        ],
      },
      {
        title: "Learn",
        links: [
          { label: "The journal", href: "#journal" },
          { label: "Sourdough courses", href: "#courses" },
          { label: "Starter kit", href: "#starter-kit" },
          { label: "Recipes", href: "#recipes" },
          { label: "Bake along", href: "#bake-along" },
          { label: "Gift a course", href: "#gift-course" },
        ],
      },
      {
        title: "Visit",
        links: [
          { label: "Find the bakery", href: "#visit" },
          { label: "Opening hours", href: "#hours" },
          { label: "Saturday market", href: "#market" },
          { label: "Parking and bikes", href: "#bikes" },
          { label: "Group visits", href: "#groups" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Korstwerk",
        links: [
          { label: "About us", href: "#about" },
          { label: "Our flour", href: "#flour" },
          { label: "Wholesale", href: "#wholesale" },
          { label: "Jobs", href: "#jobs" },
          { label: "Press", href: "#press" },
          { label: "Sustainability", href: "#sustainability" },
        ],
      },
    ],
    trust: [
      { label: "Baked every morning", note: "From 03:00, sold until it is gone", icon: Sun },
      { label: "Stone-milled flour", note: "From two mills in Flanders", icon: Wheat },
      { label: "Closed on Mondays", note: "The bakers sleep", icon: CalendarDays },
    ],
    copyright: "© 2026 Korstwerk BV, Ghent",
    legal: [
      { label: "Terms of sale", href: "#terms" },
      { label: "Privacy", href: "#privacy" },
      { label: "Cookies", href: "#cookies" },
      { label: "Accessibility", href: "#accessibility" },
    ],
    age: null,
  },
}
