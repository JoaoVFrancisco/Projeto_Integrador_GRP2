import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criandousuario = async (nome, login, senha) => {
    console.log("usuarioModel :: criandousuario")
    const sql = `INSERT INTO usuario (nome, login, senha) VALUES (?, ?, ?`;

    const params = [nome, login, senha];

    try {
        const [resposta] = await console.query(sql, params);
        return[201, {mensagem: 'usuario criado com sucesso!!'}]
    } catch (error) {
        console.error({mensagem: "Error ao criar Usuario", code:error.code, sql:error.sqlMessage});
    }
};

export const exibirusuario = async () => {
    console.log("usuarioModel :: exibindousuario");
    const sql = `SELECT * FROM usuario`;

}

