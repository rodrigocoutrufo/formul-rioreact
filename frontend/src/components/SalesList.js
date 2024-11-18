import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SalesList.css';

const SalesList = () => {
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/vendas');
                setVendas(response.data);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            }
        };
        fetchVendas();
    }, []);

    return (
        <div className="sales-list-container">
            <h2>Lista de Vendas</h2>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Vendedor</th>
                        <th>Comprador</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda) => (
                        <tr key={venda.id}>
                            <td>{venda.id}</td>
                            <td>{venda.produto}</td>
                            <td>{venda.vendedor}</td>
                            <td>{venda.comprador}</td>
                            <td>{venda.quantidade}</td>
                            <td>R$ {venda.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;
