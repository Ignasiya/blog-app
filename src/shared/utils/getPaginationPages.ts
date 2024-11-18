export function getPaginationPages(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = []

  pages.push(1)

  let startPage = Math.max(currentPage - 2, 2)
  let endPage = Math.min(currentPage + 2, totalPages - 1)

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages - 1)
  } else if (currentPage >= totalPages - 2) {
    startPage = Math.max(totalPages - 4, 2)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (totalPages > 1) {
    pages.push(totalPages)
  }

  if (startPage > 2) {
    pages.splice(1, 0, '...')
  }
  if (endPage < totalPages - 1) {
    pages.splice(pages.length - 1, 0, '...')
  }

  return pages
}
