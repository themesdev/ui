import { ArrowRight, ArrowUpRight, Rss } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export type LinkRef = { label: string; href: string }
/** Any short label; "New" is filled, every other tag outlined. */
export type ChangeTag = "New" | "Improved" | "Fixed" | (string & {})
export type Release = {
  version: string
  /** ISO date, shown as "18 Nov 2026". */
  date: string
  title: string
  summary: string
  tag: ChangeTag
  href: string
}

export type ChangelogListProps = {
  title: string
  body: string
  all: LinkRef
  feed: LinkRef
  /** Newest first. The first four sit on the timeline, the rest in the list below it. */
  releases: Release[]
  earlierLabel: string
}

export const changelogListDefaults: ChangelogListProps = {
  title: "Changelog",
  body: "What we shipped in Onwatch, the on-call rota and paging tool for 1,900 engineering teams. New releases every other Tuesday.",
  all: { label: "View all 112 releases", href: "/changelog" },
  feed: { label: "RSS", href: "/changelog/rss.xml" },
  releases: [
    {
      version: "4.12",
      date: "2026-11-17",
      title: "Follow-the-sun rotas",
      summary: "Hand the pager from Amsterdam to Austin to Singapore on working hours. Onwatch works out the overlaps and warns you about gaps before they happen.",
      tag: "New",
      href: "/changelog/4-12",
    },
    {
      version: "4.11",
      date: "2026-11-03",
      title: "Swap a shift from Slack",
      summary: "Type /onwatch swap, pick a colleague and a date. They accept in one click and the rota, calendar feeds and escalations update at once.",
      tag: "New",
      href: "/changelog/4-11",
    },
    {
      version: "4.10.2",
      date: "2026-10-27",
      title: "Quieter alert grouping",
      summary: "Alerts from the same service within five minutes now arrive as one page. Teams in the beta were woken 38% less often at night.",
      tag: "Improved",
      href: "/changelog/4-10-2",
    },
    {
      version: "4.10.1",
      date: "2026-10-21",
      title: "Phone calls in Portuguese and Polish",
      summary: "Voice escalations read the alert in the responder's own language. Onwatch now speaks fourteen, with a slower reading speed to choose from.",
      tag: "Improved",
      href: "/changelog/4-10-1",
    },
    { version: "4.10", date: "2026-10-13", title: "Incident timelines you can export to PDF", summary: "", tag: "New", href: "/changelog/4-10" },
    { version: "4.9.3", date: "2026-10-06", title: "Overrides no longer drop on daylight-saving changes", summary: "", tag: "Fixed", href: "/changelog/4-9-3" },
    { version: "4.9.2", date: "2026-09-29", title: "Status page posts can be scheduled", summary: "", tag: "Improved", href: "/changelog/4-9-2" },
    { version: "4.9.1", date: "2026-09-22", title: "Escalation retries respect quiet hours", summary: "", tag: "Fixed", href: "/changelog/4-9-1" },
    { version: "4.9", date: "2026-09-15", title: "Rota fairness report per quarter", summary: "", tag: "New", href: "/changelog/4-9" },
  ],
  earlierLabel: "Earlier releases",
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number)
  return `${d} ${months[m - 1]} ${y}`
}

function Tag({ tag }: { tag: ChangeTag }) {
  return (
    <Badge variant={tag === "New" ? "default" : "outline"} className="h-6 px-2.5 text-[12px]">
      {tag}
    </Badge>
  )
}

export function ChangelogList(props: Partial<ChangelogListProps>) {
  const c = { ...changelogListDefaults, ...props }
  const latest = c.releases.slice(0, 4)
  const earlier = c.releases.slice(4)

  return (
    <section aria-labelledby="changelog-list-title" className="bg-background py-20 text-foreground lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="changelog-list-title" className="text-[36px] leading-[1.08] font-semibold tracking-[-0.018em] lg:text-[52px] lg:leading-[1.04] lg:tracking-[-0.024em]">
              {c.title}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.5] text-muted-foreground">{c.body}</p>
          </div>
          <div className="flex items-center gap-6 text-[15px] font-medium">
            <a href={c.all.href} className="inline-flex items-center gap-1.5 rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50">
              {c.all.label}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href={c.feed.href} className="inline-flex items-center gap-1.5 rounded-sm text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50">
              <Rss className="size-4" aria-hidden />
              {c.feed.label}
            </a>
          </div>
        </div>

        <ol className="relative mt-14 grid gap-10 border-l border-border pl-7 md:grid-cols-2 md:gap-x-10 lg:mt-20 lg:grid-cols-4 lg:gap-x-10 lg:border-t lg:border-l-0 lg:pt-10 lg:pl-0">
          {latest.map((r, i) => (
            <li key={r.href} className="relative">
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 -left-[33px] size-[11px] rounded-full border-2 border-background ring-1 lg:-top-[46px] lg:left-0",
                  i === 0 ? "bg-foreground ring-foreground" : "bg-background ring-border"
                )}
              />
              <article className="flex h-full flex-col">
                <p className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                  <time dateTime={r.date} className="tabular-nums">{formatDate(r.date)}</time>
                  <span aria-hidden>·</span>
                  <span className="font-mono tabular-nums"><span className="sr-only">Version </span>v{r.version}</span>
                </p>
                <h3 className="mt-4 text-[20px] leading-[1.25] font-semibold tracking-[-0.005em]">
                  <a href={r.href} className="rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50">
                    {r.title}
                  </a>
                </h3>
                <p className="mt-3 text-[15px] leading-[1.5] text-muted-foreground">{r.summary}</p>
                <div className="mt-5 lg:mt-auto lg:pt-5">
                  <Tag tag={r.tag} />
                </div>
              </article>
            </li>
          ))}
        </ol>

        {earlier.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <h3 id="changelog-list-earlier" className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
              {c.earlierLabel}
            </h3>
            <ul aria-labelledby="changelog-list-earlier" className="mt-4 overflow-hidden rounded-2xl border border-border bg-muted/40">
              {earlier.map((r) => (
                <li key={r.href} className="border-b border-border last:border-b-0">
                  <a
                    href={r.href}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1.5 px-5 py-4 outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset sm:grid-cols-[120px_80px_1fr_auto_20px] sm:px-6"
                  >
                    <time dateTime={r.date} className="col-start-1 row-start-1 text-[14px] text-muted-foreground tabular-nums sm:col-auto sm:row-auto">{formatDate(r.date)}</time>
                    <span className="hidden font-mono text-[13px] text-muted-foreground sm:block">v{r.version}</span>
                    <span className="col-span-2 text-[16px] leading-[1.35] font-medium group-hover:underline group-hover:underline-offset-4 sm:col-span-1">{r.title}</span>
                    <span className="col-start-2 row-start-1 justify-self-end sm:col-auto sm:row-auto sm:justify-self-start">
                      <Tag tag={r.tag} />
                    </span>
                    <ArrowUpRight className="hidden size-4 text-muted-foreground group-hover:text-foreground sm:block" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
