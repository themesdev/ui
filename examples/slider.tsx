import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function Example() {
  const [price, setPrice] = useState([40, 180])
  const [vol, setVol] = useState([65])
  return (
    <div className="grid w-full max-w-sm gap-8">
      <div className="grid gap-4">
        <div className="flex items-baseline justify-between">
          <Label id="price-label">Price range</Label>
          <span className="text-sm text-muted-foreground tabular-nums">€{price[0]} to €{price[1]}</span>
        </div>
        <Slider min={0} max={250} step={5} value={price} onValueChange={(v) => setPrice(v as number[])} aria-labelledby="price-label" />
      </div>
      <div className="grid gap-4">
        <div className="flex items-baseline justify-between">
          <Label id="vol-label">Volume</Label>
          <span className="text-sm text-muted-foreground tabular-nums">{vol[0]}%</span>
        </div>
        <Slider value={vol} onValueChange={(v) => setVol(v as number[])} aria-labelledby="vol-label" />
      </div>
      <div className="grid gap-4 opacity-100">
        <Label id="bright-label" className="text-muted-foreground">Brightness (locked by your device)</Label>
        <Slider defaultValue={[30]} disabled aria-labelledby="bright-label" />
      </div>
    </div>
  )
}
