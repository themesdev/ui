import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

const topics = ["Product updates", "Security notices", "Billing receipts", "Weekly digest"]

export default function Example() {
  return (
    <Sheet defaultOpen>
      <SheetTrigger render={<Button variant="outline" size="lg" />}>Notification settings</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notification settings</SheetTitle>
          <SheetDescription>Choose what we email to team@example.com.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          {topics.map((t, i) => (
            <div key={t} className="flex items-center gap-3">
              <Checkbox id={`topic-${i}`} defaultChecked={i !== 3} />
              <Label htmlFor={`topic-${i}`}>{t}</Label>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose render={<Button size="lg" />}>Save changes</SheetClose>
          <SheetClose render={<Button variant="outline" size="lg" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
