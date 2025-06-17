import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { buscarUsuarioPorLogin, atualizarSenha } from '../Models/usuarioModel.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração absoluta do .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Verificação CRÍTICA da chave JWT
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('❌ ERRO FATAL: JWT_SECRET não definido no arquivo .env');
  console.log('Solução:');
  console.log('1. Crie um arquivo .env na raiz do projeto');
  console.log('2. Adicione: JWT_SECRET=sua_chave_secreta_32_caracteres');
  console.log('3. Reinicie o servidor');
  process.exit(1);
}

export const login = async (req, res) => {
  const { login, senha } = req.body;

  // Validação dos campos
  if (!login || !senha) {
    return res.status(400).json({
      success: false,
      message: 'Credenciais incompletas',
      required: ['login', 'senha']
    });
  }

  try {
    // Busca usuário no banco
    const usuario = await buscarUsuarioPorLogin(login);
    
    if (!usuario) {
      console.warn(`⚠️ Tentativa de login inválida: ${login}`);
      return res.status(404).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Verificação de senha (compatível com senhas hasheadas e plain text)
    let senhaValida = false;
    if (usuario.senha.startsWith('$2b$')) {
      senhaValida = await bcrypt.compare(senha, usuario.senha);
    } else {
      // Modo de compatibilidade (senha em texto puro)
      senhaValida = senha === usuario.senha;
      
      // Se a senha estiver correta mas não hasheada, atualiza para bcrypt
      if (senhaValida) {
        const novaSenhaHash = await bcrypt.hash(senha, 10);
        await atualizarSenha(usuario.id_usuario, novaSenhaHash);
        console.log(`🔄 Senha migrada para hash: ${usuario.login}`);
      }
    }

    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Geração do token JWT
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        login: usuario.login,
        role: usuario.role || 'user'
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Remove a senha do objeto de resposta
    const { senha: _, ...usuarioSemSenha } = usuario;

    console.log(`✅ Login bem-sucedido: ${usuario.login}`);
    return res.status(200).json({
      success: true,
      message: 'Autenticação bem-sucedida',
      usuario: usuarioSemSenha,
      token,
      expiresIn: 3600 // 1 hora em segundos
    });

  } catch (error) {
    console.error('🔥 Erro no processo de login:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno no servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token não fornecido'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido ou expirado',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};