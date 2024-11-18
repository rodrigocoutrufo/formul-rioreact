// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css'; // Importando o CSS para estilização

const EditProduct = () => {
    const { id } = useParams();  // Pega o ID do produto da URL
    const navigate = useNavigate();
    const [produto, setProduto] = useState({ nome: '', preco: '', quantidade: '', usuario_id: '' });
    const [usuarios, setUsuarios] = useState([]);

    // Buscar produto e usuários ao carregar o componente
    useEffect(() => {
        const fetchProduto = async () => {
            try {
                console.log(`Fetching produto com ID: ${id}`);
                const response = await axios.get(`http://127.0.0.1:5000/produto/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        };
        

        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchProduto();
        fetchUsuarios();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:5000/produto/${id}`, produto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/produtos'); // Redireciona para a página de lista de produtos
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    return (
        <div className="edit-product-container">
            <h2 className="title">Editar Produto</h2>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <input
                    name="nome"
                    value={produto.nome}
                    onChange={handleChange}
                    placeholder="Nome do produto"
                    className="form-input"
                />
                <input
                    name="preco"
                    value={produto.preco}
                    onChange={handleChange}
                    placeholder="Preço"
                    type="number"
                    className="form-input"
                />
                <input
                    name="quantidade"
                    value={produto.quantidade}
                    onChange={handleChange}
                    placeholder="Quantidade"
                    type="number"
                    className="form-input"
                />
                <select
                    name="usuario_id"
                    value={produto.usuario_id}
                    onChange={handleChange}
                    className="form-input"
                    required
                >
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nome}
                        </option>
                    ))}
                </select>
                <button type="submit" className="submit-button">Salvar</button>
            </form>
        </div>
    );
};

export default EditProduct;
