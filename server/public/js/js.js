const ingredientsSearch = document.querySelector('#ingredientsSearch')

ingredientsSearch.addEventListener('input', searchIngredients)
let html
const recipeList = []
const ingrdientsList = []
async function searchIngredients (e) {
  if (ingredientsSearch.value.length > 3) {
    const ingredients = e.target.value

    await fetch(`/api/recipe/${ingredients}`)
      .then(response => response.json())
      .then(myjson => {
        html = myjson
        console.log(html)
      })
      .catch(error => console.error(error))

    // if (ingredients.length === 1) {
    //   const html = await fetch(`/api/recipe/${ingredients}`)
    //   const reclist = await html.json()
    //   console.log(reclist)
    // } else {
    //   /* filter through recipeList */
    //   console.log('Search in the list')
    //   console.log(recipeList)
    //   const filteredList = []
    //   recipeList.forEach(recipe => {
    //     // recipeUsesIngredient(recipe, secondIngredient)
    //     recipe.ingredients.forEach(ingredient => {
    //       if (ingredient.name.toLowerCase().includes(input)) {
    //         // console.log(recipe);
    //         const index = filteredList.indexOf(recipe)
    //         // console.log(index)
    //         if (index < 0) {
    //           console.log(recipe)
    //           filteredList.push(recipe)
    //         }
    //       }
    //     })
    //   })
    //   console.log(filteredList)
    //   recipeList = filteredList
    // }
  }
}

// function recursiveCheck (arrayOfRecipes, arrayOfIngredients) {
//   /* we dont kow how long the inhredients recipe is  */
//   if (arrayOfIngredients.length > 1) {
//     const oneIngredient = [0]

//     recipeUsesIngredient()
//   }
// }

// function recipeUsesIngredient (recipe, ingredient) {
//   if (true) {
//     const res = recipe.ingredients.map(i => ingredient.toLowerCase() === i.name.toLowerCase())
//     console.log(res)
//   }
// }
