const str = 'potato onion garlic chicken'
// console.log(str.split(' '))
const arr = []
str.split(' ').forEach(element => {
  arr.push(new RegExp(element, 'i'))
})

// str.split(' ').forEach(element => {
//   // arr.push(`/${element}/i`)
// })
console.log(arr)
