import { useState } from "react"
import { Tag, TagList } from "@/components/ui/tag"

export default function Example() {
  const [filters, setFilters] = useState(["Under €50", "In stock", "Free delivery", "Vegan"])
  return (
    <div className="grid w-full max-w-md gap-6">
      <div className="grid gap-2">
        <p className="text-sm font-medium">Topics</p>
        <TagList label="Topics">
          <Tag label="Design systems" href="/topics/design-systems" />
          <Tag label="Accessibility" href="/topics/accessibility" />
          <Tag label="Typography" href="/topics/typography" />
          <Tag label="Draft" />
        </TagList>
      </div>
      <div className="grid gap-2">
        <p className="text-sm font-medium">Active filters</p>
        {filters.length ? (
          <TagList label="Active filters">
            {filters.map((f) => (
              <Tag key={f} label={f} onRemove={() => setFilters((x) => x.filter((y) => y !== f))} />
            ))}
          </TagList>
        ) : (
          <button type="button" onClick={() => setFilters(["Under €50", "In stock", "Free delivery", "Vegan"])} className="w-fit text-sm underline underline-offset-4">
            All filters removed. Show them again
          </button>
        )}
      </div>
    </div>
  )
}
