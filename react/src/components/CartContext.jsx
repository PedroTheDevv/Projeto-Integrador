import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });    

    const addToCart = async (product, quantity = 1) => {
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
            body: JSON.stringify({ productId: product.idProduct, quantity }),
          });
    
          if (response.ok) {
            setCart(prevCart => {
              const existingProduct = prevCart.find(item => item.id === product.idProduct);
              const updatedCart = existingProduct
                ? prevCart.map(item =>
                    item.id === product.idProduct
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
                  )
                : [...prevCart, { ...product, quantity }];
              
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

  /*const removeFromCart = (productId) => {
    setCart(prevCart => {
        const updatedCart = prevCart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
  };*/

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.idProduct !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
