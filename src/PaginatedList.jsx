import React from "react";
import { Pagination } from "react-bootstrap";
const PaginatedList = ({
  currentFarmers,
  filteredFarmers,
  farmersPerPage,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);

  return (
    currentFarmers.length !== 0 && (
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1"
        />

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            onClick={() => paginate(index + 1)}
            active={index + 1 === currentPage}
            style={{
              backgroundColor: index + 1 === currentPage ? "#279A82" : "",
              borderColor: index + 1 === currentPage ? "#279A82" : "",
            }}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-1"
        />
      </Pagination>
    )
  );
};

export default PaginatedList;
