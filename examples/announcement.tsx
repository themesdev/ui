import { Announcement } from "@/components/ui/announcement"

export default function Example() {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background">
      <Announcement
        id="example-announcement"
        remember
        text="Version 2.4 is out: scheduled exports and a faster dashboard."
        link={{ label: "Read the release notes", href: "#release-notes" }}
      />
      <main className="grid gap-3 p-8">
        <h1 className="text-2xl leading-[1.15] font-semibold tracking-[-0.01em]">Usage this month</h1>
        <p className="max-w-[60ch] text-base leading-[1.5] text-muted-foreground">
          You have used 18,420 of 25,000 requests. The notice above stays closed for the rest of the session once you close it.
        </p>
      </main>
    </div>
  )
}
