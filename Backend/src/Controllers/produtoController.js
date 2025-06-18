import { criarPorduto, verProduto } from "../Models/produtoModel.js";



export const createProduto = async (req, res) => {
    console.log("ProdutoController :: createProduto");
    const {nome} = req.body

    try {
        const [status, resposta] = await criarPorduto(nome);
        return res.status(status).json(resposta)
    } catch (error) {
        return res.status(500).json({mensagem: "erro ao criar usuario!!"});
    }
}

export const readProduto = async (req, res) => {
    console.log("UsuarioController :: readProduto");
    
    try {
        const [status, resposta] = await verProduto()
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({mensagem: "erro ao mostrar produtos"})
    }
}