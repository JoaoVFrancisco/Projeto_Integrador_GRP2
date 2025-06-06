import db from '../db.js';
import mysql from 'mysql2/promise';

const conexao = mysql.createPool(db);

export const criandoUsuario = async (nome, login, senha) => {
    console.log("UsuarioModel :: criandoUsuario");
    const sql = `INSERT INTO usuario (nome, login, senha) VALUES (?,?,?)`;
    const params = [nome, login, senha];

    try {
        const [resposta] = await conexao.query(sql, params);
        return [201, {mensagem: 'Usuario cadastrado com sucesso!!'}];
    } catch (error) {
        console.error({mensagem: "Erro ao cadastrar usuario", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem: "Erro ao cadastrar usuario", code:error.code, sql:error.sqlMessage}];
    }
};


export const visualizarUsuario = async () => {
    console.log("UsuarioModel :: visualizarUsuario");
    const sql = `SELECT * FROM usuario`
    
    try {
        const [resposta] = await conexao.query(sql)
        return [201, resposta]
    } catch (error) {
        console.error({mensagem: "erro ao mostrar os Usuarios", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem: "erro ao mostrar os Usuarios", code:error.code, sql:error.sqlMessage}]
    }
};

export const atualizarUsuario = async (nome, login, senha, id_usuario) => {
    console.log("UsuarioModel :: atualizarUsuario");

    const sql = `UPDATE usuario SET nome=?, login=?, senha=? WHERE id_usuario=?`;

    const params = [nome, login, senha, id_usuario]
    
    try {
        const [resposta] = await conexao.query(sql, params);

        if(resposta.affectedRows<1){
            return [404, {mensagem:"Usuario não encontrado!!"}]
        }

        return [201, {mensagem:"Usuario atualizado com sucesso!!"}];
    } catch (error) {
        console.error({mensagem:"erro ao atualizar Usuario", code:error.code, sql:error.sqlMessage});
        return [500, {mensagem: "erro ao atualizar Usuario", code:error.code, sql:error.sqlMessage}];
    }
};

export const apagarUsuario = async (id_usuario) => {
    console.log("UsuarioModel :: deletarUsuario");
    const sql = `DELETE FROM usuario WHERE id_usuario=?`
    const params = [id_usuario]

    try {
        const [resposta] = await conexao.query(sql, params);

        if(resposta.affectedRows<1){
            return [404, {mensagem:"Usuario não encontrado!!"}]
        }

        return [200, {mensagem: "Usuario deletado!!!"}]
    } catch (error) {
        console.error({mensagem: "Usuario não encontrado", code:error.code, sql:error.sqlMessage})
        return [500, {mensagem:  "Usuario não encontrado", code:error.code, sql:error.sqlMessage}]
    }
}