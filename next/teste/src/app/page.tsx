'use client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CardProduct } from '../components/component/card';
import { CadastroUsuario } from '../components/component/cadastro-usuario';

export default function Home() {
  return (
   <>
    <div id="root" className="flex flex-col min-h-screen">
     <Router>
      <Routes>
       <Route path='/' element={<CardProduct />}/>
       <Route path='/cadastroUser' element={<CadastroUsuario />}/>
      </Routes>
     </Router>
    </div>
   </>
  );
}
