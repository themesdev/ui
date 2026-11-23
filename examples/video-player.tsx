import { VideoPlayer } from "@/components/ui/video-player"

export default function Example() {
  return <VideoPlayer src="/ui/demo/media/demo.webm" poster="/ui/photos/video-player/poster.webp" captions="/ui/demo/media/demo.vtt" title="Throwing a bowl, start to finish" duration="0:06" className="max-w-xl" />
}
