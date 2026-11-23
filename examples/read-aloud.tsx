import { ReadAloud } from "@/components/ui/read-aloud"

export default function Example() {
  return (
    <article className="flex w-full max-w-[36rem] flex-col gap-4">
      <h2 className="text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.018em]">Why the canal houses lean</h2>
      <ReadAloud from="#article-body" label="Listen" duration="1 min" lang="en" className="self-start" />
      <div id="article-body" className="flex flex-col gap-3 text-base leading-[1.5] text-muted-foreground">
        <p>Walk along any Amsterdam canal and the houses seem to bow towards the water. This is not an accident of age.</p>
        <p>Merchants taxed by frontage built narrow and deep, and a beam at the gable let them hoist goods through the window. The front leans forward so that a load swings clear of the glass.</p>
      </div>
    </article>
  )
}
