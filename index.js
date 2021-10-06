const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const User = require('./models/user')
const Noticia = require('./models/produto')

const produtos = require('./routes/produtos')
const auth = require('./routes/auth')
const pages = require('./routes/pages')

const session = require('express-session')
const bodyParser = require('body-parser')

const mongo = process.env.MONGODB || 'mongodb+srv://DBA:VC7A6.WJxKr4eb%25@cluster0.zyauy.mongodb.net/TesteSaudeId?retryWrites=true&w=majority'

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.use(session({ secret: 'saude-id-produtos', resave: true, saveUninitialized: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', auth)
app.use('/', pages)
app.use('/produtos', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }
  res.redirect('/login')
})
app.use('/produtos', produtos)


mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log('listening...'))
  })
  .catch(e => console.log(e))