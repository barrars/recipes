var express = require('express')
const router = express.Router()
const logger = require('../helpers/mylogger')
const db = require('../db/db')
const Recipe = require('../models/recipeModel')
// const RecipeController = require('../controllers/recipeController.js')
// '/api/recipe'
router.get('/:ingredient', async (req, res, next) => {
  console.time('search2')
  const str = req.params.ingredient
  logger.log(':ingredient route hit ' + str)
  const makeArr = (str) => {
    const arr = []
    str.split(' ').forEach(element => {
      arr.push(new RegExp(element, 'i'))
    })
    // console.log(arr)
    return arr
  }
  // const result = await RecipeController.findByIngredients(ingredient)
  const result = {}
  console.log(makeArr(str))
  console.time('search')
  result.results = await Recipe.find({ 'ingredients.name': { $all: makeArr(str) } }).select('cardLink headline category.slug ingredients.name name imagePath prepTime')
  // result.results = await Recipe.find({ $text: { $search: str } })
  console.timeEnd('search')
  // result.count = await Recipe.countDocuments({ 'ingredients.name': { $all: makeArr(str) } })
  // logger.log(JSON.stringify(result, null, 2))
  // res.json(result)
  res.send(result)
  console.timeEnd('search2')
})

module.exports = router
