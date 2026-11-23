import { FolderOpen, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default function Example() {
  return (
    <Empty className="max-w-xl border py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon"><FolderOpen /></EmptyMedia>
        <EmptyTitle className="text-base">No invoices yet</EmptyTitle>
        <EmptyDescription>Invoices appear here the moment you send your first one. You can also import the ones you already have from a spreadsheet.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center">
        <Button size="lg"><Plus data-icon="inline-start" />New invoice</Button>
        <Button size="lg" variant="outline">Import from CSV</Button>
      </EmptyContent>
    </Empty>
  )
}
