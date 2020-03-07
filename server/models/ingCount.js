const mongoose = require('mongoose')
var Schema = mongoose.Schema

const IngCount = new Schema(
  {
    ing: { type: String },
    count: { type: Number }
  })

module.exports = mongoose.model('IngCount', IngCount)
