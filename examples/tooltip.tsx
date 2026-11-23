import { Bold, Copy, Share2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const items = [
  { icon: Copy, label: "Copy link", keys: "C" },
  { icon: Share2, label: "Share", keys: "S" },
  { icon: Bold, label: "Bold", keys: "B" },
  { icon: Trash2, label: "Move to trash", keys: "⌫" },
]

export default function Example() {
  return (
    <TooltipProvider delay={200}>
      <div className="flex items-center gap-2 rounded-xl border p-2">
        {items.map(({ icon: Icon, label, keys }, i) => (
          <Tooltip key={label} defaultOpen={i === 0}>
            <TooltipTrigger render={<Button variant="ghost" size="icon-lg" aria-label={label} />}>
              <Icon />
            </TooltipTrigger>
            <TooltipContent>
              {label} <Kbd>{keys}</Kbd>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
