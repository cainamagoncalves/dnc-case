'use client'

import { useScreenSize } from '@/hooks/useScreenSize'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'

type RatingCarouselProps = {
  ratings: Rating[]
}

export function RatingCarousel({ ratings }: RatingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { width } = useScreenSize()

  const isWideVersion = width >= 1280

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? ratings.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === ratings.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const isFirstPage = currentIndex === 0
  const isLastPage = !isWideVersion
    ? currentIndex + 1 >= ratings.length
    : currentIndex + 2 >= ratings.length

  return (
    <div className="overflow-hidden relative duration-500">
      <div className="flex items-center justify-between gap-8 relative">
        <button
          data-invisible={isFirstPage}
          onClick={prevSlide}
          className="text-white data-[invisible=true]:invisible"
        >
          <CaretLeft size={30} />
        </button>
        {ratings
          .slice(currentIndex, currentIndex + (!isWideVersion ? 1 : 2))
          .map((rating) => {
            return (
              <div
                key={rating.id.toString()}
                className="duration-700 ease-in-out border border-1 border-primary-20 rounded-md flex flex-col p-4 w-full md:max-w-[50%] animate-fade"
              >
                <p className="text-left">{`"${rating.description}"`}</p>

                <div className="inline-flex items-center gap-2 mt-4">
                  <Image
                    alt="Foto do usuário"
                    src={rating.rated_by.photo}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex flex-col justify-start text-start gap-1">
                    <h2 className="text-lg font-bold text-white">
                      {rating.rated_by.name}
                    </h2>
                    <span className="text-primary-40">
                      {rating.rated_by.role}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        <button
          data-invisible={isLastPage}
          onClick={nextSlide}
          className="text-white data-[invisible=true]:invisible"
        >
          <CaretRight size={30} />
        </button>
      </div>
    </div>
  )
}
