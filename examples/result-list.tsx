import { ResultList } from "@/components/ui/result-list"

export default function Example() {
  return (
    <div className="w-full max-w-2xl">
      <ResultList
        query="custom domain"
        results={[
          { type: "Guide", path: "docs / domains / custom-domains", title: "Connect a custom domain", href: "#a", snippet: "Add your custom domain in Settings, then point its CNAME record at your project. DNS changes can take up to an hour." },
          { type: "Guide", path: "docs / domains / dns", title: "DNS records for your domain", href: "#b", snippet: "A custom domain needs one CNAME for www and an ALIAS or A record for the bare domain. Copy the exact values from the dashboard." },
          { type: "FAQ", path: "help / billing", title: "Is a custom domain included in my plan?", href: "#c", snippet: "Every paid plan includes one custom domain. Extra domains cost € 2 a month each." },
        ]}
      />
    </div>
  )
}
