import { Header } from '@/components/Header'
import Image from 'next/image'
import { CourseActions } from './components/CourseActions'
import { RatingCarousel } from './components/RatingCarousel'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'

export default async function Course({ params }: { params: { id: string } }) {
  const response = await fetch(`http://localhost:3333/courses/${params.id}`, {
    cache: 'no-cache',
  })

  const course: Course = await response.json()

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <main className="mt-44">
          <div className="grid mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-flow-col gap-4 max-w-[1120px] m-auto mt-20 px-6 md:px-0 lg:px-0">
            <div className="flex flex-col justify-between items-center md:items-start text-center md:text-start lg:text-start gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">{course.name}</h1>
                <p className="text-xl text-bold">{course.resume}</p>
              </div>
              <CourseActions course={course} />
            </div>
            <div className="hidden md:flex lg:flex justify-end items-center">
              <div>
                <Image
                  className="object-cover transition-all animate-fade"
                  alt="Logo do curso"
                  src={course.imageUrl}
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-primary-20">
            <div className="max-w-[1120px] px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 m-auto py-6 text-primary-100 text-center md:text-left">
              <div>
                <div>
                  <h1 className="text-5xl font-bold">Descrição</h1>
                  <p className="text-base mt-4">{course.description}</p>
                </div>
                <div className="mt-6">
                  <h1 className="text-5xl font-bold">Requisitos</h1>
                  {course.requirements.map((requirement) => {
                    return (
                      <ul key={requirement.id.toString()} className="list-disc">
                        <li className="mt-4 ml-4">{requirement.content}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
              <div className="w-full mt-4 md:mt-0 inline-flex justify-center md:justify-end">
                <div className="rounded-md flex flex-col p-4 gap-2 items-center min-w-[300px] max-w-[300px] max-h-[400px] bg-primary-100">
                  <Image
                    className="rounded-full object-cover"
                    alt="Foto do instrutor"
                    src={course.instructor.photo}
                    width={100}
                    height={100}
                  />
                  <h5 className="text-white font-bold">
                    {course.instructor.name}
                  </h5>
                  <p className="text-white text-ellipsis overflow-auto">
                    {course.instructor.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[1120px] flex flex-col gap-4 mt-8 m-auto text-center mb-8">
            <h1 className="text-5xl font-bold">Avaliações</h1>

            <div className="">
              <RatingCarousel ratings={course.ratings} />
            </div>
          </div>
        </main>
      </Suspense>
    </>
  )
}
