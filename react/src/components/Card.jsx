import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/card.css';
import Pagination from './Pagination';
import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react';

const CardProduct = () => {
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

  const [value, setValue] = React.useState('1')

  return (
    <>
      <div className="container">
        <div className="topico">
          <p>Todos os Produtos</p>
        </div>
        <div className="rowcards">
          {currentProducts.map(item => (
            <Link key={item.id} to={`/produto/${item.idProduct}`} className="card-link">
              <Card
              max-width="250px"
              width="100%">
                <CardBody>
                  <Image
                    src={`http://localhost:5000/${item.imageProduct}`}
                    alt={item.nameProduct}
                    borderRadius='lg'
                    width="250px"
                    height="340px"
                    display="block"
                    object-fit="cover"
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md' mb='0'>{item.nameProduct}</Heading>
                    <Text>
                      {item.descriptionProduct}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                      R${item.priceProduct}
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
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