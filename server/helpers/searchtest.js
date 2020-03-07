const Recipe = require('../models/recipeModel')
const logger = require('./mylogger')

function makeArr (str) {
  const arr = []
  str.split(' ').forEach(element => {
    arr.push(new RegExp(element, 'i'))
  })
  return arr
}
module.exports = {
  findFirst: async () => {
    const r = await Recipe.findOne()
    // .then(r => logger.log(r))
    logger.log(r)
  },
  findByIng: async (ing) => {
    // const str = 'potato'
    const str = 'potato onion garlic chicken'

    const r = await Recipe.count({ 'ingredients.name': { $all: makeArr(str) } })
    // const r = await Recipe.count({ 'ingredients.name': { $regex: regexFromMyArray } })
    logger.log(r)
  }

}
