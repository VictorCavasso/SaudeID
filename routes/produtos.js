const express = require('express')
const produtosController = require('../controllers/produtos')

const router = express.Router()
const Produto = require('../models/produto')

router.get('/', produtosController.index.bind(null, { Produto }))

router.get('/info/:id', produtosController.info.bind(null, { Produto }))

router.get('/novo', produtosController.novoForm)
router.post('/novo', produtosController.novoProcess.bind(null, { Produto }))

router.get('/editar/:id', produtosController.editarForm.bind(null, { Produto }))
router.post('/editar/:id', produtosController.editarProcess.bind(null, { Produto }))

router.get('/excluir/:id', produtosController.excluir.bind(null, { Produto }))

module.exports = router