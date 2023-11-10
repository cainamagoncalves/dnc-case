'use client'
import { useLeason } from '@/hooks/useLeason'
import { CaretDown, ShieldCheck, Video } from '@phosphor-icons/react'
import * as Accordion from '@radix-ui/react-accordion'

type ContentAccordionProps = {
  contents: Content[]
}

function formatVideoTime(milliseconds: number) {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes
  const secondsFormat =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

  return `${minutesFormat}:${secondsFormat}`
}

export function ContentAccordion({ contents }: ContentAccordionProps) {
  const { selectLeason } = useLeason()

  function handleSelectLeason(leason: Leason) {
    selectLeason(leason)
  }

  return (
    <Accordion.Root
      className="rounded-md w-[350px] max-h-[420px] shadow-lg overflow-auto"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {contents.map((content) => {
        const videosQuantity = content.leasons.length

        return (
          <Accordion.Item
            key={content.id}
            className="overflow-hidden mt-1 first:mt-0 first:rounded-t-md last:rounded-b-md focus-within:relative focus-within:z-10 focus-within:shadow-sm"
            value={content.id.toString()}
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="px-5 py-2 min-h-[45px] flex-1 flex items-center justify-between shadow-lg transition-all duration-300 bg-primary-70 hover:bg-primary-90 group">
                <div className="flex flex-col items-start gap-2 py-2">
                  <h5 className="text-lg font-bold text-left max-w-[200px] leading-5">
                    {content.title}
                  </h5>
                  <span className="text-sm font-bold text-primary-20">
                    {videosQuantity > 1
                      ? `${videosQuantity} Videos`
                      : '1 Video'}
                  </span>
                </div>
                <CaretDown
                  aria-hidden
                  className="transition-transform duration-300 ease-[cubic-bezier(0.87, 0, 0.13, 1)] group-data-[state='open']:rotate-180"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden bg-primary-90 data-[state='open']:animate-slidedown data-[state='closed']:animate-slideup">
              <div className="py-5 px-3 flex flex-col gap-2">
                {content.leasons.map((leason) => {
                  return (
                    <div
                      key={leason.title}
                      onClick={() => handleSelectLeason(leason)}
                      className="inline-flex opacity-90 items-center justify-between cursor-pointer transition-all hover:opacity-100"
                    >
                      <div className="inline-flex gap-1 items-center">
                        <Video />
                        <span className="text-sm font-bold">
                          {leason.title}
                        </span>
                      </div>
                      <span className="text-sm text-primary-20">
                        {formatVideoTime(leason.duration)}
                      </span>
                    </div>
                  )
                })}
                {content?.quizzes?.map((quiz) => {
                  return (
                    <div
                      key={quiz.title}
                      className="inline-flex opacity-90 items-center justify-between cursor-pointer transition-all hover:opacity-100"
                    >
                      <div className="inline-flex gap-1 items-center">
                        <ShieldCheck />
                        <span className="text-sm font-bold">{quiz.title}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}
