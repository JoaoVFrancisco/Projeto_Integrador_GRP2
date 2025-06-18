import { registrarConsumo, calcularEficiencia } from '../Models/consumoEnergeticoModel.js';

export const createConsumo = async (req, res) => {
    const { data, consumo_real, consumo_meta, periodo_tipo, periodo_nome } = req.body;
    const id_usuario = req.user?.id || 1;

    try {
        const [status, resposta] = await registrarConsumo(
            data, consumo_real, consumo_meta, periodo_tipo, periodo_nome, id_usuario
        );
        res.status(status).json(resposta);
    } catch (error) {
        console.error("Erro no model consumoProducao:", error);
        res.status(500).json({ mensagem: "Erro no controller de consumo" });
    }
};

export const getEficiencia = async (req, res) => {
    try {
        const [status, resposta] = await calcularEficiencia();
        res.status(status).json(resposta);
    } catch (error) {
        console.error("Erro no consumoProducao:", error);
        res.status(500).json({ mensagem: "Erro ao calcular eficiência" });
    }
};