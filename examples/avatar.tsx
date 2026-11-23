import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"

const people = [
  { name: "Maya Haddad", role: "Design lead", src: "/ui/photos/avatar/maya.webp", initials: "MH" },
  { name: "Jonas Vermeer", role: "Engineering", src: "/ui/photos/avatar/jonas.webp", initials: "JV" },
  { name: "Ines Lopes", role: "Finance", src: "/ui/photos/avatar/ines.webp", initials: "IL" },
]

export default function Example() {
  return (
    <div className="grid w-full max-w-md gap-8">
      <ul className="grid gap-4">
        {people.map((p) => (
          <li key={p.name} className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={p.src} alt="" />
              <AvatarFallback>{p.initials}</AvatarFallback>
              {p.name.startsWith("Maya") && <AvatarBadge />}
            </Avatar>
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.role}</p>
            </div>
          </li>
        ))}
        <li className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src="/missing.webp" alt="" />
            <AvatarFallback>TK</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Tomás Kerr</p>
            <p className="text-sm text-muted-foreground">No photo yet: initials show</p>
          </div>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <AvatarGroup>
          {people.map((p) => (
            <Avatar key={p.name}>
              <AvatarImage src={p.src} alt={p.name} />
              <AvatarFallback>{p.initials}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+4</AvatarGroupCount>
        </AvatarGroup>
        <span className="text-sm text-muted-foreground">7 people on this project</span>
      </div>
    </div>
  )
}
