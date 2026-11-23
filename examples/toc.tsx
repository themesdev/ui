import { Toc } from "@/components/ui/toc"

const entries = [
  { label: "Overview", href: "#overview" },
  { label: "Installation", href: "#installation" },
  { label: "Usage", href: "#usage" },
  { label: "With a form", href: "#form", level: 3 as const },
  { label: "With a dialog", href: "#dialog", level: 3 as const },
  { label: "Accessibility", href: "#a11y" },
  { label: "API reference", href: "#api" },
]

export default function Example() {
  return (
    <div className="grid w-full grid-cols-[1fr_12rem] gap-10">
      <article className="grid gap-6 text-sm text-muted-foreground">
        {entries.map((e) => (
          <section key={e.href} id={e.href.slice(1)} className="min-h-[280px] scroll-mt-24">
            <h2 className="text-lg font-semibold text-foreground">{e.label}</h2>
            <p className="mt-2 max-w-prose">Notes on {e.label.toLowerCase()}. The link in the contents beside this page is marked while this section is the one you are reading.</p>
          </section>
        ))}
      </article>
      <div className="sticky top-10 self-start">
        <Toc entries={entries} offset={40} />
      </div>
    </div>
  )
}
