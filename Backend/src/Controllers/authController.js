import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { visualizarUsuario } from '../Models/usuarioModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Busca usuário no banco
    const [status, usuarios] = await visualizarUsuario();
    const usuario = usuarios.find(u => u.login === login);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    // Verifica senha (com bcrypt)
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta" });
    }

    // Gera token JWT (válido por 1h)
    const token = jwt.sign(
      { id: usuario.id_usuario, login: usuario.login },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro durante o login" });
  }
};