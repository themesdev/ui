import { ArrowRight, Bell, Calendar, Check, ChevronDown, Download, Heart, House, Mail, Menu, Search, Settings, ShoppingCart, Star, Trash2, TriangleAlert, User, X } from "lucide-react"

const icons = { ArrowRight, Bell, Calendar, Check, ChevronDown, Download, Heart, House, Mail, Menu, Search, Settings, ShoppingCart, Star, Trash2, TriangleAlert, User, X }

export default function Example() {
  return (
    <div className="w-full">
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {Object.entries(icons).map(([name, Icon]) => (
          <li key={name} className="grid justify-items-center gap-2 rounded-lg border p-3">
            <Icon aria-hidden="true" className="size-5" />
            <span className="text-xs text-muted-foreground">{name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        Decorative icons carry <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">aria-hidden</code>; an icon alone on a button gets an <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">aria-label</code> on the button.
      </p>
    </div>
  )
}
