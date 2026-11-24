import { Sailboat, Wind } from "lucide-react"

import { LoginForm, type LoginFormProps } from "@/components/blocks/login-form"

export type FreeSignInPageContent = {
  auth: Partial<LoginFormProps>
}

export function FreeSignInPage({ content = freeSignInPageContent }: { content?: FreeSignInPageContent }) {
  return (
    <main>
      <LoginForm {...content.auth} />
    </main>
  )
}

export default FreeSignInPage

// The demo business: Tackwell Sailing, dinghy and keelboat courses in Falmouth. A buyer replaces this object.
export const freeSignInPageContent: FreeSignInPageContent = {
  auth: {
    brand: "Tackwell Sailing",
    mark: <Sailboat className="size-[18px]" aria-hidden />,
    title: "Sign in to your sailing account",
    intro: "Your course dates, logbook, certificates and bookings for the club boats in one place.",
    action: "/login",
    emailLabel: "Email address",
    passwordLabel: "Password",
    remember: "Keep me signed in on this device",
    forgot: { label: "Forgot your password?", href: "/login/reset" },
    submit: "Sign in",
    secondary: [
      { label: "Create an account", href: "/register" },
      { label: "Book a two-hour taster sail", href: "/taster" },
    ],
    tabs: [
      { label: "Sign in", note: "With email and password", href: "/login", current: true },
      { label: "New to Tackwell", note: "An account takes two minutes", href: "/register" },
      { label: "Send my booking reference", note: "By email, straight away", href: "/booking-reference" },
      { label: "Ask an instructor", note: "Answer within a working day", href: "/contact" },
    ],
    service: { label: "Sailing office", phone: "01632 960 735", hours: "Every day 08:30 to 18:00" },
    status: {
      label: "Sailing today",
      text: "Force 3 to 4 from the south-west. All courses go ahead.",
      link: { label: "Wind and tides", href: "/conditions" },
      icon: <Wind className="size-4" aria-hidden />,
    },
    footer: [
      { label: "Help", href: "/help" },
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
}
