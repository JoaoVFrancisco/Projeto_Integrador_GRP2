import express from 'express';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({mensagem: 'API Funcionando!!'})
});

app.listen(PORT, () => {
    console.log(`API Rodando na porta ${PORT}`);
});