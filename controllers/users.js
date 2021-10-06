const login = async ({ User }, req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
        const isValid = await user.checkPassword(req.body.password)

        if (isValid) {
            req.session.user = user
            res.redirect('/produtos')
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}

const novoProcess = async ({ User }, req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.redirect('/login')
    } catch (e) {
        res.render('login/novo', {
            errors: Object.keys(e.errors)
        })
    }
}

const novoForm = (req, res) => {
    res.render('login/novo', { errors: [] })
}



module.exports = {
    login, novoProcess, novoForm
}