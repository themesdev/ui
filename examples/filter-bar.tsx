import { FilterBar } from "@/components/ui/filter-bar"

const rows = [
  ["checkout-api", "Production", "Succeeded", "2 min ago"],
  ["web", "Production", "Succeeded", "41 min ago"],
  ["web", "Preview", "Failed", "1 h ago"],
  ["search-worker", "Production", "Building", "3 h ago"],
  ["docs", "Preview", "Succeeded", "Yesterday"],
]

export default function Example() {
  return (
    <div className="grid w-full gap-5">
      <FilterBar
        id="deploys"
        label="Filter by status"
        count="5 deploys"
        filters={[
          { value: "succeeded", label: "Succeeded", pressed: true },
          { value: "failed", label: "Failed" },
          { value: "building", label: "Building" },
        ]}
        sort={[
          { value: "newest", label: "Newest first" },
          { value: "oldest", label: "Oldest first" },
          { value: "name", label: "Name" },
        ]}
        sortValue="newest"
      />
      <ul className="divide-y rounded-xl border">
        {rows.map(([name, env, status, when]) => (
          <li key={name + when} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-muted-foreground">{env}</span>
            <span>{status}</span>
            <span className="text-muted-foreground">{when}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
