import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criarArmazem = async (nome) => {
    console.log("ArmazemModel :: criarArmazem");
    const sql = `INSERT INTO armazem (nome) VALUES (?)`
    const params = [nome];

    try {
        const [resposta] = await conexao.query(sql, params)
        return [201, {mensagem: "armazem Cadastrado!!"}];
    } catch (error) {
        console.error({
      mensagem: "erro ao cadastrar armazem",
      code: error.code,
      sql: error.sqlMesssage,
    });
    return [
      500,
      { mensagem: "erro ao cadastrar armazem", code: error.code, sql: error.sqlMesssage },
    ];
    }
}

export const verArmazem = async () => {
    console.log("ArmazemModel :: verArmazem");
    const sql = `SELECT * FROM armazem`
    
    try {
        const [resposta] = await conexao.query(sql)
        return [200, resposta]
    } catch (error) {
        console.error({
      mensagem: "erro ao cadastrar armazem",
      code: error.code,
      sql: error.sqlMesssage,
    });
    return [
      500,
      { mensagem: "erro ao cadastrar armazem", code: error.code, sql: error.sqlMesssage },
    ];
    }
}