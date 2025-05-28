import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criandoproduto = async (nome) => {
    console.log("produtoModel :: Criandoproduto");
    const sql = `INSERT INTO produtos (nome) VALUES (?)`;
    const params = [nome];

    try {
        const [resposta] = await conexao.query(sql, params)
        return [201, {mensagem: 'Produto criado com sucesso!!'}]
    } catch (error) {
        console.error({mensagem: "Erro ao criar produto", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem:"Erro ao criar produto", code:error.code, sql:error.sqlMessage}]
    }
}