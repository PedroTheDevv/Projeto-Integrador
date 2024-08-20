import React, { useState } from 'react';

function Cadastro() {
    const [nomeProd, setNomeProd] = useState('');
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

        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('http://localhost:5000/api/cadastroProduto', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                body: formData,
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                setNomeProd('');
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
        <div className="signup-container">
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit} className="signup-form" encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Nome do Produto</label>
                    <input
                        type="text"
                        id="name"
                        value={nomeProd}
                        onChange={(e) => setNomeProd(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Tamanhos disponíveis</label>
                    <input
                        type="text"
                        id="size"
                        value={tamanhoProd.toUpperCase()}
                        onChange={(e) => setTamanhoProd(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input
                        type="number"
                        id="price"
                        value={precoProd}
                        onChange={(e) => setPrecoProd(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <input
                        type="text"
                        id="description"
                        value={descriptionProd}
                        onChange={(e) => setDescriptionProd(e.target.value)}
                        required
                    />
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
                <button type="submit" className="submit-button">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastro;