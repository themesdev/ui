import { CopyButton } from "@/components/ui/copy-button"

export default function Example() {
  return (
    <div className="grid w-full grid-cols-[minmax(0,1fr)] gap-6">
      <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
        <div className="min-w-0">
          <p className="text-sm font-medium">Invite link</p>
          <p id="invite-link" className="truncate text-sm text-muted-foreground">https://app.example.com/join/k3f9-2xq7</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <CopyButton from="#invite-link" label="Copy link" />
          <CopyButton value="https://app.example.com/join/k3f9-2xq7" label="Copy link" size="icon" variant="ghost" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <CopyButton value="npm install @example/sdk" label="Copy command" variant="default" />
        <CopyButton value="key_demo_4eC39HqLyjWDarjt" label="Copy key" variant="secondary" copiedLabel="Key copied" />
      </div>
    </div>
  )
}
