import { MapEmbed } from "@/components/ui/map-embed"

export default function Example() {
  return (
    <div className="w-full max-w-xl">
      <MapEmbed name="Studio Kade, ground floor" address="Westerdoksdijk 40, 1013 BX Amsterdam" lat={52.3893} lon={4.8917} />
    </div>
  )
}
