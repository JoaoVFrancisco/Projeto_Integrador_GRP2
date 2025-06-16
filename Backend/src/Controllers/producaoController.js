import { criandoProducao, vendoProducao } from "../Models/producaoModel.js";


export const createProducao = async (req, res) => {
    console.log("ProducaoController :: createProducao");
    const {data, quantidade_total, quantidade_usavel, consumo_energetico, id_usuario, id_produto, id_estoque} = req.body

    try {
        const [status, resposta] = await criandoProducao(data, quantidade_total, quantidade_usavel, consumo_energetico, id_usuario, id_produto, id_estoque)
        return res.status(status).json(resposta)
    } catch (error) {
        console.error(error);
    return res.status(500).json({ mensagem: "erro ao criar usuario" });
    }
};

export const readProducao = async (req, res) => {
    console.log("ProducaoController :: readProducao");

    try {
        const [status, resposta] = await vendoProducao()
        return res.status(status).json(resposta)
    } catch (error) {
        console.error(error);
    return res.status(500).json({ mensagem: "erro ao mostrar producao" });
    }
};