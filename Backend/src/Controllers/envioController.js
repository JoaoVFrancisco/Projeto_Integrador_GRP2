import { criandoEnvio, vendoEnvio } from "../Models/envioModel.js";


export const createEnvio = async (req, res) => {
    console.log("EnvioController :: createEnvio");
    const {data, quantidade, id_estoque, id_armazem} = req.body

    try {
        const [status, resposta] = await criandoEnvio(data, quantidade, id_estoque, id_armazem)
        return res.status(status).json(resposta)
    } catch (error) {
        console.error(error);
    return res.status(500).json({ mensagem: "erro ao fazer envio" });
    }
};

export const readEnvio = async (req, res) => {
    console.log("EnvioController :: readEnvio");

    try {
        const [status, resposta] = await vendoEnvio();
    return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
    return res.status(500).json({ mensagem: "erro ao ver Envio" });
    }
};