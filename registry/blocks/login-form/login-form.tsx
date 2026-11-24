"use client"

import { isValidElement, useState, type ReactElement } from "react"
import { ArrowRight, Eye, EyeOff, LogIn, Mail, Phone, Send, UserPlus, Wind, Zap, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type LinkRef = { label: string; href: string }
export type SideTab = { label: string; note: string; href: string; current?: boolean }

export type LoginFormProps = {
  brand: string
  /** The icon before the brand name: a lucide icon, or an element (`<Sailboat />`) when a server page passes it, since a
   *  component can't be passed from a server page into this client block. Same for status.icon. */
  mark: LucideIcon | ReactElement
  title: string
  intro: string
  action: string
  emailLabel: string
  passwordLabel: string
  remember: string
  forgot: LinkRef
  submit: string
  secondary: LinkRef[]
  /** The strip beside the card: other ways in, the current one marked. */
  tabs: SideTab[]
  service: { label: string; phone: string; hours: string }
  /** The line under the card; `icon` defaults to a lightning bolt. */
  status: { label: string; text: string; link: LinkRef; icon?: LucideIcon | ReactElement }
  footer: LinkRef[]
}

export const loginFormDefaults: LoginFormProps = {
  brand: "Wadstroom",
  mark: Wind,
  title: "Sign in to My Wadstroom",
  intro: "Meter readings, your monthly amount and the yearly bill for your home in one place.",
  action: "/login",
  emailLabel: "Email address",
  passwordLabel: "Password",
  remember: "Keep me signed in on this device",
  forgot: { label: "Forgot your password?", href: "/login/reset" },
  submit: "Sign in",
  secondary: [
    { label: "Create an account", href: "/register" },
    { label: "Pass on a meter reading", href: "/meter-reading" },
  ],
  tabs: [
    { label: "Sign in", note: "With email and password", href: "/login", current: true },
    { label: "No account yet", note: "Takes two minutes", href: "/register" },
    { label: "Send my customer number", note: "By email, right away", href: "/customer-number" },
    { label: "Contact form", note: "Answer within a working day", href: "/contact" },
  ],
  service: { label: "Customer service", phone: "058 288 40 00", hours: "Weekdays 08:00 to 20:00" },
  status: {
    label: "No outages",
    text: "The grid in Friesland runs normally.",
    link: { label: "Outage map", href: "/outages" },
  },
  footer: [
    { label: "Help", href: "/help" },
    { label: "Privacy", href: "/privacy" },
    { label: "Accessibility", href: "/accessibility" },
  ],
}

const tabIcons = [LogIn, UserPlus, Send, Mail]

export function LoginForm(props: Partial<LoginFormProps>) {
  const c = { ...loginFormDefaults, ...props }
  const Mark = c.mark
  const StatusIcon = c.status.icon ?? Zap
  const [shown, setShown] = useState(false)

  return (
    <section aria-labelledby="login-title" className="bg-muted/40 py-16 text-foreground lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <p className="mx-auto flex w-fit items-center gap-2 text-[20px] font-semibold tracking-[-0.01em]">
          <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
            {isValidElement(Mark) ? Mark : <Mark className="size-[18px]" aria-hidden />}
          </span>
          {c.brand}
        </p>

        <div className="mx-auto mt-10 grid max-w-[920px] overflow-hidden rounded-2xl border border-border bg-background shadow-xs md:grid-cols-[minmax(0,1fr)_280px]">
          <div className="p-6 sm:p-10 lg:px-14 lg:py-12">
            <h1 id="login-title" className="text-[28px] leading-[1.08] font-semibold tracking-[-0.018em] lg:text-[32px]">
              {c.title}
            </h1>
            <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.5] text-muted-foreground">{c.intro}</p>

            <form action={c.action} method="post" className="mt-8 grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="login-email">{c.emailLabel}</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  placeholder="name@example.com"
                  className="h-11 rounded-lg px-3.5 text-[15px] md:text-[15px]"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-baseline justify-between gap-4">
                  <Label htmlFor="login-password">{c.passwordLabel}</Label>
                  <a href={c.forgot.href} className="text-[14px] font-medium underline underline-offset-2">
                    {c.forgot.label}
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="login-password"
                    name="password"
                    type={shown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="h-11 rounded-lg px-3.5 pr-12 text-[15px] md:text-[15px]"
                  />
                  <button
                    type="button"
                    aria-controls="login-password"
                    aria-pressed={shown}
                    aria-label={shown ? "Hide password" : "Show password"}
                    onClick={() => setShown((s) => !s)}
                    className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {shown ? <EyeOff className="size-[18px]" aria-hidden /> : <Eye className="size-[18px]" aria-hidden />}
                  </button>
                </div>
              </div>
              <Label className="text-[15px] font-normal">
                <Checkbox name="remember" />
                {c.remember}
              </Label>
              <Button type="submit" className="mt-1 h-12 w-full rounded-lg text-[15px]">
                {c.submit}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-[13px] text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="mt-6 grid gap-3">
              {c.secondary.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(buttonVariants({ variant: "outline" }), "h-11 w-full rounded-lg text-[15px] whitespace-normal")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Other ways in" className="flex flex-col border-t border-border bg-muted/40 md:border-t-0 md:border-l">
            <ul>
              {c.tabs.map((t, i) => {
                const Icon = tabIcons[i % tabIcons.length]
                return (
                  <li key={t.href} className="border-border not-first:border-t">
                    <a
                      href={t.href}
                      aria-current={t.current ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-4 px-6 py-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset",
                        t.current
                          ? "bg-background before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-foreground md:-ml-px"
                          : "hover:bg-background/60"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-full",
                          t.current ? "bg-foreground text-background" : "bg-background text-foreground ring-1 ring-border"
                        )}
                      >
                        <Icon className="size-[18px]" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] leading-[1.25] font-semibold">{t.label}</span>
                        <span className="mt-1 block text-[13px] leading-[1.25] text-muted-foreground">{t.note}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-auto border-t border-border px-6 py-5">
              <p className="text-[13px] leading-[1.25] text-muted-foreground">{c.service.label}</p>
              <a href={`tel:${c.service.phone.replace(/\s/g, "")}`} className="mt-1.5 flex items-center gap-2 text-[17px] leading-[1.25] font-semibold tabular-nums hover:underline">
                <Phone className="size-4" aria-hidden />
                {c.service.phone}
              </a>
              <p className="mt-1 text-[13px] leading-[1.25] text-muted-foreground">{c.service.hours}</p>
            </div>
          </nav>
        </div>

        <div className="mx-auto mt-6 flex max-w-[920px] flex-col gap-4 text-[14px] sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              {isValidElement(StatusIcon) ? StatusIcon : <StatusIcon className="size-4" aria-hidden />}
              {c.status.label}
            </span>
            <span className="text-muted-foreground">{c.status.text}</span>
            <a href={c.status.link.href} className="font-medium underline underline-offset-2">
              {c.status.link.label}
            </a>
          </p>
          <ul className="flex gap-5 text-muted-foreground">
            {c.footer.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
