import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Result = { title: string; href: string; path: string; snippet: string; type?: string }

export type ResultListProps = {
  query: string
  results: Result[]
  className?: string
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Splits a snippet into plain and matched parts, one match per word of the query. */
function parts(snippet: string, query: string) {
  const words = query.split(/\s+/).filter(Boolean).map(escape)
  if (!words.length) return [{ text: snippet, mark: false }]
  const re = new RegExp(`(${words.join("|")})`, "gi")
  return snippet.split(re).filter(Boolean).map((text, i) => ({ text, mark: i % 2 === 1 }))
}

/** Search results: an announced count, then ranked results with the match marked in each snippet. */
export function ResultList({ query, results, className }: ResultListProps) {
  return (
    <section aria-label="Search results" className={cn("flex flex-col gap-4", className)}>
      <p role="status" className="text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
      </p>
      <ol className="flex flex-col divide-y divide-border">
        {results.map((r) => (
          <li key={r.href} className="flex flex-col gap-1.5 py-5 first:pt-0">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              {r.type && <Badge variant="secondary">{r.type}</Badge>}
              <span className="truncate">{r.path}</span>
            </span>
            <a href={r.href} className="w-fit rounded-sm text-lg font-medium leading-[1.25] text-foreground underline decoration-transparent underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring/50">
              {r.title}
            </a>
            <p className="max-w-[65ch] text-sm leading-[1.55] text-muted-foreground">
              {parts(r.snippet, query).map((p, k) =>
                p.mark ? <mark key={k} className="rounded-[3px] bg-foreground/10 px-0.5 font-medium text-foreground">{p.text}</mark> : p.text
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
