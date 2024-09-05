import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/card.css';
import Pagination from './Pagination';

const CardProduct = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 40;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios.get('https://projeto-integrador-rrwb.onrender.com/produtos')
      .then(response => setData(response.data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const [value, setValue] = React.useState('1')

  return (
    <>
      <div className="container">
        <div className="topico">
          <p>Todos os Produtos</p>
        </div>
        <div className="rowcards">
          {currentProducts.map(item => (
            <Link key={item.idProduct} to={`/produto/${item.idProduct}`} className="card-link">
              <div className="product-card">
                <div className="product-image">
                  <img src={`https://projeto-integrador-rrwb.onrender.com/${item.imageProduct}`} alt={item.nameProduct} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{item.nameProduct}</h3>
                  <div className="product-price">
                    <span className="current-price">R$ {item.priceProduct}</span>
                    <span className="installment">{item.descriptionProduct}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default CardProduct;