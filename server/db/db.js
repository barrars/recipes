const mongoose = require('mongoose')
var logger = require('../helpers/mylogger')
require('dotenv').config()

// local development
// mongoose.connect('mongodb://localhost/helloFresh', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// })
// for the pi
// mongoose.connect('mongodb://localhost/fresh', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// })
// live
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

  .then(() => {
    logger.log('Connected to MongoDB')
  })
  .catch(error => {
    logger.log(error.message)
  })
