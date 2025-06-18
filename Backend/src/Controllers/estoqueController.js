import { criarEstoque, verEstoque } from "../Models/estoqueModel.js";


export const createEstoque = async (req, res) => {
    console.log("EstoqueController :: CreateEstoque")
    const {nome, quantidade} = req.body

    try {
        const [status, resposta] = await criarEstoque(nome, quantidade);
        return res.status(status).json(resposta)
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: "Erro ao cadastrar estoque"});
    }
};

export const readEstoque = async (req, res) => {
    console.log("EstoqueController :: readEstoque");
    try {
        const [status, resposta] = await verEstoque()
        return res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        return res.status(500).json({mensagem: "Erro ao cadastrar estoque"});
    }
}