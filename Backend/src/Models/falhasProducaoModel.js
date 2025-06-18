import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const registrarFalha = async (data, pecas_defeituosas, producao_total, taxa_retrabalho, id_producao, id_usuario) => {
    const sql = `
        INSERT INTO falhas_producao 
        (data, pecas_defeituosas, producao_total, taxa_retrabalho, producao_id_producao, usuario_id_usuario) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [data, pecas_defeituosas, producao_total, taxa_retrabalho, id_producao, id_usuario];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, { mensagem: "Falha registrada com sucesso!" }];
    } catch (error) {
        console.error("Erro no model falhasProducao:", error);
        return [500, { mensagem: "Erro ao registrar falha" }];
    }
};

export const listarFalhas = async () => {
    const sql = `
        SELECT f.*, p.nome as produto_nome 
        FROM falhas_producao f
        JOIN producao pr ON f.producao_id_producao = pr.id_producao
        JOIN produto p ON pr.produto_id_produto = p.id_produto
    `;
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta];
    } catch (error) {
        console.error("Erro no model consumoProducao:", error);
        return [500, { mensagem: "Erro ao listar falhas" }];
    }
};