import React, { useState, useEffect } from 'react';
import api from '../axiosConfig'; // Agora importando a instância configurada do Axios
import './AddSale.css'; // Certifique-se de criar este arquivo para estilização

const AddSale = () => {
    const [produtos, setProdutos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [venda, setVenda] = useState({
        produto_id: '',
        vendedor_id: '',
        comprador_id: '',
        quantidade: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const produtosRes = await api.get('/produtos'); // Usando a URL base configurada
                const usuariosRes = await api.get('/usuarios');
                setProdutos(produtosRes.data);
                setUsuarios(usuariosRes.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVenda({ ...venda, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { produto_id, vendedor_id, comprador_id, quantidade } = venda;
    
        // Verificar se todos os campos estão preenchidos
        if (!produto_id || !vendedor_id || !comprador_id || !quantidade) {
            alert('Por favor, preencha todos os campos');
            return;
        }
    
        const vendaData = {
            produto_id,
            vendedor_id,
            comprador_id,
            quantidade: parseInt(quantidade), // Garantir que a quantidade seja um número
        };
    
        try {
            const response = await api.post('/venda', vendaData);
    
            // Verificar se a resposta tem dados
            if (response && response.data) {
                console.log('Venda cadastrada com sucesso:', response.data);
            } else {
                console.error('Resposta da API sem dados:', response);
            }
        } catch (error) {
            // Verificar erro na requisição
            if (error.response) {
                console.error("Erro ao cadastrar venda: ", error.response.data);
            } else {
                console.error("Erro ao fazer a requisição: ", error);
            }
        }
    };
    

    return (
        <div className="add-sale-container">
            <h2>Cadastrar Venda</h2>
            <form className="add-sale-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="produto_id">Produto</label>
                    <select id="produto_id" name="produto_id" value={venda.produto_id} onChange={handleChange} required>
                        <option value="">Selecione o produto</option>
                        {produtos.map((produto) => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome} - Estoque: {produto.quantidade}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="vendedor_id">Vendedor</label>
                    <select id="vendedor_id" name="vendedor_id" value={venda.vendedor_id} onChange={handleChange} required>
                        <option value="">Selecione o vendedor</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="comprador_id">Comprador</label>
                    <select id="comprador_id" name="comprador_id" value={venda.comprador_id} onChange={handleChange} required>
                        <option value="">Selecione o comprador</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quantidade">Quantidade</label>
                    <input
                        type="number"
                        id="quantidade"
                        name="quantidade"
                        value={venda.quantidade}
                        onChange={handleChange}
                        placeholder="Quantidade"
                        required
                    />
                </div>

                <button className="submit-button" type="submit">Cadastrar Venda</button>
            </form>
        </div>
    );
};

export default AddSale;
