// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CadastroForm from './components/CadastroForm';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import CadastroProduto from './components/CadastroProduto';
import EditProduct from './components/EditProduct';
import ListaProduto from './components/ListaProduto';
import AddSale from './components/AddSale'; // Para cadastrar vendas
import SalesList from './components/SalesList'; // Para listar vendas

const App = () => {
    return (
        <Router>
            <div>
                {/* Menu de Navegação */}
                <nav style={styles.navbar}>
                    <ul style={styles.navList}>
                        <li><Link to="/" style={styles.navLink}>Usuários</Link></li>
                        <li><Link to="/usuarios" style={styles.navLink}>Lista de Usuários</Link></li>
                        <li><Link to="/cadastrar-produto" style={styles.navLink}>Cadastrar Produto</Link></li>
                        <li><Link to="/produtos" style={styles.navLink}>Produtos</Link></li>
                        <li><Link to="/vendas/nova" style={styles.navLink}>Nova Venda</Link></li>
                        <li><Link to="/vendas" style={styles.navLink}>Vendas</Link></li>
                    </ul>
                </nav>

                {/* Conteúdo da Página */}
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<CadastroForm />} />
                        <Route path="/usuarios" element={<UserList />} />
                        <Route path="/editar/:id" element={<EditUser />} />
                        <Route path="/cadastrar-produto" element={<CadastroProduto />} />
                        <Route path="/produtos" element={<ListaProduto />} />
                        <Route path="/editar-produto/:id" element={<EditProduct />} />
                        <Route path="/vendas/nova" element={<AddSale />} />
                        <Route path="/vendas" element={<SalesList />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

// Estilos
const styles = {
    navbar: {
        backgroundColor: '#007bff',
        padding: '10px 20px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    navList: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        gap: '15px',
    },
    navLink: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: '600',
        padding: '8px 15px',
        borderRadius: '5px',
        transition: 'background-color 0.3s, color 0.3s',
    },
    navLinkHover: {
        backgroundColor: '#0056b3',
        color: '#ffffff',
    },
    content: {
        padding: '20px',
        margin: '0 auto',
        maxWidth: '900px',
    },
    formContainer: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ced4da',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default App;
