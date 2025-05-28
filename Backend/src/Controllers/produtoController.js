import { criandoproduto } from "../Models/produtoModel";


export const createProduto = async (req, res) => {
    console.log("produtoController :: criandoProduto");
    const {nome} = req.body;

    try {
        const [status, resposta] = await criandoproduto(nome);
        return res.status(status).send(resposta)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao criar produto"});
    }
}