const request = require('request')
const recipeController = require('./controllers/recipeController')
const db = require('./db/db')
const logger = require('./helpers/mylogger')

const recipeModel = require('./models/recipeModel')

// recipeController.find()
function callback (error, response, body) {
  if (!error && response.statusCode === 200) {
    var info = JSON.parse(body)
    info.items.forEach(recipe => {
      recipeModel.find({id:recipe.id})
      .then(doc=>{
        if (doc.length) {
            logger.log(true)
            logger.log(recipe.name)
            logger.log(recipe.id)
        }else {
          recipeController.addRecipe(recipe)
          logger.log('edded', recipe.name)
        }
      })
    })
    logger.log('done')
  }
}

function getem (callback) {
  let i = 0
  setInterval(() => {
    logger.log(i)
    var options = {
      // url: 'https://gw.hellofresh.com/api/recipes/search?offset2270&limit=30&order=-date&locale=en-US&country=us',
      url: `https://gw.hellofresh.com/api/recipes/search?offset=${i}&order=-date&locale=en-US&country=us&count=20&take=20`,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTIzODYxOTgsImlhdCI6MTYwOTc1NjQ1NSwiaXNzIjoic2VuZiIsImp0aSI6ImI0M2QyMzMwLWFjMzctNDhhMC05OTdlLWJiZGUxODg1YWU4MSJ9.FXZB84HdxWQY7YkWiXCclkX6offkWo-Gn0kLmYsK2ms'
      }
    }
    i += 20
    logger.log(i)

    request(options, callback)
  }, 5000)
}
getem(callback)
