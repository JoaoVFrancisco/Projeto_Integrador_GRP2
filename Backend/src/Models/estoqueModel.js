import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);


export const criarEstoque = async (nome, quantidade) => {
    console.log("EstoqueModel :: CriarEstoque");

    const sql = `INSERT INTO estoque (nome, quantidade)VALUE (?,?)`;
    const params = [nome, quantidade]; 

    try {
        const [resposta] = await conexao.query(sql, params)
        return [201, {mensagem: "Estoque cadastrado!!"}];
    } catch (error) {
        console.error({mensagem:"Erro ao cadastrar", code:error.code, sql:error.sqlmenssage});
        return [500, {mensagem: "Erro ao cadastrar", code:error.code, sql:error.sqlmenssage}];
    }
}

export const verEstoque = async () => {
    console.log("EstoqueModel :: VerEstoque");

    const sql = `SELECT * FROM estoque`;
    
    try {
        const [resposta] = await conexao.query(sql)
        return [200, resposta]
    } catch (error) {
        console.error({mensagem:"Erro ao cadastrar", code:error.code, sql:error.sqlmenssage});
        return [500, {mensagem: "Erro ao cadastrar", code:error.code, sql:error.sqlmenssage}];
    }
}

export const atualizarEstoque = async () => {

};