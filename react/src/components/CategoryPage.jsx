import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 40;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://projeto-integrador-rrwb.onrender.com/api/produtos?category=${categoryName}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, [categoryName]);

    return (
        <div className="container">
        <div className="topico">
          <p>{categoryName}</p>
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
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    );
};

export default CategoryPage;
