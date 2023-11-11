'use client'

import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

type CourseActionsProps = {
  course: Course
}

export function CourseActions({ course }: CourseActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { push: redirect, refresh } = useRouter()

  const isSubscribed =
    !!user && course.students.find((student) => student.id === user.id)

  async function handleSubscribe() {
    if (!user) {
      return toast.info('É necessário estar logado para realizar essa ação!')
    }

    try {
      setIsLoading(true)
      await fetch(`http://localhost:3333/courses/${course.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...course,
          students: [
            ...course.students,
            {
              id: user?.id,
              name: user?.name,
              email: user?.email,
            },
          ],
        }),
      })
    } catch {
      toast.error('Ocorreu um erro ao se inscrever no curso.')
      setIsLoading(false)
    } finally {
      toast.success('Inscrição realizada com sucesso!')
      setIsLoading(false)
      refresh()
    }
  }

  async function handleUnsubscribe() {
    if (!user) {
      return toast.info('É necessário estar logado para realizar essa ação!')
    }

    try {
      setIsLoading(true)

      const students = course.students.filter(
        (student) => student.id !== user.id,
      )

      await fetch(`http://localhost:3333/courses/${course.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...course,
          students,
        }),
      })
    } catch {
      toast.error('Ocorreu um erro ao remover ao se desinscrever do curso.')
      setIsLoading(false)
    } finally {
      toast.success('Inscrição removida com sucesso!')
      setIsLoading(false)
      refresh()
    }
  }

  return (
    <>
      {isSubscribed ? (
        <div className="flex flex-row items-center gap-10">
          <Button
            onClick={handleUnsubscribe}
            loading={isLoading}
            variant="outline"
            className="font-bold"
          >
            Remover inscrição
          </Button>
          <span
            onClick={() => redirect(`/course/${course.id}/content`)}
            className="flex flex-row items-center gap-2 cursor-pointer transition-all hover:text-primary-20"
          >
            <p>Acessar conteúdo</p>
            <ArrowSquareOut />
          </span>
        </div>
      ) : (
        <Button
          loading={isLoading}
          onClick={handleSubscribe}
          className="font-bold"
        >
          Inscrever-se
        </Button>
      )}
    </>
  )
}
