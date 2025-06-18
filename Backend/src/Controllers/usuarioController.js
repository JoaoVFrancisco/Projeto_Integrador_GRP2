import { apagarUsuario,  criandoUsuario, visualizarUsuario } from "../Models/usuarioModel.js";

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

export const updateUser = async (req, res) => {
    console.log("Usuariocontroller :: updateUser");
    const {nome, login, senha} = req.body
    const {id_usuario} = req.params;

    try {
        const [status, resposta] = await atualizarUsuario(nome, login, senha, id_usuario);
        return res.status(status).json(resposta);
    } catch (error) {
        return res.status(500).json({mensagem:"Erro ao atualizar Usuario"});
    }
};

export const deleteUser = async (req, res) => {
    console.log("UsuarioController :: deleteUser");
    const {id_usuario} = req.params;

    try {
        const [status, resposta] = await apagarUsuario(id_usuario);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error)
        return res.status(500).json({mensagem: "erro ao deletar usuario!!"})
    }
};