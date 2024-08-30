import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProductModal from './EditProductModal';

const ProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/produtos');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/editarProduto/${updatedProduct.idProduct}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: updatedProduct.nome,
          size: updatedProduct.size,
          price: updatedProduct.price,
          description: updatedProduct.description,
          category: updatedProduct.category
        }),
      });
  
      const responseBody = await response.text(); // Ler como texto primeiro
      const responseData = responseBody ? JSON.parse(responseBody) : {}; // Converter para JSON
  
      if (response.ok) {
        alert('Produto atualizado com sucesso!');
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert(`Erro: ${responseData.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto.');
    }
  };  

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deletarProduto/${id}`)
    setProducts(products.filter((product) => product.idProduct !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gerenciamento de Produtos</h2>
      <Link to={'/cadastroProduto'}>
        <button 
          style={{ 
            padding: '10px 20px', 
            margin: '20px 0', 
            fontSize: '16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer'
          }}>
          Criar Novo Produto
        </button>
      </Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Preço</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Descrição</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Categoria</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.idProduct}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.idProduct}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.nameProduct}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>R$ {product.priceProduct}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.descriptionProduct}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.categoryProduct}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button 
                  onClick={() => handleEdit(product)} 
                  style={{ marginRight: '10px', padding: '5px 10px' }}>
                  Alterar
                </button>
                <button 
                  onClick={() => handleDelete(product.idProduct)}
                  style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProduct && (
        <EditProductModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductCRUD;
