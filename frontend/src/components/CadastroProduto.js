import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CadastroProduto.css';

const CadastroProduto = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [usuarioId, setUsuarioId] = useState(''); // Novo estado para o usuário selecionado
    const [usuarios, setUsuarios] = useState([]); // Estado para armazenar a lista de usuários
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    // Obter a lista de usuários ao carregar o componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/usuarios'); // Endpoint para obter usuários
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao obter usuários:', error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/produto', {
                nome,
                preco: parseFloat(preco),
                quantidade: parseInt(quantidade),
                usuario_id: usuarioId // Envia o ID do usuário selecionado
            });
            setMensagem(response.data.message);
            setNome('');
            setPreco('');
            setQuantidade('');
            setUsuarioId(''); // Limpa o campo de seleção
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            setMensagem('Erro ao cadastrar produto.');
        }
    };

    const handleViewProducts = () => {
        navigate('/produtos'); // Navegar para a lista de produtos
    };

    return (
        <div className="form-container">
            <h2>Cadastrar Produto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">Nome do Produto</label>
                    <input
                        type="text"
                        className="input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">Preço</label>
                    <input
                        type="number"
                        className="input"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">Quantidade</label>
                    <input
                        type="number"
                        className="input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">Usuário</label>
                    <select
                        className="input"
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        required
                    >
                        <option value="">Selecione um usuário</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="button">Cadastrar Produto</button>
            </form>
            <button onClick={handleViewProducts} className="button">Ver Produtos</button>
            {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
    );
};

export default CadastroProduto;
