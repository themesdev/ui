import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <Label htmlFor="l-team">Team name</Label>
        <Input id="l-team" className="h-9" defaultValue="Kade Studio" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="l-url">Team URL<span className="font-normal text-muted-foreground">(optional)</span></Label>
        <Input id="l-url" className="h-9" placeholder="kade.studio" />
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="l-terms" defaultChecked />
        <Label htmlFor="l-terms">I agree to the terms of service</Label>
      </div>
      <div className="group flex items-center gap-3" data-disabled="true">
        <Checkbox id="l-off" disabled />
        <Label htmlFor="l-off">Share usage data (managed by your admin)</Label>
      </div>
    </div>
  )
}
