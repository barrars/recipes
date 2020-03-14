const mongoose = require('mongoose')
var logger = require('../helpers/mylogger')

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

mongoose
  .connect('mongodb://blurr123:blurr123@ds125073.mlab.com:25073/jumpstart', {
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
