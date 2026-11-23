import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StoryCardProps = {
  title: string
  href: string
  /** The topic, in words. */
  kicker?: string
  description?: string
  meta?: string
  image?: { src: string; alt: string }
  /** standard: picture on top. compact: a small picture beside the text. wide: picture beside the text from a wide container. feature: a larger title, for the lead story. */
  variant?: "standard" | "compact" | "wide" | "feature"
  className?: string
}

const frame = {
  standard: "",
  compact: "grid-cols-[auto_1fr] items-center",
  wide: "@xl:grid-cols-[1.2fr_1fr]",
  feature: "",
}
const media = {
  standard: "aspect-[16/9]",
  compact: "m-3 size-20 shrink-0 rounded-lg",
  wide: "aspect-[16/9] @xl:aspect-auto @xl:h-full",
  feature: "aspect-[16/9]",
}
const body = {
  standard: "gap-2 p-5",
  compact: "gap-1 py-3 pr-4",
  wide: "justify-center gap-2 p-5 @xl:p-8",
  feature: "gap-3 p-6",
}
const title = {
  standard: "text-lg leading-[1.25] font-semibold",
  compact: "text-sm leading-[1.25] font-semibold",
  wide: "text-xl leading-[1.25] font-semibold",
  feature: "text-2xl leading-[1.15] font-semibold tracking-[-0.01em] @md:text-[1.75rem] @md:leading-[1.08] @md:tracking-[-0.018em]",
}

/** A story card: picture, kicker, the title as the one link (the whole card is the target), a line and the meta. */
export function StoryCard({ title: heading, href, kicker, description, meta, image, variant = "standard", className }: StoryCardProps) {
  return (
    <div className={cn("@container", className)}>
    <article className={cn("group relative isolate grid h-full overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 transition-shadow hover:ring-foreground/25 has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/50", frame[variant])}>
      {image && (
        <div className={cn("relative overflow-hidden bg-muted", media[variant])}>
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
        </div>
      )}
      <div className={cn("flex flex-col", body[variant], variant === "compact" && !image && "pl-4")}>
        {kicker && (
          <Badge variant="secondary" className="w-fit">
            {kicker}
          </Badge>
        )}
        <h3 className={cn("text-balance", title[variant])}>
          <a href={href} className="underline decoration-transparent underline-offset-4 outline-none transition-[text-decoration-color] after:absolute after:inset-0 after:z-10 hover:decoration-foreground">
            {heading}
          </a>
        </h3>
        {description && variant !== "compact" && <p className="text-sm leading-[1.5] text-pretty text-muted-foreground">{description}</p>}
        {meta && <p className="mt-auto pt-2 text-xs text-muted-foreground tabular-nums">{meta}</p>}
      </div>
    </article>
    </div>
  )
}
