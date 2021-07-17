
// EXPRESS: Infraestructura web rápida, minimalista y flexible para Node.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

const meals = require('./routes/meals')
const orders = require('./routes/orders')
const auth = require('./routes/auth')

const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//defino las urls a usar
app.use('/myAPI/meals', meals)
app.use('/myAPI/orders', orders)
app.use('/myAPI/auth', auth)



module.exports = app
