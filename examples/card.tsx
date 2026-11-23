import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Example() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <Card className="pt-0">
        <img src="/ui/photos/card/studio.webp" alt="A ceramics studio with shelves of stoneware and a wooden worktable" width={1536} height={1024} className="aspect-[3/2] w-full object-cover" />
        <CardHeader>
          <CardTitle className="text-lg">Saturday throwing class</CardTitle>
          <CardDescription>Four hours at the wheel, clay and firing included. Eight places, beginners welcome.</CardDescription>
          <CardAction><Badge variant="secondary">3 left</Badge></CardAction>
        </CardHeader>
        <CardFooter className="justify-between">
          <span className="text-sm text-muted-foreground">€85 per person</span>
          <Button>Reserve</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team plan</CardTitle>
          <CardDescription>For groups of up to 20.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-4xl leading-[1.08] font-semibold tracking-[-0.018em]">€29<span className="text-base font-normal tracking-normal text-muted-foreground"> / seat / month</span></p>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>Unlimited projects</li>
            <li>Priority support within 4 hours</li>
            <li>Single sign-on</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Choose plan</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
