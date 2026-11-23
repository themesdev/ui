import { CheckIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const rows = [
  ["checkout-api", <Badge key="a" variant="secondary"><CheckIcon data-icon="inline-start" />Live</Badge>, "v2.4.1"],
  ["search-worker", <Badge key="b" variant="outline">Building</Badge>, "v2.5.0-rc.2"],
  ["billing-sync", <Badge key="c" variant="destructive">Failed</Badge>, "v1.9.3"],
  ["docs", <Badge key="d">New</Badge>, "v3.0.0"],
]

export default function Example() {
  return (
    <ul className="w-full max-w-md divide-y rounded-xl border">
      {rows.map(([name, badge, version]) => (
        <li key={name as string} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
          <span className="font-medium">{name}</span>
          <span className="text-muted-foreground tabular-nums">{version}</span>
          {badge}
        </li>
      ))}
    </ul>
  )
}
