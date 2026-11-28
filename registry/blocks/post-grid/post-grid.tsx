import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }
export type Post = { title: string; tag: string; date: string; dateTime: string; cover: ImageRef; href: string }

export type PostGridProps = {
  kicker: string
  title: string
  body: string
  link: LinkRef
  posts: Post[]
  more: LinkRef
  /** Under the button: how many posts there are. */
  count: string
}

const cover = (name: string, alt: string): ImageRef => ({
  src: `/ui/photos/post-grid/${name}.webp`,
  alt,
  width: 760,
  height: 428,
})

export const postGridDefaults: PostGridProps = {
  kicker: "Elmfield Hospital, Norwich",
  title: "News from the hospital",
  body: "What is changing on our wards and in our clinics, written for patients, visitors and the 3,400 people who work here.",
  link: { label: "Press enquiries", href: "#press" },
  posts: [
    {
      title: "Forty new volunteers join the welcome desk in the east atrium",
      tag: "Volunteering",
      date: "18 November 2026",
      dateTime: "2026-11-18",
      href: "#volunteers",
      cover: cover("volunteers", "Two volunteers in green tabards talk with an older patient at a hospital welcome desk."),
    },
    {
      title: "Second MRI scanner cuts the wait for a scan to three weeks",
      tag: "Radiology",
      date: "12 November 2026",
      dateTime: "2026-11-12",
      href: "#mri",
      cover: cover("scanner", "A radiographer prepares a patient beside a white MRI scanner."),
    },
    {
      title: "The courtyard garden reopens with step-free paths",
      tag: "Our site",
      date: "6 November 2026",
      dateTime: "2026-11-06",
      href: "#garden",
      cover: cover("garden", "A nurse and a patient in a wheelchair in a planted hospital courtyard."),
    },
    {
      title: "Sixty-two nurses start on our wards after qualifying this autumn",
      tag: "Careers",
      date: "29 October 2026",
      dateTime: "2026-10-29",
      href: "#nurses",
      cover: cover("nurses", "Three newly qualified nurses in blue uniforms in a hospital corridor."),
    },
    {
      title: "Collect your medicine on the day you go home, not the day after",
      tag: "Pharmacy",
      date: "22 October 2026",
      dateTime: "2026-10-22",
      href: "#pharmacy",
      cover: cover("pharmacy", "A pharmacist checks boxes of medicine on shelves in the hospital pharmacy."),
    },
    {
      title: "Birth centre rated outstanding for the second year running",
      tag: "Maternity",
      date: "15 October 2026",
      dateTime: "2026-10-15",
      href: "#maternity",
      cover: cover("maternity", "A midwife shows a new mother how to hold her newborn."),
    },
    {
      title: "Walking again sooner: the new rehabilitation gym on ward 9",
      tag: "Therapies",
      date: "8 October 2026",
      dateTime: "2026-10-08",
      href: "#rehab",
      cover: cover("physio", "A physiotherapist helps an older man walk between parallel bars."),
    },
    {
      title: "Patient meals now cooked fresh on site, seven days a week",
      tag: "Our site",
      date: "1 October 2026",
      dateTime: "2026-10-01",
      href: "#kitchen",
      cover: cover("kitchen", "A hospital chef plates vegetable dishes in a stainless steel kitchen."),
    },
    {
      title: "Three hundred covered bike spaces for staff and visitors",
      tag: "Travel",
      date: "24 September 2026",
      dateTime: "2026-09-24",
      href: "#bikes",
      cover: cover("bike", "A doctor locks a bicycle in a covered shelter outside the hospital."),
    },
  ],
  more: { label: "Load more news", href: "?page=2" },
  count: "Showing 9 of 146 stories",
}

export function PostGrid(props: Partial<PostGridProps>) {
  const c = { ...postGridDefaults, ...props }

  return (
    <section aria-labelledby="post-grid-title" className="relative bg-background pb-20 lg:pb-28">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[420px] bg-muted/60 lg:h-[480px]" />
      <div className="relative mx-auto max-w-[1200px] px-6 pt-20 lg:px-10 lg:pt-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[640px]">
            <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
            <h2
              id="post-grid-title"
              className="mt-4 text-[36px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[52px] lg:leading-[1.04] lg:tracking-[-0.024em]"
            >
              {c.title}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.5] text-muted-foreground">{c.body}</p>
          </div>
          <a
            href={c.link.href}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-md text-[15px] font-medium underline decoration-foreground/30 underline-offset-[6px] transition-colors hover:decoration-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none md:self-auto"
          >
            {c.link.label}
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
          {c.posts.map((p, i) => (
            <li key={p.href}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-foreground/5 transition-shadow hover:shadow-md">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={p.cover.src}
                    alt={p.cover.alt}
                    width={p.cover.width}
                    height={p.cover.height}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pt-5 pb-7">
                  <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="font-medium text-foreground">{p.tag}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={p.dateTime}>{p.date}</time>
                  </p>
                  <h3 className="mt-3 text-[20px] leading-[1.25] font-semibold text-balance">
                    <a
                      href={p.href}
                      className="outline-none after:absolute after:inset-0 after:rounded-2xl group-hover:underline group-hover:decoration-foreground/30 group-hover:underline-offset-4 focus-visible:after:ring-[3px] focus-visible:after:ring-ring focus-visible:after:ring-inset"
                    >
                      {p.title}
                    </a>
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-3">
          <a href={c.more.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full px-7 text-[15px]")}>
            {c.more.label}
          </a>
          <p className="text-[14px] text-muted-foreground tabular-nums">{c.count}</p>
        </div>
      </div>
    </section>
  )
}
