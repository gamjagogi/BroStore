import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Paging = (props) => {
  const {
    totalRecords = null,
    pageLimit = 30,
    pageNeighbours = 0,
    sizing = "",
    alignment = "",
    onPageChanged = () => {},
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalRecords / pageLimit);

  useEffect(() => {
    gotoPage(1);
  }, []);

  const gotoPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    onPageChanged({
      currentPage: validPage,
      totalPages,
      pageLimit,
      totalRecords,
    });
  };

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
      <nav aria-label="Page navigation">
        <ul className={`pagination ${sizing} ${alignment}`}>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                  <li key={index} className="page-item">
                    <button
                        className="page-link"
                        aria-label="Previous"
                        onClick={handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </button>
                  </li>
              );

            if (page === RIGHT_PAGE)
              return (
                  <li key={index} className="page-item">
                    <a
                        className="page-link"
                        href="#!"
                        aria-label="Next"
                        onClick={handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
              );

            return (
                <li
                    key={index}
                    className={`page-item${currentPage === page ? " active" : ""}`}
                >
                  <a
                      className="page-link"
                      href="#!"
                      onClick={(e) => handleClick(page, e)}
                  >
                    {page}
                  </a>
                </li>
            );
          })}
        </ul>
      </nav>
  );
};

Paging.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
  sizing: PropTypes.string,
};

export default React.memo(Paging);
