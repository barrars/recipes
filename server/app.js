const express = require('express')
var path = require('path')
const app = express()
const cors = require('cors')
const recipeRouter = require('./routes/recipeRouter')
require('./db/db')
var logger = require('./helpers/mylogger')
const port = 3003
// var indexRouter = require('./routes/index')
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

// const find = require('./controllers/recipeController').find
// console.log(find())
// logger.log(require('./helpers/search').findByIng())

// app.use('/', indexRouter)
app.use('/api/recipe', recipeRouter)

app.listen(port, () => logger.log(`listening on port ${port}!`))
