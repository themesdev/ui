"use client"

import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

export type SearchFieldProps = {
  id: string
  /** The accessible name, e.g. "Search the docs". */
  label: string
  placeholder?: string
  /** Where the form goes (GET), e.g. "/search". */
  action?: string
  name?: string
  defaultValue?: string
  className?: string
}

/** A search field in a role=search form, with a "/" shortcut and a clear button. */
export function SearchField({ id, label, placeholder = "Search", action, name = "q", defaultValue = "", className }: SearchFieldProps) {
  const [value, setValue] = useState(defaultValue)
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => {
    // "/" outside any field focuses the first search field you can see (a page may keep others in a closed panel).
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable='']")) return
      const first = [...document.querySelectorAll<HTMLInputElement>("input[data-search]")].find((i) => i.getClientRects().length > 0)
      if (first !== input.current) return
      e.preventDefault()
      first?.focus()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])
  return (
    <form role="search" action={action} className={cn("relative w-full", className)}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={input}
        type="search"
        id={id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        data-search=""
        className="h-10 pl-9 pr-12 text-base [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Clear search"
          onClick={() => {
            setValue("")
            input.current?.focus()
          }}
          className="absolute right-1.5 top-1/2 -translate-y-1/2"
        >
          <X aria-hidden="true" />
        </Button>
      ) : (
        <Kbd aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2">/</Kbd>
      )}
    </form>
  )
}
