import React, { createContext, useState } from 'react';
import axios from 'axios';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });    

    const addToCart = async (product, size) => {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para adicionar itens ao carrinho.');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:5000/addCart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: product.idProduct, size }),
          });
    
          if (response.ok) {
            setCart(prevCart => {
              const existingProduct = prevCart.find(item => item.id === product.idProduct);
              const updatedCart = existingProduct
                ? prevCart.map(item =>
                    item.id === product.idProduct
                      ? { ...item, size }
                      : item
                  )
                : [...prevCart, { ...product, size }];
              
              localStorage.setItem('cart', JSON.stringify(updatedCart));
              return updatedCart;
            });
            alert('Produto adicionado ao carrinho!');
          } else {
            alert('Erro ao adicionar produto ao carrinho.');
          }
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao adicionar produto ao carrinho.');
        }
      };

  const removeFromCart = async(idCart) => {
    try{
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/removeCart/${idCart}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCart(prevCart => prevCart.filter(item => item.idCart !== idCart));
      alert('Item removido do carrinho com sucesso!');
    } catch(error){
      console.error('Erro ao remover produto do carrinho:', error);
    }
  };

  const clearCart = async() => {
    try{
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/clearCart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Carrinho limpo com sucesso!')
      setCart([]);
      localStorage.removeItem('cart');
    } catch(error){
      console.error('Erro ao remover produto do carrinho:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
