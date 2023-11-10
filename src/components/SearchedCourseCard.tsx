'use client'

import Image from 'next/image'

type SearchedCourseCardProps = {
  name: string
  imgUrl: string
  description: string
  onGoToCoursePage: () => void
}

export function SearchedCourseCard({
  name,
  imgUrl,
  description,
  onGoToCoursePage,
}: SearchedCourseCardProps) {
  return (
    <div
      className="animate-[ease-in_5s_ease-in-out_2] border border-1 transition-all border-primary-20 flex items-center gap-3 rounded-md py-4 px-2 cursor-pointer"
      onClick={onGoToCoursePage}
    >
      <Image src={imgUrl} alt="Logo do curso" width={50} height={50} />
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-bold">{name}</h4>
        <p className="text-base">{description}</p>
      </div>
    </div>
  )
}
