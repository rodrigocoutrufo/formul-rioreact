// src/components/EditUser.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/usuarios/${id}`);
                const user = response.data;
                setNome(user.nome);
                setEmail(user.email);
                setCpfCnpj(user.cpf_cnpj);
                setSenha(user.senha);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('Usuário não encontrado!');
                } else {
                    console.error('Erro ao buscar usuário:', error);
                }
            }
        };
    
        fetchUser();
    }, [id]);
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:5000/usuarios/${id}`, {
                nome,
                email,
                cpf_cnpj: cpfCnpj,
                senha,
            });
            navigate('/usuarios');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    const handleViewUsers = () => {
        navigate('/usuarios'); 
    };

    return (
        <div className="edit-container">
            <h2>Editar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="edit-table">
                    <div className="table-row">
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="table-row">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="table-row">
                        <label>CPF/CNPJ:</label>
                        <input type="text" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required />
                    </div>
                    <div className="table-row">
                        <label>Senha:</label>
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit" className="button">Atualizar Usuário</button>
                    <button type="button" onClick={handleViewUsers} className="button">Ver Usuários</button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
