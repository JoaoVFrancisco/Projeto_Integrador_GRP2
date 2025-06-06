import express from 'express';
import cors from 'cors';
import usuarioRouter from './Routers/usuarioRouter.js'
import produtoRouter from './Routers/produtoRouter.js'


const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.use('/usuarios', usuarioRouter)
app.use('/produtos', produtoRouter)






app.get('/', (req, res) => {
    res.status(200).send({mensagem: 'API Funcionando!!'})
});

app.listen(PORT, () => {
    console.log(`API Rodando na porta ${PORT}`);
});


export default app;