import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListaProdutos.css';

const ListaProduto = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/produtos');
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };
        fetchProdutos();
    }, []);

    return (
        <div className="table-container">
            <h2>Lista de Produtos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.usuario}</td>
                            <td>
                                <Link to={`/editar-produto/${produto.id}`} className="button">
                                    Editar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaProduto;
