const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const plantaRouter = require('./routes/plantaRoutes');
const terrenoRouter = require('./routes/terrenoRoutes');
const pragaRouter = require('./routes/pragaRoutes');
const contatoRouter = require('./routes/contatoRoutes');
app.use('/plantas', plantaRouter);
app.use('/terrenos', terrenoRouter);
app.use('/pragas', pragaRouter);
app.use('/contato', contatoRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB Atlas!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});