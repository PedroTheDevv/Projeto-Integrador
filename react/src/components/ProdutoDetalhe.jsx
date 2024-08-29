import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/produtoDetalhe.css';
import { CartContext } from './CartContext';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup, RadioGroup, Radio, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

const ProdutoDetalhe = ({ product }) => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [value, setValue] = React.useState('1');
  const [tamanhos, setTamanhos] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/produto/${id}`)
      .then(response => {
        setProduto(response.data)
        const tamanhosArray = response.data.sizeProduct.split(' ');
        setTamanhos(tamanhosArray);
      })
      .catch(error => console.error('Erro ao buscar detalhes do produto:', error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(produto, value);
  };

  if (!produto) return <p>Carregando...</p>;

  return (

    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={`http://localhost:5000/${produto.imageProduct}`}
        alt={produto.nameProduct}
      />
      <Stack>
        <CardBody>
          <Heading size='md' mb='0'>{produto.nameProduct}</Heading>
          <Text py='2'>
            {produto.descriptionProduct}
          </Text>
          <Text>
            R${produto.priceProduct}
          </Text>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row' spacing='3'>
              {tamanhos.map((tamanho, index) => (  
                <Radio key={index} value={tamanho}>{tamanho}</Radio>
              ))}
            </Stack>
          </RadioGroup>
        </CardBody>
        <CardFooter display='flex' flexDirection='column'>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button
              variant='ghost'
              colorScheme='blue'
              onClick={handleAddToCart}>
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ProdutoDetalhe;