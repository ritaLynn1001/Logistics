import { useState } from "react";

export const usePagination = (totalItems, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to page 1 if total items change and current page is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  return {
    currentPage,
    setCurrentPage,
    startIndex,
    lastIndex,
    totalPages,
  };
};