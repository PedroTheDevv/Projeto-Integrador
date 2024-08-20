import React from 'react';
import './styles/header.css';
import { Link } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const Header = () => {
    const { isAuthenticated, username, logout } = useAuth();

    return(
        <header className="header">
            <div className="logo">
                <Link to={'/'}><img src="logo.png" alt="Logo"/></Link>
            </div>
            <button className="menu"><img src="imgs/menu-aberto.png" className="img"/></button>
            <nav>
                <ul className="navbar">
                    <li className="drop">
                        <a href="#" style={{ marginBottom: '2px' }}>Produtos&nbsp;<img src="imgs/jogar.png" className="dropdown"/></a>
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
                <div className="cadastro">
                {isAuthenticated ? (
                    <>
                        <p>Olá, {username}</p>
                        <Link to="/carrinho">Carrinho</Link>
                        <button onClick={logout}>Sair</button>
                    </>
                ):(
                    <>
                        <Link to={`/loginUser`} className="card-link">
                            Fazer Login /
                        </Link>
                        <Link to={'/cadastroUser'} className="card-link">
                            &nbsp;Cadastrar-se
                        </Link>
                    </>
                )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
