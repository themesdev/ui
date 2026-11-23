import { CodeBlock } from "@/components/ui/code-block"

const config = `import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"

export default defineConfig({
  site: "https://www.example.com",
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  redirects: {
    "/docs/getting-started": "/docs/install",
  },
})`

export default function Example() {
  return (
    <div className="grid w-full gap-4">
      <p className="text-base leading-[1.5] text-muted-foreground">Add the adapter to your config, then build.</p>
      <CodeBlock id="example-config" filename="astro.config.mjs" code={config} />
      <CodeBlock id="example-terminal" filename="Terminal" code="pnpm add @astrojs/cloudflare && pnpm build" />
    </div>
  )
}
