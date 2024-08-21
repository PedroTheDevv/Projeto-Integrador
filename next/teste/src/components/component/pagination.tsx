import React from 'react';
import { Button } from "@/components/ui/button"
import '../styles/pagination.css';

interface PaginationProps {
    productsPerPage: number;
    totalProducts: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination:React.FC<PaginationProps> = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button
          size='sm'
          onClick={() => paginate(currentPage - 1)}
          className="page-link"
          disabled={currentPage === 1}>
            Página Anterior
          </Button>
        </li>

        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button
          size='sm'
          onClick={() => paginate(currentPage - 1)}
          className="page-link"
          disabled={currentPage === 1}>
            {currentPage === 1 ? '' : currentPage - 1}
          </Button>
        </li>

        <li className="page-item active">
          <Button
          size='sm'
          className="page-link">
            {currentPage}
          </Button>
        </li>

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button
          size='sm'
          onClick={() => paginate(currentPage + 1)}
          className="page-link"
          disabled={currentPage === totalPages}>
            {currentPage === totalPages ? '' : currentPage + 1}
          </Button>
        </li>

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button
          size='sm'
          onClick={() => paginate(currentPage + 1)}
          className="page-link"
          disabled={currentPage === totalPages}>
            Próxima Página
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
