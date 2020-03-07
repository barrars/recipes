const ingredients = require('./ingredients')

function makeArr (str) {
  const arr = []
  str.split(' ').forEach(element => {
    arr.push(new RegExp(element, 'i'))
  })
  return arr
}

const str = 'hello butt face'
// console.log(str.match(reg))

function ingFilter (string) {
  const arr = []
  const reg = new RegExp(string, 'i')
  ingredients.forEach(ingr => {
    const a = ingr.match(reg)
    if (a) {
      console.log(a)
      arr.push(a)
    }
  })
  return arr
}

ingFilter('squ')
