const express = require('express')
const router = express.Router()
const User = require('../models/user')
const usersController = require('../controllers/users')

router.use((req, res, next) => {
  if ('user' in req.session) {
    res.locals.user = req.session.user
  }
  next()
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/login/novo', usersController.novoForm)
router.post('/login/novo', usersController.novoProcess.bind(null, { User }))

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

router.post('/login', usersController.login.bind(null, { User }))

module.exports = router