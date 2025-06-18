import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criandoProducao = async (data, quantidade_total, quantidade_usavel, consumo_energetico, id_usuario, id_produto, id_estoque) => {
    console.log("ProducaoModel :: criandoProducao")
    const sql = `INSERT INTO producao (data, quantidade_total, quantidade_usavel, consumo_energetico, usuario_id_usuario, produto_id_produto, estoque_id_estoque) VALUES (?,?,?,?,?,?,?)`

    const params = [data, quantidade_total, quantidade_usavel, consumo_energetico, id_usuario, id_produto, id_estoque]

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, {mensagem: "Produção feita com sucesso"}];
    } catch (error) {
        console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
    }
};

export const vendoProducao = async () => {
    console.log("ProducaoModel :: vendoProducao")
    const sql = `SELECT * FROM producao`
    try {
        const [resposta] = await conexao.query(sql)
        return [201, resposta]
    } catch (error) {
        console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
    }
};