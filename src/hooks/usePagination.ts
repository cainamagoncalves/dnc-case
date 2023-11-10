import { useEffect, useState } from 'react'

type PaginationProps = {
  pageSize: number
  total: number
}

export function usePagination({ pageSize, total }: PaginationProps) {
  const [paginateProps, setPaginateProps] = useState({
    offset: 0,
    totalPages: 0,
    currentPage: 1,
  })

  useEffect(() => {
    setPaginateProps((prevPaginateProps) => {
      return {
        ...prevPaginateProps,
        totalPages: Math.ceil(total / pageSize),
      }
    })
  }, [pageSize, total])

  useEffect(() => {
    setPaginateProps((prevPaginateProps) => {
      return {
        ...prevPaginateProps,
        offset: pageSize * (paginateProps.currentPage - 1),
      }
    })
  }, [paginateProps.currentPage])

  function changeCurrentPage(page: number) {
    setPaginateProps((prevPaginateProps) => {
      return {
        ...prevPaginateProps,
        currentPage: page,
      }
    })
  }

  return {
    changeCurrentPage,
    ...paginateProps,
  }
}
