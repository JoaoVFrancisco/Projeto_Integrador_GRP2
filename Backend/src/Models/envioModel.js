import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criandoEnvio = async (data, quantidade, id_estoque, id_armazem) => {
    console.log("envioModel :: criandoenvio")
    const sql = `INSERT INTO envio (data, quantidade, estoque_id_estoque, armazem_id_armazem) VALUES (?,?,?,?)`
    const params = [data, quantidade, id_estoque, id_armazem]

     try {
        const [resposta] = await conexao.query(sql, params)
        return [201, {mensagem: "envio feito com sucesso!!"}];
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

export const vendoEnvio = async () => {
    console.log("envioModel :: vendoEnvio")
    const sql = `SELECT * FROM envio`
    try {
      const [resposta] = await conexao.query(sql);
      return [200, resposta]        
    } catch (error) {
        console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    }
};