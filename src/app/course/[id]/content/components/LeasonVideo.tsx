'use client'

import { useLeason } from '@/hooks/useLeason'

export function LeasonVideo() {
  const { leason } = useLeason()

  return (
    <iframe
      className="aspect-video border border-1 rounded-md border-white w-full md:col-span-2"
      src={leason.videoUrl}
      title={leason.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
    />
  )
}
