import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import CardProduct from './components/Card';
import CadastroUsuario from './components/CadastroUsuario';
import Sobre from './components/Sobre';
import CadastroProduto from './components/CadastroProduto'
import ProdutoDetalhe from './components/ProdutoDetalhe';
import { CartProvider } from './components/CartContext';
import Carrinho from './components/Carrinho';
import Login from './components/LoginUsuario';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { AuthProvider } from './components/AuthContext';
import CategoryPage from './components/CategoryPage';
import SearchResultsPage from './components/SearchResultsPage';
import ProductCRUD from './components/AdminProducts';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<CardProduct />} />
            <Route path="/categoria/:categoryName" element={<CategoryPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/cadastroUser" element={<ProtectedRoute element={<CadastroUsuario />} />} />
            <Route path="/loginUser" element={<ProtectedRoute element={<Login />} />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/cadastroProduto" element={<AdminRoute element={<CadastroProduto />}/>}/>
            <Route path="/adminProducts" element={<AdminRoute element={<ProductCRUD />}/>}/>
            <Route path="/produto/:id" element={<ProdutoDetalhe />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
