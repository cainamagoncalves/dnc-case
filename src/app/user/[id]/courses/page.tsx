import { AuthContainer } from '@/components/AuthContainer'
import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { SearchCourses } from '@/components/SearchCourses'
import { Suspense } from 'react'

export default async function MyCourses({
  params,
}: {
  params: { id: string }
}) {
  const response = await fetch('http://localhost:3333/courses', {
    cache: 'no-cache',
  })

  const courses: Course[] = await response.json()

  const userCourses = courses.reduce<Course[]>((acc, curr) => {
    const courseStudents = curr.students.map((student) => student.id)

    if (courseStudents.includes(Number(params.id))) {
      acc.push(curr)
    }

    return acc
  }, [])

  return (
    <AuthContainer>
      <Suspense fallback={<Loading />}>
        <Header />
        <main className="pt-44">
          <div className="max-w-[1120px] m-auto">
            <SearchCourses courses={userCourses} />
          </div>
        </main>
      </Suspense>
    </AuthContainer>
  )
}
