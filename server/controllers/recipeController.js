const Recipe = require('../models/recipeModel')
const db = require('../db/db')

var logger = require('../helpers/mylogger')

module.exports = {
  find: () => Recipe.aggregate([{ $match: { 'ingredients.name': 'Avocado' } }], (err, docs) => {
    if (err) {
      console.error(err)
    }
    console.log(docs)
    logger.log('done')
  }),

  findIngredients: () => Recipe.find({}, { 'ingredients.name': 1 }),

  addRecipe: async recipe => {
    const savedRecipe = await new Recipe(recipe).save()
    logger.log(savedRecipe.name)
  },

  findByIngredient: async (ingredient) => {
    try {
      logger.log(ingredient)
      const results = Recipe.count()

      results.then(result => logger.log(result))
      // return results
    } catch (err) {
      logger.log('err')
      logger.log(err)
      return { err }
    }
    // results.forEach(result => {
    //   logger.log(result.name);
    //   return;
    // });
  },
  findByIngredients: async ingredients => {
    logger.log(ingredients)

    const results = await Recipe.find({ 'ingredients.name': { $all: [ingredients] } })
    logger.log(results)
    results.forEach(result => {
      logger.log(result.name)
    })
  },
  onion: async () => {
    const results = await Recipe.count({ 'ingredients.name': /onion/i })
    logger.log(results, 'done') /* sometimes results need to be strinify */
  }

}

async function totalIngredients () {
  // const results = await Recipe.find({ 'ingredients.name': { $all: [/broccoli/i, /Sausage/i] } })
  // const results = await Recipe.find()

  /* ********************** */
  /* const results = await Recipe.find({'ingredients':{$size:16}}) */
  /* ********************** */
  /* ********************** */
  // const results = await Recipe.find({ 'ingredients.name': { $all: [/lime/i, /scallions/i, /cilantro/i, /Sour Cream/i, /shrimp/i] } })
  /* ********************** */

  // const results = await Recipe.find({ 'ingredients.name': { $all: [/broccoli/i] } })

  // find all recipes with "Yellow Onion"
  // await Recipe.aggregate([{$unwind:"$ingredients"}, {$group:{_id:"$ingredients.name"}}])
  // List all different ingredients
  const results = await Recipe.count({ 'ingredients.name': /onion/i })

  logger.log(results, 'done') /* sometimes results need to be strinify */
}
// totalIngredients()

// Recipe.find({ 'ingredients.name': new RegExp(ingredient, 'i') })
