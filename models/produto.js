const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({
  description: String,
  category: String,
  items: Number
})

const Produto = mongoose.model('Produto', ProdutoSchema)
module.exports = Produto