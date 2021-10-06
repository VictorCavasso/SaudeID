const index = async ({ Produto }, req, res) => {
    const docs = await Produto.find({})
    res.render('produtos/index', { produtos: docs })
}

const info = async ({ Produto }, req, res) => {
    const produto = await Produto.findOne({ _id: req.params.id })
    res.render('produtos/info', { produto })
}

const novoProcess = async ({ Produto }, req, res) => {
    const produto = new Produto(req.body)
    try {
        await produto.save()
        res.redirect('/produtos')
    } catch (e) {
        res.render('produtos/novo', {
            errors: Object.keys(e.errors)
        })
    }
}

const novoForm = (req, res) => {
    res.render('produtos/novo', { errors: [] })
}

const editarProcess = async ({ Produto }, req, res) => {
    const produto = await Produto.findOne({ _id: req.params.id })
    produto.description = req.body.description
    produto.category = req.body.category
    produto.items = req.body.items
    try {
        await produto.save()
        res.redirect('/produtos')
    } catch (e) {
        res.render('produtos/editar', {
            errors: Object.keys(e.errors)
        })
    }
}

const editarForm = async ({ Produto }, req, res) => {
    const produto = await Produto.findOne({ _id: req.params.id })
    res.render('produtos/editar', { produto, errors: [] })
}

const excluir = async ({ Produto }, req, res) => {
    await Produto.deleteOne({ _id: req.params.id })
    res.redirect('/produtos')
}

module.exports = {
    index, info, novoProcess, novoForm, editarProcess, editarForm, excluir
}