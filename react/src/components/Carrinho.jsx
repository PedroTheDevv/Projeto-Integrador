import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Carrinho = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (cart.length === 0) {
    return <p>Seu carrinho está vazio.</p>;
  }

  return (
    <div className="carrinho-container">
      <h2>Seu Carrinho</h2>
      <ul className="carrinho-list">
        {cart.map((item) => (
          <li key={item.id} className="carrinho-item">
            <img src={`http://localhost:5000/${item.imageProduct}`} alt={item.nameProduct} className="carrinho-item-image" width="200px" height="200px"/>
            <div className="carrinho-item-details">
              <h3>{item.nameProduct}</h3>
              <p>Preço: R${item.priceProduct}</p>
              <p>Tamanho: {item.size}</p>
              <p>Quantidade: {item.quantity}</p>
              <button onClick={() => handleRemove(item.idProduct)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleClearCart} className="carrinho-clear-button">Limpar Carrinho</button>
    </div>
  );
};

export default Carrinho;
