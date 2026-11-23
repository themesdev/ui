import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const rows = [
  { id: "mail", title: "Order updates by email", note: "Shipping and delivery news.", on: true },
  { id: "news", title: "Monthly newsletter", note: "One email a month, no more.", on: false },
  { id: "beta", title: "Join the beta programme", note: "Managed by your workspace admin.", on: true, disabled: true },
]

export default function Example() {
  return (
    <div className="w-full max-w-md divide-y rounded-xl border">
      {rows.map((r) => (
        <div key={r.id} className="flex items-center justify-between gap-6 p-4">
          <div className="grid gap-0.5">
            <Label htmlFor={r.id} className="text-sm font-medium">{r.title}</Label>
            <p id={`${r.id}-d`} className="text-sm text-muted-foreground">{r.note}</p>
          </div>
          <Switch id={r.id} defaultChecked={r.on} disabled={r.disabled} aria-describedby={`${r.id}-d`} />
        </div>
      ))}
    </div>
  )
}
