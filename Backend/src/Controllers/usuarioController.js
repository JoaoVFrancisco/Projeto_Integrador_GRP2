import { criandoUsuario, visualizarUsuario } from "../Models/usuarioModel.js";

export const createUser = async (req, res) => {
    console.log("UsuarioController :: createUser");
    const {nome, login, senha} = req.body;

    try {
        const [status, resposta] = await criandoUsuario(nome, login, senha);
        return res.status(status).send(resposta);
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao criar Usuario"});
    }
};

export const readUser = async (req, res) => {
    console.log("UsuarioController :: readUser");

    try {
        const [status, resposta] = await visualizarUsuario()
        return res.status(status).send(resposta)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao mostrar os Usuarios"});
    }
};