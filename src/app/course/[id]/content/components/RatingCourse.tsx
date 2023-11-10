'use client'

import { Button } from '@/components/Button'
import { Textarea } from '@/components/Textarea'
import { useDialog } from '@/hooks/useDialog'
import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'

type RatingCourseProps = {
  course: Course
}

export function RatingCourse({ course }: RatingCourseProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)

  const { open, toggle } = useDialog()

  const ratingNumbers = Array.from({ length: 5 }, (_, i) => i + 1)

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  async function handleRateCourse(event: FormEvent) {
    event.preventDefault()

    if (!selectedRating) {
      window.alert('Avaliação obrigatória')
      return
    }

    if (!descriptionRef.current?.value) {
      window.alert('Descrição obrigatória')
      return
    }

    const rating = {
      id: course.ratings.length + 1,
      value: selectedRating,
      description: descriptionRef.current?.value,
      rated_by: {
        id: 1,
        name: 'Jhon Doe',
        role: 'Desenolvedor back end',
        photo: 'https://i.imgur.com/hw41aPx.png',
      },
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
          ratings: [...course.ratings, rating],
        }),
      })
    } catch (error) {
      toast.error('Erro ao avaliar curso.')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
      toast.success('Avaliação realizada com sucesso!')
      toggle()
    }
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={toggle}>
        <Dialog.Trigger asChild>
          <Button variant="outline" className="font-bold max-w-[200px]">
            Avaliar curso
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          <Dialog.Content className="bg-primary-100 rounded-md shadow-lg fixed top-[50%] mx-4 md:mx-0 md:left-[50%] md:translate-x-[-50%] translate-y-[-50%] max-w-[450px] p-6 animate-contentShow focus:outline focus:outline-1 focus:outline-primary-90">
            <Dialog.Title className="m-0 font-bold text-xl max-w-[80%]">
              Como foi sua experiência com o curso
            </Dialog.Title>
            <X
              onClick={toggle}
              className="absolute right-1 top-1 cursor-pointer opacity-80 hover:opacity-100"
              size={20}
            />
            <form
              className="flex flex-col items-center mt-4"
              onSubmit={handleRateCourse}
            >
              <Textarea
                ref={descriptionRef}
                name="description"
                placeholder="Descreva sua experiência"
                className="w-full text-sm h-28"
              />
              <div className="flex flex-row items-center gap-4 mt-4">
                {ratingNumbers.map((number) => {
                  return (
                    <span
                      data-checked={selectedRating === number}
                      key={number.toString()}
                      className="rounded-full outline outline-1 h-8 w-8 transition-all font-bold text-sm flex items-center justify-center cursor-pointer hover:bg-primary-20 hover:text-primary-100 data-[checked=true]:bg-white data-[checked=true]:text-primary-100"
                      onClick={() => setSelectedRating(number)}
                    >
                      {number}
                    </span>
                  )
                })}
              </div>
              <div className="flex items-center justify-end mt-8 w-full gap-4">
                <Dialog.Close asChild>
                  <Button variant="outline" size="sm">
                    Cancelar
                  </Button>
                </Dialog.Close>
                <Button
                  loading={isLoading}
                  type="submit"
                  size="sm"
                  className="font-bold"
                >
                  Enviar
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
