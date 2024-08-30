import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditProductModal = ({ isOpen, onRequestClose, product, onSave }) => {
    const [nome, setNome] = useState(product.nameProduct || '');
    const [price, setPrice] = useState(product.priceProduct || '');
    const [size, setSize] = useState(product.sizeProduct || '');
    const [description, setDescription] = useState(product.descriptionProduct || '');
    const [category, setCategory] = useState(product.categoryProduct || '');
  
    const handleSave = () => {
      onSave({ ...product, nome, size, price, description, category });
      onRequestClose();
    };
  
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <h2>Editar Produto</h2>
        <form>
          <div>
            <label>Nome do produto:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Tamanhos disponíveis:</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div>
            <label>Descrição:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Categoria:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Vestido">Vestido</option>
              <option value="Calça">Calça</option>
              <option value="Camisa">Camisa</option>
              <option value="Macacão">Macacão</option>
            </select>
          </div>
          <button type="button" onClick={handleSave}>Salvar</button>
          <button type="button" onClick={onRequestClose}>Cancelar</button>
        </form>
      </Modal>
    );
};  

export default EditProductModal;
