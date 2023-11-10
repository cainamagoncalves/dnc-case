'use client'

import { CaretLeft } from '@phosphor-icons/react'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

type Pagination = {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onChangePage,
}: Pagination) {
  const paginationArray = Array.from({ length: totalPages }, (_, i) => i + 1)

  const centerIndex = Math.floor(currentPage / 2)

  const visiblePages = paginationArray.slice(centerIndex, centerIndex + 3)

  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage !== 1

  return (
    <div className="inline-flex items-center gap-4">
      <button
        disabled={!hasPrevPage}
        onClick={() => onChangePage(currentPage - 1)}
        className="disabled:cursor-not-allowed"
      >
        <CaretLeft />
      </button>
      {visiblePages.map((page) => (
        <span
          data-current={page === currentPage}
          key={page}
          className="rounded-full p-2 w-6 h-6 cursor-pointer text-base font-bold flex items-center justify-center data-[current=true]:bg-primary-20 data-[current=true]:text-primary-100"
          onClick={() => onChangePage(page)}
        >
          {page}
        </span>
      ))}
      <button
        disabled={!hasNextPage}
        onClick={() => onChangePage(currentPage + 1)}
        className="disabled:cursor-not-allowed"
      >
        <CaretRight />
      </button>
    </div>
  )
}
