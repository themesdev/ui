import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"

export default function Example() {
  return (
    <Popover defaultOpen>
      <PopoverTrigger render={<Button variant="outline" size="lg" />}>Share this report</PopoverTrigger>
      <PopoverContent align="start" className="w-80 gap-4 p-4">
        <PopoverHeader>
          <PopoverTitle>Share this report</PopoverTitle>
          <PopoverDescription>Anyone with the link can view it. They cannot edit.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <Label htmlFor="pop-link">Link</Label>
          <Input id="pop-link" className="h-9" readOnly defaultValue="https://kade.studio/r/q3-traffic" />
        </div>
        <Button size="lg">Copy link</Button>
      </PopoverContent>
    </Popover>
  )
}
