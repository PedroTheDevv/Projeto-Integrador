import React, { useState } from 'react';
import '../styles/cadastroProd.css';

function Cadastro() {
    const [nomeProd, setNomeProd] = useState('');
    const [categoriaProd, setCategoriaProd] = useState('');
    const [tamanhoProd, setTamanhoProd] = useState('');
    const [precoProd, setPrecoProd] = useState('');
    const [descriptionProd, setDescriptionProd] = useState('');
    const [imagemProd, setImagemProd] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nomeProd', nomeProd);
        formData.append('tamanhoProd', tamanhoProd);
        formData.append('precoProd', precoProd);
        formData.append('imagemProd', imagemProd);
        formData.append('descriptionProd', descriptionProd);
        formData.append('categoriaProd', categoriaProd);

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('https://projeto-integrador-rrwb.onrender.com/api/cadastroProduto', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                setNomeProd('');
                setCategoriaProd('');
                setTamanhoProd('');
                setPrecoProd('');
                setImagemProd(null);
                setDescriptionProd('');
            } else {
                alert('Erro ao realizar o cadastro.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao realizar o cadastro.');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="text-header">Cadastro de Produto</div>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome do Produto:</label>
                        <input
                            className="form-control"
                            id="name"
                            type="text"
                            value={nomeProd}
                            onChange={(e) => setNomeProd(e.target.value)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Categoria do Produto:</label>
                        <select
                            className="form-control"
                            id="category"
                            type="text"
                            value={categoriaProd}
                            onChange={(e) => setCategoriaProd(e.target.value)}
                            required >
                            <option value="">Selecione uma categoria</option>
                            <option value="Vestido">Vestido</option>
                            <option value="Calça">Calça</option>
                            <option value="Camisa">Camisa</option>
                            <option value="Macacão">Macacão</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Tamanhos disponíveis:</label>
                        <input
                            className="form-control"
                            type="text"
                            id="size"
                            value={tamanhoProd.toUpperCase()}
                            onChange={(e) => setTamanhoProd(e.target.value)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Preço:</label>
                        <input
                            className="form-control"
                            type="number"
                            id="price"
                            value={precoProd}
                            onChange={(e) => setPrecoProd(e.target.value)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição:</label>
                        <input
                            className="form-control"
                            type="text"
                            id="description"
                            value={descriptionProd}
                            onChange={(e) => setDescriptionProd(e.target.value)}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Imagem do Produto</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImagemProd(e.target.files[0])}
                            accept="image/jpeg"
                            required
                        />
                    </div>
                    <input type="submit" className="btn" value="submit" />
                </form>
            </div>
        </div>
    );
}

export default Cadastro;