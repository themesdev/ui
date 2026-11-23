import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Example() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2"><Label htmlFor="i-site">Site name</Label><Input id="i-site" className="h-9" defaultValue="Kade Studio" /></div>
      <div className="grid gap-2"><Label htmlFor="i-sub">Subdomain</Label><Input id="i-sub" className="h-9" placeholder="your-name.themes.app" /></div>
      <div className="grid gap-2"><Label htmlFor="i-port">Port</Label><Input id="i-port" className="h-9" defaultValue="80" aria-invalid="true" /><p className="text-sm text-destructive">Use a port between 1024 and 65535.</p></div>
      <div className="grid gap-2"><Label htmlFor="i-id">Project ID</Label><Input id="i-id" className="h-9" defaultValue="prj_8f3k29x" disabled /></div>
      <div className="grid gap-2"><Label htmlFor="i-file">Logo</Label><Input id="i-file" type="file" className="h-9" /></div>
    </div>
  )
}
