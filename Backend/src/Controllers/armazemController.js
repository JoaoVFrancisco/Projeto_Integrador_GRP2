import { criarArmazem, verArmazem } from "../Models/armazemModel.js"


export const createArmazem = async (req, res) => {
    console.log("ArmazemController :: createArmazem")
    const {nome} = req.body

    try {
        const [status, resposta] = await criarArmazem(nome)
        return res.status(status).json(resposta);
    } catch (error) {
        return res.status(500).json({Mensagem: "erro ao cadastrar armazem"})
    }
}

export const readArmazem = async (req, res) => {
    console.log("ArmazemController :: readArmazem");

    try {
        const [status, resposta] = await verArmazem()
        return res.status(status).json(resposta)
    } catch (error) {
        return res.status(500).json({Mensagem: "erro ao mostrar armazem"})
    }
}