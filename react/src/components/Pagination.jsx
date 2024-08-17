import React from 'react';
import '../styles/pagination.css';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            disabled={currentPage === 1}
          >
            Página Anterior
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            disabled={currentPage === 1}
          >
            {currentPage === 1 ? '' : currentPage - 1}
          </button>
        </li>
        <li className="page-item active">
          <button className="page-link">
            {currentPage}
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={currentPage === totalPages}
          >
            {currentPage === totalPages ? '' : currentPage + 1}
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={currentPage === totalPages}
          >
            Próxima Página
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
