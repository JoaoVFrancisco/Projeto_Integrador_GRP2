import { listarFalhas } from '../Models/falhasProducaoModel.js';
import { calcularEficiencia } from '../Models/consumoEnergeticoModel.js';
import { vendoProducao } from '../Models/producaoModel.js';

export const getRelatorioConsolidado = async (req, res) => {
    try {
        const [statusFalhas, falhas] = await listarFalhas();
        const [statusEficiencia, eficiencia] = await calcularEficiencia();
        const [statusProducao, producao] = await vendoProducao();

        res.status(200).json({
            falhas,
            eficiencia,
            producao
        });
    } catch (error) {
        console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
        res.status(500).json({ mensagem: "Erro ao gerar relatório" });
    }
};