import { Separator } from "@/components/ui/separator"

export default function Example() {
  return (
    <div className="w-full max-w-sm rounded-xl border p-5">
      <h3 className="text-base leading-[1.25] font-semibold">Account</h3>
      <p className="mt-1 text-sm text-muted-foreground">Manage your profile and billing.</p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Profile</span>
        <Separator orientation="vertical" />
        <span>Billing</span>
        <Separator orientation="vertical" />
        <span>Team</span>
      </div>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">Last changed on 18 November by Maya Okafor.</p>
    </div>
  )
}
