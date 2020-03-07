require('../db/dbtest')

const User = require('../models/usertest')
var logger = require('../helpers/mylogger')

User.UserModel().find({ username: 'user101' })
// .setOptions({ explain: 'executionStats' })
//   .exec((e, explainObj) => {
//     console.debug(JSON.stringify(explainObj, null, 2))
// })

User.sayHi()
