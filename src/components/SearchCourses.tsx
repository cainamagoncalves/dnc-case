'use client'

import { ChangeEvent, useState } from 'react'
import { Input } from './Input'
import { SearchedCourseCard } from './SearchedCourseCard'
import { Pagination } from './Pagination'
import { usePagination } from '@/hooks/usePagination'
import { useRouter } from 'next/navigation'

type SearchCoursesProps = {
  courses: Course[]
}

export function SearchCourses({ courses }: SearchCoursesProps) {
  const [search, setSearch] = useState({
    name: '',
    category: '',
  })

  const { push: redirect } = useRouter()

  function handleSetSearchAttribute(event: ChangeEvent<HTMLInputElement>) {
    setSearch((prevSearch) => {
      return {
        ...prevSearch,
        [event.target.name]: event.target.value,
      }
    })
  }

  const filteredCourses = courses.filter((course) => {
    const nameFilter = search.name ? course.name.includes(search.name) : true

    return nameFilter
  })

  const { changeCurrentPage, currentPage, offset, totalPages } = usePagination({
    pageSize: 2,
    total: filteredCourses.length,
  })

  return (
    <>
      <div className="md:ml-4 flex items-center justify-between mt-4 w-full">
        <Input
          name="name"
          value={search.name ?? ''}
          onChange={(event) => handleSetSearchAttribute(event)}
          placeholder="Buscar cursos"
        />
      </div>

      <div className="flex flex-col items-center gap-7 md:ml-4 mt-4 w-full">
        {filteredCourses?.slice(offset, offset + 2).map((course) => {
          return (
            <SearchedCourseCard
              key={course.id.toString()}
              description={course.description}
              name={course.name}
              imgUrl={course.imageUrl}
              onGoToCoursePage={() => redirect(`/course/${course.id}`)}
            />
          )
        })}

        <Pagination
          onChangePage={changeCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  )
}
