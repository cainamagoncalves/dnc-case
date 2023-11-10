'use client'

import Image from 'next/image'
import { HTMLAttributes, forwardRef } from 'react'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

type FeaturedCourseCardProps = HTMLAttributes<HTMLDivElement> & {
  courseImgURL: string
  description: string
  name: string
  courseId: string | number
}

const FeaturedCourseCard = forwardRef<HTMLDivElement, FeaturedCourseCardProps>(
  ({ courseImgURL, description, className, courseId, name, ...rest }, ref) => {
    const { push: redirect } = useRouter()

    const handleGoToCoursePage = () => redirect(`/course/${courseId}`)

    return (
      <div
        className={`max-w-[256px] max-h-[344px] border border-1 border-white rounded-md px-9 py-4 flex flex-col items-center gap-5 shadow-md animate-fade ${className}`}
        ref={ref}
        {...rest}
      >
        <header className="flex flex-col flex-1 items-center">
          <Image alt="Logo backend" src={courseImgURL} width={60} height={60} />
          <h2 className="text-2xl font-bold">{name}</h2>
        </header>
        <p className="max-h-[120px] overflow-hidden text-ellipsis">
          {description}
        </p>
        <Button className="w-full" size="sm" onClick={handleGoToCoursePage}>
          Saiba mais
        </Button>
      </div>
    )
  },
)

FeaturedCourseCard.displayName = 'FeaturedCourseCard'

export { FeaturedCourseCard }
