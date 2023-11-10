import { Header } from '@/components/Header'
import { ContentAccordion } from './components/ContentAccordion'
import { LeasonInformation } from './components/LeasonInformation'
import { LeasonProvider } from '@/contexts/LeasonContext'
import { LeasonVideo } from './components/LeasonVideo'
import { RatingCourse } from './components/RatingCourse'
import { DialogProvider } from '@/contexts/DialogContext'
import { AuthContainer } from '@/components/AuthContainer'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'

export default async function CourseContents({
  params,
}: {
  params: { id: string }
}) {
  const response = await fetch(`http://localhost:3333/courses/${params.id}`)

  const course: Course = await response.json()

  return (
    <LeasonProvider>
      <DialogProvider>
        <AuthContainer>
          <Suspense fallback={<Loading />}>
            <Header />
            <main className="mt-44 px-6 md:px-0">
              <div className="grid mb-4 grid-cols-1 md:grid-cols-3 grid-flow-row md:grid-flow-col gap-4 max-w-[1120px] m-auto mt-20 px-6 md:px-0 lg:px-0">
                <LeasonVideo />
                <div className="flex md:flex lg:flex justify-center md:justify-end items-start w-full">
                  <ContentAccordion contents={course.contents} />
                </div>
              </div>
              <div className="max-w-[1120px] m-auto flex flex-col py-8">
                <LeasonInformation />
                <RatingCourse course={course} />
              </div>
            </main>
          </Suspense>
        </AuthContainer>
      </DialogProvider>
    </LeasonProvider>
  )
}
