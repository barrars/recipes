const request = require('request')
const recipeController = require('./controllers/recipeController')
const recipeModel = require('./models/recipeModel')
function callback (error, response, body) {
  if (!error && response.statusCode === 200) {
    var info = JSON.parse(body)
    info.items.forEach(recipe => {
      if (recipeModel.find({ id: recipe.id })) {
        console.log(true)
        console.log(recipe.name)
      } else {
        recipeController.addRecipe(recipe)
        console.log('edded', recipe.name)
      }
    })
    console.log('done')
  }
}

function getem (callback) {
  let i = 0
  setInterval(() => {
    console.log(i)
    var options = {
      // url: 'https://gw.hellofresh.com/api/recipes/search?offset2270&limit=30&order=-date&locale=en-US&country=us',
      url: `https://gw.hellofresh.com/api/recipes/search?offset=${i}&order=-date&locale=en-US&country=us&count=100&take=100`,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODI4ODI3OTIsImp0aSI6ImVjMTBjMmEzLThlYzctNDVlMy05NWUxLTEzMWNkMTQ2NzYxMCIsImlhdCI6MTU4MDI1MzA0OSwiaXNzIjoic2VuZiJ9.Wh0bMT5jUN1ZlRGR-GJ4CRSr3mTMOIzQv5UlDGK4Bms'
      }
    }
    i += 100
    console.log(i)

    request(options, callback)
  }, 10000)
}
getem(callback)
