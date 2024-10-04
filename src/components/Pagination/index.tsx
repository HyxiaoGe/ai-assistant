import React from "react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7; // 调整这个值来改变最大可见页码数

    if (pageCount <= maxVisiblePages) {
      // 如果总页数小于等于最大可见页码数，显示所有页码
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      // 总是显示第一页
      pageNumbers.push(renderPageButton(1));

      if (currentPage > 3) {
        pageNumbers.push(
          <span key="ellipsis-start" className="px-2">
            ...
          </span>
        );
      }

      // 显示当前页附近的页码
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(pageCount - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (currentPage < pageCount - 2) {
        pageNumbers.push(
          <span key="ellipsis-end" className="px-2">
            ...
          </span>
        );
      }

      // 总是显示最后一页
      pageNumbers.push(renderPageButton(pageCount));
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber: number) => (
    <button
      key={pageNumber}
      onClick={() => onPageChange(pageNumber)}
      className={clsx(
        "px-2 py-1",
        pageNumber === currentPage
          ? "text-blue-500 font-bold"
          : "text-gray-500 hover:text-blue-500"
      )}
    >
      {pageNumber}
    </button>
  );

  return (
    <div className="flex items-center justify-center space-x-1 mt-4 text-sm">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={clsx(
          "px-2 py-1",
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-blue-500"
        )}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
        className={clsx(
          "px-2 py-1",
          currentPage === pageCount
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-blue-500"
        )}
        disabled={currentPage === pageCount}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
