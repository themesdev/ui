import { SidebarNav } from "@/components/ui/sidebar-nav"

export default function Example() {
  return (
    <div className="w-64 rounded-xl border p-3">
      <SidebarNav
        label="Documentation"
        currentPath="/docs/installation"
        groups={[
          { title: "Getting started", links: [{ label: "Introduction", href: "/docs" }, { label: "Installation", href: "/docs/installation" }, { label: "Theming", href: "/docs/theming" }] },
          { title: "Components", collapsible: true, links: [{ label: "Accordion", href: "/docs/accordion" }, { label: "Button", href: "/docs/button" }, { label: "Dialog", href: "/docs/dialog" }, { label: "Table", href: "/docs/table" }] },
          { title: "Guides", collapsible: true, open: false, links: [{ label: "Dark mode", href: "/docs/dark-mode" }, { label: "Forms", href: "/docs/forms" }, { label: "Upgrading", href: "/docs/upgrading" }] },
        ]}
      />
    </div>
  )
}
