import { ArrowRight, KeyRound, Search } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeaderBar } from "./header-bar"

const groups = [
  { title: "Get started", items: ["Quickstart", "Install the SDK", "Core concepts", "Pricing and limits"] },
  { title: "Indexes", items: ["Create an index", "Upsert vectors", "Query", "Metadata filters", "Namespaces"] },
]

export default function Demo() {
  return (
    <div className="bg-background text-foreground">
      <HeaderBar />
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[272px_1fr]">
        <aside aria-label="Docs" className="hidden border-r border-border px-4 py-6 lg:block">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-border px-3 text-[14px] text-muted-foreground">
            <Search className="size-4" aria-hidden />
            Search
            <kbd className="ml-auto rounded border border-border px-1.5 text-[12px]">⌘K</kbd>
          </div>
          <a href="#overview" className="mt-4 flex h-9 items-center rounded-md bg-muted px-3 text-[14px] font-semibold">Overview</a>
          {groups.map((g) => (
            <div key={g.title} className="mt-6">
              <p className="px-3 text-[13px] font-semibold">{g.title}</p>
              <ul className="mt-1.5">
                {g.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="flex h-9 items-center px-3 text-[14px] text-muted-foreground">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        <main className="min-w-0 px-6 py-12 lg:px-16 lg:py-14">
          <div className="max-w-[760px]">
            <h1 className="text-[36px] leading-[1.08] font-semibold tracking-[-0.018em] lg:text-[44px] lg:leading-[1.04] lg:tracking-[-0.024em]">Build search on Ferrite</h1>
            <p className="mt-4 text-[17px] leading-[1.5] text-muted-foreground">
              A vector database hosted in Frankfurt. Store embeddings next to their metadata and query a billion of them in under 40 milliseconds.
            </p>
            <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border bg-muted/40 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[20px] leading-[1.25] font-semibold">Your first index in five minutes</p>
                <p className="mt-1 text-[15px] text-muted-foreground">Free up to 2 million vectors, no card needed.</p>
              </div>
              <div className="flex gap-2">
                <a href="#quickstart" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 rounded-full px-4 text-[15px]")}>Quickstart<ArrowRight className="size-4" aria-hidden /></a>
                <a href="#keys" className={cn(buttonVariants({ size: "lg" }), "h-10 rounded-full px-4 text-[15px]")}><KeyRound className="size-4" aria-hidden />Get an API key</a>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <div className="flex items-center gap-1 border-b border-border px-3 py-2 text-[13px]">
                <span className="rounded-md bg-muted px-2.5 py-1 font-medium">Python</span>
                <span className="px-2.5 py-1 text-muted-foreground">TypeScript</span>
                <span className="px-2.5 py-1 text-muted-foreground">cURL</span>
              </div>
              <pre tabIndex={0} className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7]">{`from ferrite import Client

db = Client(key="fe_live_…")
index = db.index("support-articles")

hits = index.query(vector=embed("reset my password"), top_k=5,
                   filter={"lang": "en"})`}</pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
