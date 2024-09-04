import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Image, Stack, Divider } from '@chakra-ui/react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data); // Verifique a estrutura dos dados aqui
        setOrders(response.data);
      } catch (err) {
        setError('Erro ao carregar pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Text>Carregando...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <Box p={4} maxWidth="1200px" mx="auto">
      <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">Pedidos</Text>
      {orders.length === 0 ? (
        <Text fontSize="xl" textAlign="center">Nenhum pedido encontrado.</Text>
      ) : (
        orders.map((order) => (
          <Box key={order.id} mb={6} borderWidth="1px" borderRadius="md" p={4} width={500}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="lg" fontWeight="bold">Pedido de {order.userName}</Text>
              <Text fontSize="md">Data: {new Date(order.orderDate).toLocaleDateString()}</Text>
            </Flex>
            <Divider mb={4} />
            <Stack spacing={4}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <Flex key={item.idOrderProduct} alignItems="center" borderWidth="1px" borderRadius="md" p={4}>
                    <Image src={`http://localhost:5000/${item.image}`} boxSize="100px" objectFit="cover" alt={item.nameProduct} />
                    <Box ml={4} flex="1">
                      <Text fontSize="lg" fontWeight="semibold">{item.name}</Text>
                      <Text color="gray.500">Valor: R${item.price}</Text>
                      <Text color="gray.500">Tamanho: {item.sizeOrder}</Text>
                    </Box>
                  </Flex>
                ))
              ) : (
                <Text>Nenhum item encontrado para este pedido.</Text>
              )}
              <Flex justifyContent="end" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">Total: R${order.total}</Text>
              </Flex>
            </Stack>
          </Box>
        ))
      )}
    </Box>
  );
};

export default AdminOrders;
