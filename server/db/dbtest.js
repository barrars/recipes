const mongoose = require('mongoose')
var logger = require('../helpers/mylogger')

mongoose.connect('mongodb://localhost/users', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => {
    logger.log('Connected to MongoDB')
  })
  .catch(error => {
    logger.log(error.message)
  });
