import { LanguageSwitcher } from "@/components/ui/language-switcher"

const languages = [
  { code: "en", name: "English", href: "/en/pricing" },
  { code: "nl", name: "Nederlands", href: "/nl/prijzen" },
  { code: "de", name: "Deutsch", href: "/de/preise" },
  { code: "fr", name: "Français", href: "/fr/tarifs" },
  { code: "pt-BR", name: "Português (Brasil)", href: "/pt-br/precos" },
]

export default function Example() {
  return (
    <div className="grid min-h-80 w-full content-start gap-8 rounded-xl border p-6">
      <header className="flex items-center justify-between gap-4">
        <span className="text-base font-semibold">Northwind</span>
        <LanguageSwitcher id="lang-menu" languages={languages} current="en" align="end" />
      </header>
      <p className="max-w-[60ch] text-base leading-[1.5] text-muted-foreground">
        Each language is a link to the same page, named in its own language. Arrow keys move, Escape closes.
      </p>
    </div>
  )
}
