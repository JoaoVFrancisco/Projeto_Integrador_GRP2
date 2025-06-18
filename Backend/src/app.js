import express from 'express';
import cors from 'cors';
import usuarioRouter from './Routers/usuarioRouter.js'
import produtoRouter from './Routers/produtoRouter.js'
import estoqueRouter from './Routers/estoqueRouter.js'
import armazemRouter from './Routers/armazemRouter.js'
import producaoRouter from './Routers/producaoRouter.js'
import envioRouter from './Routers/envioRouter.js'
import authRouter from './Routers/authRouter.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import falhasProducaoRouter from './Routers/falhasProducaoRouter.js';
import consumoEnergeticoRouter from './Routers/consumoEnergeticoRouter.js';
import relatoriosRouter from './Routers/relatoriosRouter.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/usuarios', usuarioRouter)
app.use('/produtos', produtoRouter)
app.use('/estoque', estoqueRouter)
app.use('/armazem', armazemRouter)

app.use('/envio', envioRouter)

// Adicione após os outros routers:
app.use('/auth', authRouter);

// Proteja rotas sensíveis (exemplo):
app.use('/producao', authMiddleware, producaoRouter);

app.use('/falhas', falhasProducaoRouter);
app.use('/consumo', consumoEnergeticoRouter);
app.use('/relatorios', relatoriosRouter);

app.get('/', (req, res) => {
    res.status(200).send({mensagem: 'API Funcionando!!'})
});

// Configuração 100% segura do caminho
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// Verificação IMEDIATA
if (!process.env.JWT_SECRET) {
  console.error('🛑 ERRO: JWT_SECRET não carregado! Verifique:');
  console.log('- Arquivo .env existe?', fs.existsSync(path.join(__dirname, '.env')));
  console.log('- Diretório atual:', __dirname);
  process.exit(1);
}



app.listen(PORT, () => {
    console.log(`API Rodando na porta ${PORT}`);
});


export default app;