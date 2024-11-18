

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div className="container">
            <h2>Lista de Usuários</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF/CNPJ</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.cpf_cnpj}</td>
                            <td>
                                <Link to={`/editar/${usuario.id}`} className="button">Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/" className="button">Voltar para Cadastro</Link>
        </div>
    );
};

export default UserList;
