import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Example() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList variant="line">
        <TabsTrigger value="overview" className="h-9 px-3">Overview</TabsTrigger>
        <TabsTrigger value="activity" className="h-9 px-3">Activity</TabsTrigger>
        <TabsTrigger value="settings" className="h-9 px-3">Settings</TabsTrigger>
        <TabsTrigger value="billing" disabled className="h-9 px-3">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-5 text-sm">
        <h3 className="text-base font-semibold">Harbour Street project</h3>
        <p className="mt-1.5 text-muted-foreground">12 members, 3 open reviews and a release planned for Friday.</p>
      </TabsContent>
      <TabsContent value="activity" className="pt-5 text-sm">
        <p className="text-muted-foreground">Maya merged "Fix checkout rounding" 20 minutes ago.</p>
      </TabsContent>
      <TabsContent value="settings" className="pt-5 text-sm">
        <p className="text-muted-foreground">Rename the project, change its visibility or archive it.</p>
      </TabsContent>
    </Tabs>
  )
}
