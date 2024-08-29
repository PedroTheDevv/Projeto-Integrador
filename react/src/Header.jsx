import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/header.css';
import { Link } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const Header = () => {
    const { isAuthenticated, username, logout } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (isAuthenticated) {
          axios.get('http://localhost:5000/cart', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => setCartItems(response.data))
          .catch(error => console.error('Erro ao buscar dados:', error));
        }
      }, [isAuthenticated]);

    return(
        <header className="header">
            <div className="containerr">
                <div className="logo">
                    <Link to={'/'}><img src="logo.png" alt="Ferracini"/></Link>
                </div>
                <nav className="nav-links">
                    <Link to={'/'}>Vestidos</Link>
                    <Link to={'/'}>Calças</Link>
                    <Link to={'/'}>Camisas</Link>
                    <a href="#" className="highlight">Sale</a>
                </nav>
                <div className="search-container">
                    <input type="text" placeholder="O que você procura?" className="search-input"/>
                    <button className="search-button">🔍</button>
                </div>
                <div className="icons">
                    {isAuthenticated ? (
                        <>
                            <p>👤{username}</p>
                            <Link to="/carrinho">🛒({cartItems.length})</Link>
                            <button onClick={logout}>Sair</button>
                        </>
                    ):(
                        <>
                            <Link to={`/loginUser`} classNameName="card-link">
                                Fazer Login /
                            </Link>
                            <Link to={'/cadastroUser'} classNameName="card-link">
                                &nbsp;Cadastrar-se
                            </Link>
                        </>
                    )}
                    {/*<a href="#" className="icon">❤</a>
                    <a href="#" className="icon">👤</a>
                    <a href="#" className="icon">🛒 (0)</a>*/}
                </div>
            </div>
        </header>
        /*
        <header classNameName="header">
            <div classNameName="logo">
                <Link to={'/'}><img src="logo.png" alt="Logo"/></Link>
            </div>
            <button classNameName="menu"><img src="imgs/menu-aberto.png" classNameName="img"/></button>
            <nav>
                <ul classNameName="navbar">
                    <li classNameName="drop">
                        <a href="#" style={{ marginBottom: '2px' }}>Produtos&nbsp;<img src="imgs/jogar.png" classNameName="dropdown"/></a>
                            <ul>
                            <li><a href="calcas.html" style={{ marginTop: '2px' }}>Calças</a></li>
                            <li><a href="vestidos.html">Vestidos</a></li>
                            <li><a href="blusas.html">Blusas</a></li>
                            <li><a href="macacoes.html">Macacões</a></li>
                        </ul>
                    </li>
                    <li><Link to={'/sobre'}><p style={{ marginTop: '18px', marginBottom: '20px' }}>Sobre</p></Link></li>
                    <li><a href="contato.html">Contato</a></li>
                </ul>
                <div classNameName="cadastro">
                {isAuthenticated ? (
                    <>
                        <p>Olá, {username}</p>
                        <Link to="/carrinho">Carrinho</Link>
                        <button onClick={logout}>Sair</button>
                    </>
                ):(
                    <>
                        <Link to={`/loginUser`} classNameName="card-link">
                            Fazer Login /
                        </Link>
                        <Link to={'/cadastroUser'} classNameName="card-link">
                            &nbsp;Cadastrar-se
                        </Link>
                    </>
                )}
                </div>
            </nav>
        </header>*/
    );
};

export default Header;
