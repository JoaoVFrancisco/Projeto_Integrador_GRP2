import { registrarFalha, listarFalhas } from '../Models/falhasProducaoModel.js';

export const createFalha = async (req, res) => {
    const { data, pecas_defeituosas, producao_total, taxa_retrabalho, id_producao } = req.body;
    const id_usuario = req.user?.id || 1; // Assume usuário 1 se não houver autenticação

    try {
        const [status, resposta] = await registrarFalha(
            data, pecas_defeituosas, producao_total, taxa_retrabalho, id_producao, id_usuario
        );
        res.status(status).json(resposta);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no controller de falhas" });
    }
};

export const readFalhas = async (req, res) => {
    try {
        const [status, resposta] = await listarFalhas();
        res.status(status).json(resposta);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar falhas" });
    }
};