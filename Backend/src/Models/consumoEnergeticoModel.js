import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const registrarConsumo = async (data, consumo_real, consumo_meta, periodo_tipo, periodo_nome, id_usuario) => {
    const sql = `
        INSERT INTO consumo_energetico 
        (data, consumo_real, consumo_meta, periodo_tipo, periodo_nome, usuario_id_usuario) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [data, consumo_real, consumo_meta, periodo_tipo, periodo_nome, id_usuario];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, { mensagem: "Consumo registrado!" }];
    } catch (error) {
        console.error("Erro no model consumoProducao:", error);
        return [500, { mensagem: "Erro ao registrar consumo" }];
    }
};

export const calcularEficiencia = async () => {
    const sql = `
        SELECT 
            AVG((consumo_real / consumo_meta) * 100) as eficiencia 
        FROM consumo_energetico
    `;
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta[0]];
    } catch (error) {
        console.error("Erro no model consumoProducao:", error);
        return [500, { mensagem: "Erro ao calcular eficiência" }];
    }
};