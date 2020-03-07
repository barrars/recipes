var express = require('express')
const logger = require('../helpers/mylogger')
// const Recipe = require('../models/recipeModel')
// const { findFirst } = require('../helpers/search.js')
const recipeController = require('../controllers/recipeController')

// grab ingredients count (just a test, already written to mongo)
const search = async () => {
  logger.log('HIT!')
  const r = await recipeController.findIngredients()
  const allIngredients = {}
  logger.log(r.length)
  Object.entries(r).forEach(el => {
    // logger.log(Object.keys(el))
    if (el[1].ingredients.length) {
      el[1].ingredients.forEach(ingredient => {
        const ingr = ingredient.name
        if (!allIngredients[ingr.toString()]) {
          allIngredients[ingr.toString()] = 1
        } else {
          allIngredients[ingr.toString()]++
        }
        logger.log(ingredient.name)
      })
    }
  })
  logger.log(allIngredients)
}

var router = express.Router()
router.get('/', async (req, res, next) => {
  logger.log('/index HIT!')
  // const r = await recipeController.findIngredients()

  // logger.log(r.length)

  res.render('index')
})

module.exports = router
