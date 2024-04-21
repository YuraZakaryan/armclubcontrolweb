import { IPagination } from '@types';
import React, { memo, useEffect, useState } from 'react';

export const Pagination: React.FC<IPagination> = memo(({ currentPage, totalPages, setCurrentPage }) => {
  const [screenSize, setScreenSize] = useState<boolean>(window.matchMedia('(max-width: 700px)').matches);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.matchMedia('(max-width: 700px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const maxPageNumbersToShow = screenSize ? 3 : 5;
    const pageNumbers = [];

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfMax = Math.floor(maxPageNumbersToShow / 2);
      const leftOffset = Math.max(1, currentPage - halfMax);
      const rightOffset = Math.min(totalPages, currentPage + halfMax);

      if (leftOffset > 1) {
        if (leftOffset > 2) {
          pageNumbers.push(1);
        }
        if (leftOffset > 3) {
          pageNumbers.push('...');
        }
      }

      for (let i = leftOffset; i <= rightOffset; i++) {
        pageNumbers.push(i);
      }

      if (rightOffset < totalPages) {
        if (rightOffset < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }

      if (screenSize) {
        while (pageNumbers.length > maxPageNumbersToShow) {
          if (pageNumbers.indexOf(currentPage) < maxPageNumbersToShow / 2) {
            pageNumbers.pop();
          } else {
            pageNumbers.shift();
          }
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className={`flex justify-center md:justify-end mt-5${totalPages <= 1 ? ' hidden' : ''}`}>
      <nav aria-label={`Page navigation`}>
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              data-testid="previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1 ? 'bg-whiter !text-bodydark2' : null
              }`}
            >
              Նախորդը
            </button>
          </li>
          {generatePageNumbers().map((pageNumber, index) => (
            <li key={index}>
              {pageNumber === '...' ? (
                <span className="px-3">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(pageNumber as number)}
                  className={`hover:bg-whiter flex h-8 items-center justify-center border border-[#e0e0e0] bg-white px-3 leading-tight text-gray-400 ${
                    pageNumber === currentPage ? 'font-extrabold text-black' : null
                  }`}
                >
                  {pageNumber}
                </button>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`ml-0 flex h-8 w-full min-w-[80px] items-center justify-center rounded-r-md border border-[#e0e0e0] bg-black leading-tight text-white ${
                currentPage === totalPages ? 'bg-whiter !text-bodydark2' : null
              }`}
            >
              Հաջորդը
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
});

Pagination.displayName = 'Pagination';
