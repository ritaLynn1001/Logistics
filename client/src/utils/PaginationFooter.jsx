const PaginationFooter = ({ 
  currentPage, 
  totalPages, 
  startIndex, 
  lastIndex, 
  totalItems, 
  onPageChange 
}) => {
  if (totalPages <= 0) return null;

  return (
    <div className="flex items-center justify-between mt-6 bg-white px-4 py-3 border border-gray-200 rounded-lg">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{totalItems > 0 ? startIndex + 1 : 0}</span> to{" "}
        <span className="font-medium text-gray-700">
          {Math.min(lastIndex, totalItems)}
        </span>{" "}
        of <span className="font-medium text-gray-700">{totalItems}</span> results
      </p>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {/* Smart Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isFirstOrLast = pageNumber === 1 || pageNumber === totalPages;
          const isNearCurrent = Math.abs(pageNumber - currentPage) <= 1;

          if (isFirstOrLast || isNearCurrent) {
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === pageNumber
                    ? "bg-sky-600 text-white"
                    : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
          }

          return null;
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationFooter;