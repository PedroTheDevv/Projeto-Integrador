import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/produtoDetalhe.css';
import { CartContext } from './CartContext';

const ProdutoDetalhe = ({product}) => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/produto/${id}`)
      .then(response => setProduto(response.data))
      .catch(error => console.error('Erro ao buscar detalhes do produto:', error));
  }, [id]);

  const handleAddToCart = () => {
    const userId = localStorage.getItem('userId');
    addToCart(produto);
  };

  if (!produto) return <p>Carregando...</p>;

  return (
    <div className="produto-detalhe">
      <img src={`http://localhost:5000/${produto.imageProduct}`} alt={produto.nameProduct} className="zoom-image"/>
      <div className="detalhes">
        <h1>{produto.nameProduct}</h1>
        <p>Preço: R${produto.priceProduct}</p>
        <p>Tamanho disponível: {produto.sizeProduct}</p>
        <p>Descrição: {produto.descriptionProduct}</p>
        <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
};

export default ProdutoDetalhe;
