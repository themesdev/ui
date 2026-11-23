import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const plans = { monthly: { price: "€12", note: "per seat, billed monthly" }, yearly: { price: "€9", note: "per seat, billed yearly (save 25%)" } }

export default function Example() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("yearly")
  return (
    <div className="grid w-full max-w-sm gap-6 rounded-xl border p-6">
      <ToggleGroup
        variant="outline"
        spacing={0}
        aria-label="Billing period"
        value={[period]}
        onValueChange={(v) => v[0] && setPeriod(v[0] as "monthly" | "yearly")}
        className="w-full"
      >
        <ToggleGroupItem value="monthly" className="h-9 flex-1 text-sm data-pressed:bg-foreground data-pressed:text-background">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="yearly" className="h-9 flex-1 text-sm data-pressed:bg-foreground data-pressed:text-background">Yearly</ToggleGroupItem>
      </ToggleGroup>
      <div>
        <p className="text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.024em] tabular-nums">{plans[period].price}</p>
        <p className="mt-1 text-sm text-muted-foreground">{plans[period].note}</p>
      </div>
    </div>
  )
}
