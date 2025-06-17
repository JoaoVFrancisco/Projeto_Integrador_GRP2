import db from '../db.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const conexao = mysql.createPool(db);

// Modifique a função criandoUsuario:
export const criandoUsuario = async (nome, login, senha) => {
  console.log("UsuarioModel :: criandoUsuario");
  
  const senhaHash = await bcrypt.hash(senha, parseInt(process.env.BCRYPT_SALT_ROUNDS));
  const sql = `INSERT INTO usuario (nome, login, senha) VALUES (?,?,?)`;
  const params = [nome, login, senhaHash]; // Agora usa o hash!

  try {
    const [resposta] = await conexao.query(sql, params);
    return [201, { mensagem: 'Usuário cadastrado com sucesso!' }];
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return [500, { mensagem: "Erro ao cadastrar usuário" }];
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

export const atualizarSenha = async (id_usuario, novaSenhaHash) => {
    const sql = `UPDATE usuario SET senha = ? WHERE id_usuario = ?`;
    try {
        const [result] = await conexao.query(sql, [novaSenhaHash, id_usuario]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        throw error;
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

export const buscarUsuarioPorLogin = async (login) => {
    const sql = `SELECT * FROM usuario WHERE login = ?`;
    try {
        const [rows] = await conexao.query(sql, [login]);
        return rows[0] || null; // Retorna o usuário ou null
    } catch (error) {
        throw error;
    }
};

