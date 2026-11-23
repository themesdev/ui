import { Quantity } from "@/components/ui/quantity"

export default function Example() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6 rounded-xl border p-5">
      <div>
        <p className="font-medium">Cast iron skillet, 26 cm</p>
        <p className="text-sm text-muted-foreground">€ 54,00 each · 6 in stock</p>
      </div>
      <div className="flex flex-wrap items-end gap-8">
        <Quantity id="qty-pan" label="Quantity" defaultValue={2} min={1} max={6} />
        <Quantity id="qty-min" label="At the minimum" defaultValue={1} min={1} max={6} />
        <Quantity id="qty-max" label="At the maximum" defaultValue={6} min={1} max={6} />
      </div>
    </div>
  )
}
