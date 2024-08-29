import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import '../styles/carrinho.css';
import { Box, Flex, Image, Text, Button, IconButton, Stack } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const Carrinho = () => {
  const { removeFromCart, clearCart } = useContext(CartContext);
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => setData(response.data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const handleRemove = (idCart) => {
    removeFromCart(idCart);
    setData(prevData => prevData.filter(item => item.idCart !== idCart));
  };

  const handleClearCart = () => {
    clearCart();
    setData([]);
  };

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Text fontSize="2xl" mb={4} fontWeight="bold">Carrinho de Compras</Text>
      
      {data.length === 0 ? (
        <Text fontSize="xl">Seu carrinho está vazio.</Text>
      ) : (
        <Stack spacing={4}>
          {data.map((item) => (
            <Flex key={item.idCart} alignItems="center" justifyContent="space-between" p={4} borderWidth="1px" borderRadius="md">
              <Image src={`http://localhost:5000/${item.imageProduct}`} boxSize="100px" objectFit="cover" alt={item.nameProduct} />
              <Box ml={4} flex="1">
                <Text fontSize="lg" fontWeight="semibold">{item.nameProduct}</Text>
                <Text color="gray.500">{item.quantity} x R${item.priceProduct}</Text>
              </Box>
              <Text fontSize="lg" fontWeight="bold">R${item.priceProduct}</Text>
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                variant="outline"
                onClick={() => handleRemove(item.idCart)}
                aria-label="Remover item"
                ml={4}
              />
            </Flex>
          ))}
        </Stack>
      )}

      {data.length > 0 && (
        <Box mt={8}>
          <Flex justifyContent="space-between" alignItems="center">
            <Button colorScheme="red" onClick={handleClearCart}>
              Limpar Carrinho
            </Button>
            <Button colorScheme="teal"/* onClick={onCheckout}*/>
              Finalizar Compra
            </Button>
          </Flex>
        </Box>
      )}
    </Box>

      /*<div className="carrinho-container">
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
    </div>*/

  );
};

export default Carrinho;
