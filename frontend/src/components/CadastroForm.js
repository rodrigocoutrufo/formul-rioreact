import React, { useState } from 'react';
import axios from 'axios';
import './CadastroForm.css';

const CadastroForm = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar', {
                nome,
                email,
                cpf_cnpj: cpfCnpj,
                senha,
            });
            setMensagem(response.data.message);
            setNome('');
            setEmail('');
            setCpfCnpj('');
            setSenha('');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            setMensagem('Erro ao cadastrar usuário.');
        }
    };

    return (
        <div className="form-container">
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">Nome</label>
                    <input
                        type="text"
                        className="input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">CPF/CNPJ</label>
                    <input
                        type="text"
                        className="input"
                        value={cpfCnpj}
                        onChange={(e) => setCpfCnpj(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label">Senha</label>
                    <input
                        type="password"
                        className="input"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>} {/* Vai mostrar a mensagem */}
        </div>
    );
};

export default CadastroForm;
