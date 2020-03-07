const Ingcount = require('./models/ingCount')
require('./db/db')
const all = require('./routes/allIngredients')
function toArray (ingredients) {
  const ingArr = []
  for (const [key, value] of Object.entries(ingredients)) {
    ingArr.push({ ing: key, count: value })
  }
  return ingArr
}

// Ingcount({ ing: 'onion', count: '2' }).save()
// Ingcount.find((err, docs) => {
//   if (err) {
//     console.error(err)
//   }
//   console.log(docs)
// })
toArray(all).forEach(async element => {
  // console.log(element)

  const ing = await new Ingcount(element)
  ing.save((err, gredient) => {
    if (err) {
      console.error(err)
    }
    console.log(gredient.ing)
  })
})
// function compare (a, b) {
//   // Use toUpperCase() to ignore character casing
//   const bandA = a.count
//   const bandB = b.count

//   let comparison = 0
//   if (bandA > bandB) {
//     comparison = 1
//   } else if (bandA < bandB) {
//     comparison = -1
//   }
//   return comparison
// }

// console.log(

//   toArray(all).sort((a, b) => {
//     return a.count > b.count ? -1 : 1
//   })
// )

// console.log(toArray(all).sort(compare))

// db.recipes.aggregate([
//   // {$group : {_id: {ingredients:"$ingredients"}}},
//   // {$group:{_id:{name:"Olive Oil"}}}
//   // {$group: {_id: '$name'}}
//   { $match: { $and: [{ 'ingredients.name': 'Olive Oil' }, { difficulty: { $gt: 2 } }] } },
//   { $project: { name: '$name' } }
// ])
