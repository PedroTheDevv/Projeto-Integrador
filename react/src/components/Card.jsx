import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/card.css';
import Pagination from './Pagination';

const Card = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 40;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => setData(response.data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <>
      <div className="container">
        <div className="topico">
          <p>Todos os Produtos</p>
        </div>
        <div className="rowcards">
          {currentProducts.map(item => (
            <Link key={item.id} to={`/produto/${item.idProduct}`} className="card-link">
              <div className="card">
                <img src={`http://localhost:5000/${item.imageProduct}`} alt="Roupa" />
                <div className="card-conteudo">
                  <p className="nome">{item.nameProduct}</p>
                  <p className="preco">R${item.priceProduct}</p>
                  <p className="tamanho">Tamanho disponível: {item.sizeProduct}</p>
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

export default Card;