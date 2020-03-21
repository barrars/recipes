
<template lang='pug' >
include ../views/hello.pug
</template>

<script>
import ingredients from '../assets/ingredients'
import axios from 'axios'
export default {
  data () {
    return {
      searching: false,
      timeArr: [],
      displayedRecipes: [],
      ingQuery: [],
      recipes: this.$store.state.recipes ? this.$store.state.recipes : [],
      ingarr: [],
      ingredient: '',
      ingListFilter: [],
      count: '',
      imgPrefix:
                'https://img.hellofresh.com/f_auto,fl_lossy,h_100/hellofresh_s3/'
    }
  },
  // name: 'search',
  watch: {
    ingredient: function () {
      if (this.ingredient > 3) {
        this.ingFilter(this.ingredient)
      }
    }
  },
  computed: {
    ingredientLengthCheck () {
      return function () {
        if (this.ingredient > 3) {
          this.ingFilter(this.ingredient)
        }
      }
    },
    filter () {
      console.log(this.recipes)
      console.log(this.$store.state)

      const filteredRecipes = []
      const timeArr = this.timeArr
      // console.log(timeArr);

      const q = this.ingQuery
      if (this.recipes) {
        console.log(this.recipes)

        this.recipes.forEach(recipe => {
          const ingArr = []
          recipe.ingredients.forEach(ing => {
            ingArr.push(ing.name)
          })
          if (!timeArr.length && q.every(i => ingArr.includes(i))) {
          // console.log({q});
          // console.log(this.timeArr);

            filteredRecipes.push(recipe)
          } else if (
            timeArr.length &&
                    q.every(i => ingArr.includes(i)) &&
                    this.timeArr.includes(recipe.prepTime.slice(2, -1))
          ) {
            filteredRecipes.push(recipe)
          }
        })
      }
      // console.log(filteredRecipes)
      // console.log(this.timeArr);

      return filteredRecipes
    },
    ingredients () {
      let obj = {}
      this.filter.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          const ingr = ingredient.name
          // let i = ingredient.name.toLowerCase();
          if (
            ingr === 'Salt' ||
                        ingr === 'Pepper' ||
                        this.ingQuery.includes(ingr)
          ) {
            return
          }
          if (!obj[ingr]) {
            obj[ingr] = 1
          } else {
            obj[ingr]++
          }
        })
      })
      return (obj = this.sortObjByCount(obj))
    },
    cookTime () {
      const obj = {}
      this.filter.forEach(result => {
        const prepTime = this.pt(result.prepTime)
        if (!obj[prepTime]) {
          obj[prepTime] = 1
        } else {
          obj[prepTime]++
        }
      })

      return obj
    }
  },
  methods: {
    dropClick (e) {
      console.log(e.target.innerText)
      let text = e.target.innerText
      this.ingredient = text
      this.search()
      this.ingredient = ''
      text = ''
      this.ingFilter(text)
    },
    timeClick (e) {
      // console.log(e);
      const index = this.timeArr.findIndex(i => i === e)
      if (!this.timeArr.includes(e)) {
        this.timeArr.push(e)
      } else {
        this.timeArr.splice(index, 1)
      }
      // console.log(this.timeArr);
    },
    deleteIng (e) {
      const index = this.ingQuery.findIndex(i => i === e)
      this.ingQuery.splice(index, 1)
    },
    ingClick (e) {
      this.ingQuery.push(e)
    },
    pt (str) {
      if (str) {
        return str.slice(2, -1)
      } else {
        return 'na'
      }
    },
    sortObjByCount (ingredients) {
      return this.toArray(ingredients).sort((a, b) => {
        return a.count > b.count ? -1 : 1
      })
    },
    toArray (ingredients) {
      const arr = []
      for (const [key, value] of Object.entries(ingredients)) {
        arr.push({ ing: key, count: value })
      }
      return arr
    },
    ingFilter (ingredient) {
      if (ingredient.length < 2) {
        this.ingListFilter = []
      }
      if (ingredient.length > 2) {
        this.ingListFilter = []
        this.ingListFilter.push(ingredient)

        const reg = new RegExp(ingredient, 'i')
        ingredients.forEach(ingr => {
          const a = ingr.match(reg)
          if (a) {
            this.ingListFilter.push(a.input)
          }
        })
      }
    },
    async search () {
      console.log(this.recipes)

      this.searching = true
      this.returnedCookTimeObj = {}
      this.recipes = []
      // "https://recipes.barrars.com/api/recipe/"
      // "https://localhost:3004/api/recipe/"
      axios
        .get('https://recipes.barrars.com/api/recipe/' + this.ingredient)
        .then(response => {
          const results = response.data
          console.log(results)
          this.$store.state.recipes = results
          this.recipes = this.$store.state.recipes.results
          this.recipes = results
          this.searching = false
          console.log(this.recipes)
        })
        .catch(error => console.error(error))
      this.ingredient = ''
    }
  }
}
</script>
