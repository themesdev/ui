import { Bold, Italic, Link2, List, ListOrdered, Underline } from "lucide-react"
import { Toolbar, ToolbarButton, ToolbarFeedback, ToolbarGroup, ToolbarSeparator, ToolbarToggle } from "@/components/ui/toolbar"

export default function Example() {
  return (
    <div className="grid w-full gap-8">
      <Toolbar label="Text formatting">
        <ToolbarGroup>
          <ToolbarToggle aria-label="Bold" defaultPressed size="icon"><Bold /></ToolbarToggle>
          <ToolbarToggle aria-label="Italic" size="icon"><Italic /></ToolbarToggle>
          <ToolbarToggle aria-label="Underline" size="icon"><Underline /></ToolbarToggle>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ToolbarButton aria-label="Bulleted list" size="icon"><List /></ToolbarButton>
          <ToolbarButton aria-label="Numbered list" size="icon"><ListOrdered /></ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton><Link2 />Link</ToolbarButton>
        <ToolbarButton disabled>Clear</ToolbarButton>
      </Toolbar>
      <div className="border-t pt-6">
        <ToolbarFeedback label="Was this page helpful?" />
      </div>
    </div>
  )
}
