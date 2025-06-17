import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criarPorduto = async (nome) => {
    console.log("ProdutoModel :: criarProduto")
    const sql = `INSERT INTO produto (nome) VALUES (?)`;
    const params = [nome];

    try {
        const [resposta] = await conexao.query(sql, params)
        return [201, {mensagem: "Produto Criando com sucesso!!"}];
    } catch (error) {
        console.error({mensagem: "erro ao criar produto", code:error.code, sql:error.sqlMensagem});
        return [500, {mensagem: "erro ao criar produto", code:error.code, sql:error.sqlMensagem}]
    }
}

export const verProduto = async () => {
    console.log("ProdutoModel :: verProduto");
    const sql = `SELECT * FROM produto`;
    
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta]
    } catch (error) {
        console.error({mensagem: "erro ao mostrar produto", code:error.code, sql:error.sqlMensagem});
        return [500, {mensagem: "erro ao mostrar produto", code:error.code, sql:error.sqlMensagem}]
    }
}