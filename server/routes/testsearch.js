var express = require('express')
const router = express.Router()
const logger = require('../helpers/mylogger')
const db = require('../db/db')
const Recipe = require('../models/recipeModel')
const RecipeController = require('../controllers/recipeController.js')

async function searchDB (str) {
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
  // const result = {}
  // console.log(makeArr(str))

  const results = await Recipe.find({ 'ingredients.name': { $all: makeArr(str) } }).select('ingredients.name name imagePath prepTime')
  // return results
  console.log(JSON.stringify(results, null, 2))

// return results = await Recipe.find({ $text: { $search: str } })
  // result.count = await Recipe.countDocuments({ 'ingredients.name': { $all: makeArr(str) } })
  // logger.log(JSON.stringify(result, null, 2))
}
console.time('search')
searchDB('pho')
console.timeEnd('search')
