const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const plantaRouter = require('./routes/plantaRoutes');
const terrenoRouter = require('./routes/terrenoRoutes');
const pragaRouter = require('./routes/pragaRoutes');
app.use('/plantas', plantaRouter);
app.use('/terrenos', terrenoRouter);
app.use('/pragas', pragaRouter);

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