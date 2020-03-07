const mongoose = require('mongoose')
var Schema = mongoose.Schema

const User = new Schema(
  {
    i: { type: Number },
    username: { type: String },
    age: { type: Number },
    created: { type: Date }
  })
console.log(
  User.method()

)
User.index({ username: 1, age: -1 })
User.on('index', function (err, doc) {
  console.log(err)
})

module.exports = {
  UserModel: () => mongoose.model('user', User),
  sayHi: () => console.log('hello')

}
