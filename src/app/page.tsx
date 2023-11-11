import Image from 'next/image'
import presentationLogo from '../assets/images/presentation-logo.png'
import { Suspense } from 'react'
import { Header } from '@/components/Header'
import { FeaturedCourseCard } from '@/components/FeaturedCourseCard'
import { SearchCourses } from '@/components/SearchCourses'
import { Loading } from '@/components/Loading'

type CourseRating = Pick<Course, 'id' | 'name' | 'imageUrl' | 'description'> & {
  ratingSummary: number
}

export default async function Home() {
  const response = await fetch('http://localhost:3333/courses', {
    cache: 'no-cache',
  })

  const coursesData: Course[] = await response.json()

  const coursesRatings = coursesData
    ?.reduce<CourseRating[]>((acc, curr) => {
      const course = {
        id: curr.id,
        name: curr.name,
        imageUrl: curr.imageUrl,
        description: curr.description,
        ratingSummary:
          curr.ratings.reduce((acc, curr) => acc + curr.value, 0) /
          curr.ratings.length,
      }

      acc.push(course)

      return acc
    }, [])
    .sort((a, b) => a.ratingSummary - b.ratingSummary)
    .reverse()
    .slice(0, 3)

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Header />
        <main className="mt-44">
          <div className="grid mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-flow-col gap-4 max-w-[1120px] m-auto mt-20 px-6 md:px-0 lg:px-0">
            <div className="flex flex-col justify-start items-start text-center md:text-start lg:text-start gap-6">
              <h1 className="text-5xl font-bold">
                Comece a moldar o seu futuro conosco
              </h1>
              <p className="text-base">
                Uma escola inovadora e versátil para que você tenha a melhor
                experiência e formação possível.
              </p>
            </div>
            <div className="hidden md:flex lg:flex justify-end items-center">
              <div>
                <Image
                  className="w-[427px] h-[192px] object-cover"
                  alt="Logo de apresentação"
                  src={presentationLogo}
                />
              </div>
            </div>
          </div>
          <div className="bg-primary-70">
            <div className="max-w-[1120px] py-8 flex flex-col m-auto items-center justify-center text-center">
              <h1 className="text-5xl font-bold">Cursos em destaque</h1>
              <p className="mt-4 text-base">
                Explore nossos cursos mais bem avaliados e garanta já sua
                inscrição
              </p>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-40 mt-10 w-full md:ml-4 justify-around text-center">
                {coursesRatings?.map((course) => {
                  return (
                    <FeaturedCourseCard
                      key={course.id.toString()}
                      name={course.name}
                      courseImgURL={course.imageUrl}
                      description={course.description}
                      courseId={course.id}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <div className="max-w-[1120px] m-auto py-8 px-4 md:px-0">
            <h1 className="text-5xl font-bold max-w-[400px]">
              O que você quer aprender?
            </h1>
            <p className="mt-4">Encontre o curso ideal para você!</p>

            <SearchCourses courses={coursesData} />
          </div>
        </main>
      </Suspense>
    </>
  )
}
