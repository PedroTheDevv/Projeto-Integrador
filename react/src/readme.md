//Puxar dados do banco de dados:

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/api/data')
        .then(response => setData(response.data))
        .catch(error => console.error('Erro ao buscar dados:', error));
    }, []);

return(
    {data.map(item => (
        <div>
            <h1>{item.nome}</h1>
            <h1>{item.ano}</h1>
        </div>
    ))}
)



//Adicionar ao carrinho
<div className="divComprar">
    <a href="https://api.whatsapp.com/send?phone=5532999915045&text=Tenho%20interesse%20em%20seus%20produtos." className="comprar">
        <img src="imgs/carrinho.png" className="icon"/>
        <p>Adicionar ao Carrinho</p>
    </a>
</div>



