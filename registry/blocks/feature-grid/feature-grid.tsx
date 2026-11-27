import { ArrowRight, FileText, Lock, Quote, Search, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export type ImageRef = { src: string; alt: string; width: number; height: number }
export type LinkRef = { label: string; href: string }

/** One tile. `items`, `value` and `label` feed the small product view each tile shows (`label`: the digest tile's
 * file name, "Week 47 digest" by default; "" leaves it out). */
export type Feature = { title: string; summary: string; items?: string[]; value?: string; label?: string }

/** The meter line: "{label} {seen} of {of} {unit}". */
export type InsightCount = { label: string; unit: string }

export type FeatureGridProps = {
  kicker: string
  title: string
  intro: string
  /** The large tile: an insight card built from real interview data. */
  lead: {
    /** The small label above the title; "Insights" by default. */
    label?: string
    title: string
    summary: string
    action: LinkRef
    /** `count` is the meter under the quote ("Heard in 9 of 12 interviews"); `null` leaves it out. */
    insight: { quote: string; source: string; tags: string[]; seen: number; of: number; count?: InsightCount | null }
  }
  /** Eight tiles in order: transcripts, languages, tags, photo, privacy, digest, search, export. */
  features: Feature[]
  photo: ImageRef
}

export const featureGridDefaults: FeatureGridProps = {
  kicker: "Siftnote for research teams",
  title: "Everything between the interview and the insight",
  intro: "Record a call, and Siftnote writes the transcript, tags what people said and keeps it searchable for the whole team.",
  lead: {
    title: "Patterns you can prove",
    summary: "Highlight a sentence once. Siftnote finds the same need in every other interview and shows you how often it came up.",
    action: { label: "Try it on one interview", href: "#trial" },
    insight: {
      quote: "Every Friday I copy the numbers into a spreadsheet, because the report never shows what my manager asks for.",
      source: "Priya, finance lead, interview 7",
      tags: ["Reporting", "Workaround", "Weekly task"],
      seen: 9,
      of: 12,
    },
  },
  features: [
    {
      title: "Transcripts in minutes",
      summary: "Speakers named, timestamps kept.",
      items: ["00:42|Priya|I export it every Friday.", "00:51|You|What happens after that?"],
    },
    { title: "32 languages", summary: "Transcribe in one, read in another.", items: ["Dutch", "German", "Spanish", "Japanese", "Polish"] },
    { title: "Tags that write themselves", summary: "Suggested from your own codebook.", items: ["Onboarding|23", "Pricing|17", "Trust|11"] },
    { title: "Run sessions together", summary: "Notes from everyone in the room land on one timeline." },
    { title: "Private by default", summary: "Never used to train models.", items: ["Share recordings outside the team"] },
    { title: "Monday digest", summary: "New themes from last week's calls.", value: "4 new themes" },
    { title: "Search every call", summary: "Across 1,480 hours of interviews.", value: "0.3 s" },
    { title: "Export anywhere", summary: "Clips, quotes and reports.", items: ["PDF", "CSV", "Slides", "Video clip"] },
  ],
  photo: {
    src: "/ui/photos/feature-grid/session.webp",
    alt: "A researcher with a laptop and a notebook taking notes during a session.",
    width: 600,
    height: 600,
  },
}

const tile = "relative flex flex-col overflow-hidden rounded-3xl bg-muted/60 p-6 lg:p-7"
const tileTitle = "text-[20px] leading-[1.25] font-semibold tracking-[-0.01em]"
const tileText = "mt-1.5 text-[15px] leading-[1.45] text-muted-foreground"

export function FeatureGrid(props: Partial<FeatureGridProps>) {
  const c = { ...featureGridDefaults, ...props }
  const [transcripts, languages, tags, together, privacy, digest, search, exports] = c.features
  const ins = c.lead.insight
  const digestLabel = digest?.label ?? "Week 47 digest"
  const count = ins.count === undefined ? { label: "Heard in", unit: "interviews" } : ins.count

  return (
    <section aria-labelledby="feature-grid-title" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[13px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{c.kicker}</p>
          <h2
            id="feature-grid-title"
            className="mt-4 text-[34px] leading-[1.08] font-semibold tracking-[-0.018em] text-balance lg:text-[52px] lg:leading-[1.04] lg:tracking-[-0.024em]"
          >
            {c.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-[17px] leading-[1.5] text-muted-foreground lg:text-[18px]">{c.intro}</p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(250px,auto))]">
          {/* Transcripts */}
          {transcripts && (
            <li className={tile}>
              <h3 className={tileTitle}>{transcripts.title}</h3>
              <p className={tileText}>{transcripts.summary}</p>
              <div className="mt-auto grid gap-2 pt-6">
                {(transcripts.items ?? []).map((line) => {
                  const [time, who, text] = line.split("|")
                  return (
                    <p key={line} className="rounded-xl bg-background px-3 py-2.5 text-[13px] leading-[1.35] shadow-xs">
                      <span className="font-mono text-[12px] text-muted-foreground tabular-nums">{time}</span>{" "}
                      <span className="font-semibold">{who}</span>
                      <span className="block text-muted-foreground">{text}</span>
                    </p>
                  )
                })}
              </div>
            </li>
          )}

          {/* Lead tile */}
          <li className={cn(tile, "sm:col-span-2 lg:row-span-2 lg:p-9")}>
            <div className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
              <Sparkles className="size-4" aria-hidden />
              {c.lead.label ?? "Insights"}
            </div>
            <h3 className="mt-3 text-[28px] leading-[1.08] font-semibold tracking-[-0.018em] lg:text-[34px]">{c.lead.title}</h3>
            <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.5] text-muted-foreground">{c.lead.summary}</p>
            <a
              href={c.lead.action.href}
              className={cn(buttonVariants({ size: "lg" }), "mt-6 h-11 w-fit rounded-full px-5 text-[15px]")}
            >
              {c.lead.action.label}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </a>
            <figure className="mt-8 rounded-2xl border bg-background p-5 shadow-sm lg:mt-auto lg:p-6">
              <Quote className="size-5 text-muted-foreground" aria-hidden />
              <blockquote className="mt-3 text-[17px] leading-[1.45] font-medium lg:text-[18px]">{ins.quote}</blockquote>
              <figcaption className="mt-2 text-[14px] text-muted-foreground">{ins.source}</figcaption>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ins.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="h-6 rounded-full px-2.5 text-[12px]">
                    {t}
                  </Badge>
                ))}
              </div>
              {count ? (
                <div className="mt-5 border-t pt-4">
                  <p className="flex items-baseline justify-between text-[14px]">
                    <span className="text-muted-foreground">{count.label}</span>
                    <span className="font-semibold tabular-nums">
                      {ins.seen} of {ins.of} {count.unit}
                    </span>
                  </p>
                  <Progress value={Math.round((ins.seen / ins.of) * 100)} aria-label={`Share of ${count.unit}`} className="mt-2.5" />
                </div>
              ) : null}
            </figure>
          </li>

          {/* Languages */}
          {languages && (
            <li className={tile}>
              <h3 className={tileTitle}>{languages.title}</h3>
              <p className={tileText}>{languages.summary}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                {(languages.items ?? []).map((l, i) => (
                  <span
                    key={l}
                    className={cn(
                      "rounded-full border px-3 py-1 text-[13px] font-medium",
                      i === 0 ? "border-foreground bg-foreground text-background" : "bg-background"
                    )}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </li>
          )}

          {/* Tags */}
          {tags && (
            <li className={tile}>
              <h3 className={tileTitle}>{tags.title}</h3>
              <p className={tileText}>{tags.summary}</p>
              <ul className="mt-auto grid gap-1.5 pt-6">
                {(tags.items ?? []).map((t, i) => {
                  const [name, count] = t.split("|")
                  return (
                    <li key={t} className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-[14px] shadow-xs">
                      <span className="flex items-center gap-2 font-medium">
                        <span className={cn("size-2 rounded-full", i === 0 ? "bg-foreground" : i === 1 ? "bg-foreground/50" : "bg-foreground/25")} />
                        {name}
                      </span>
                      <span className="text-muted-foreground tabular-nums">{count}</span>
                    </li>
                  )
                })}
              </ul>
            </li>
          )}

          {/* Photo */}
          {together && (
            <li className={cn(tile, "min-h-[280px] p-0 lg:p-0")}>
              <img
                src={c.photo.src}
                alt={c.photo.alt}
                width={c.photo.width}
                height={c.photo.height}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden />
              <div className="relative mt-auto p-6 text-white lg:p-7">
                <h3 className={tileTitle}>{together.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.45] text-white/85">{together.summary}</p>
              </div>
            </li>
          )}

          {/* Privacy */}
          {privacy && (
            <li className={tile}>
              <div className="flex items-start justify-between gap-4">
                <h3 className={tileTitle}>{privacy.title}</h3>
                <Lock className="size-5 shrink-0" aria-hidden />
              </div>
              <p className={tileText}>{privacy.summary}</p>
              <label className="mt-auto flex items-center justify-between gap-3 rounded-xl bg-background px-4 py-3 text-[14px] leading-[1.3] shadow-xs">
                {privacy.items?.[0]}
                <Switch defaultChecked={false} aria-label={privacy.items?.[0]} />
              </label>
            </li>
          )}

          {/* Digest */}
          {digest && (
            <li className={tile}>
              <h3 className={tileTitle}>{digest.title}</h3>
              <p className={tileText}>{digest.summary}</p>
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-3 rounded-xl bg-background px-4 py-3 shadow-xs">
                  <span className="grid size-9 place-items-center rounded-lg bg-muted">
                    <FileText className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 text-[13px] leading-[1.3]">
                    {digestLabel ? <p className="font-semibold">{digestLabel}</p> : null}
                    <p className="text-muted-foreground">{digest.value}</p>
                  </div>
                </div>
              </div>
            </li>
          )}

          {/* Search */}
          {search && (
            <li className={tile}>
              <div className="flex items-start justify-between gap-4">
                <h3 className={tileTitle}>{search.title}</h3>
                <Search className="size-5 shrink-0" aria-hidden />
              </div>
              <p className={tileText}>{search.summary}</p>
              <p className="mt-auto pt-6 text-[64px] leading-[0.9] font-semibold tracking-[-0.035em] tabular-nums">{search.value}</p>
            </li>
          )}

          {/* Export */}
          {exports && (
            <li className={tile}>
              <h3 className={tileTitle}>{exports.title}</h3>
              <p className={tileText}>{exports.summary}</p>
              <div className="mt-auto grid grid-cols-2 gap-1.5 pt-6">
                {(exports.items ?? []).map((f) => (
                  <span key={f} className="rounded-lg bg-background px-3 py-2 text-center text-[13px] font-medium shadow-xs">
                    {f}
                  </span>
                ))}
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
