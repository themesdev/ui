import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select"

export default function Example() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <NativeSelect id="country" defaultValue="nl" className="w-full">
          <NativeSelectOption value="be">Belgium</NativeSelectOption>
          <NativeSelectOption value="de">Germany</NativeSelectOption>
          <NativeSelectOption value="nl">Netherlands</NativeSelectOption>
          <NativeSelectOptGroup label="Other">
            <NativeSelectOption value="fr">France</NativeSelectOption>
            <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slot">Delivery slot</Label>
        <NativeSelect id="slot" defaultValue="" aria-invalid="true" aria-describedby="slot-error" className="w-full">
          <NativeSelectOption value="" disabled>Choose a slot</NativeSelectOption>
          <NativeSelectOption value="am">Morning, 8:00 to 12:00</NativeSelectOption>
          <NativeSelectOption value="pm">Afternoon, 12:00 to 17:00</NativeSelectOption>
        </NativeSelect>
        <p id="slot-error" className="text-sm text-destructive">Choose a delivery slot to continue.</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="plan" className="opacity-50">Plan</Label>
        <NativeSelect id="plan" disabled defaultValue="team" className="w-full">
          <NativeSelectOption value="team">Team (managed by your admin)</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}
