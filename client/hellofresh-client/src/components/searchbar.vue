
<template lang='pug' >
include ../views/hello.pug
</template>

<script>
import ingredients from '../assets/ingredients'
import axios from 'axios'
export default {
  data () {
    return {
      // count: '',
      // displayedRecipes: [],
      ingarr: [],
      imgPrefix:
        'https://img.hellofresh.com/f_auto,fl_lossy,h_100/hellofresh_s3/',
      ingDropDown: [],
      ingredient: '',
      ingQuery: [],
      recipes: this.$store.state.recipes ? this.$store.state.recipes : [],
      searching: false,
      timeArr: [],
      initialQuery: this.$store.state.initialQuery ? this.$store.state.initialQuery : ''
    }
  },

  computed: {

    filter () {
      const filteredRecipes = []
      const timeArr = this.timeArr
      const q = this.ingQuery
      if (this.recipes) {
        this.recipes.forEach((recipe) => {
          const ingArr = recipe.ingredients.map(a => a.name)

          if (!timeArr.length && q.every((i) => ingArr.includes(i))) {
            filteredRecipes.push(recipe)
          } else if (
            timeArr.length &&
            q.every((i) => ingArr.includes(i)) &&
            this.timeArr.includes(recipe.prepTime.slice(2, -1))
          ) {
            filteredRecipes.push(recipe)
          }
        })
      }

      return filteredRecipes
    },
    ingredients () {
      let obj = {}
      this.filter.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          const ingr = ingredient.name
          // let i = ingredient.name.toLowerCase();
          if (
            ingr === 'Salt' ||
            ingr === 'Pepper' ||
            this.ingredient.includes(ingr)
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
      this.filter.forEach((result) => {
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
      this.initialQuery = text
      console.log(this.initialQuery)
      this.ingredient = ''
      text = ''
      this.ingFilter(text)
    },
    timeClick (e) {
      // console.log(e);
      const index = this.timeArr.findIndex((i) => i === e)
      if (!this.timeArr.includes(e)) {
        this.timeArr.push(e)
      } else {
        this.timeArr.splice(index, 1)
      }
      // console.log(this.timeArr);
    },
    deleteIng (e) {
      const index = this.ingQuery.findIndex((i) => i === e)
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
        this.ingDropDown = []
      }
      if (ingredient.length > 2) {
        this.ingDropDown = []
        this.initialQuery = ingredient
        this.ingDropDown.push(ingredient)

        const reg = new RegExp(ingredient, 'i')
        ingredients.forEach((ingr) => {
          const a = ingr.match(reg)
          if (a) {
            this.ingDropDown.push(a.input)
          }
        })
      }
    },
    search () {
      if (this.ingredient.length > 2) {
        this.searching = true
        this.returnedCookTimeObj = {}
        this.recipes = []
        this.$store.state.initialQuery = this.ingredient
        axios
          .get('https://recipes.barrars.com/api/recipe/' + this.ingredient)
          .then((response) => {
            const results = response.data
            // console.log(results)
            this.$store.state.recipes = results
            // this.recipes = this.$store.state.recipes.results
            this.recipes = results
            this.searching = false
            console.log(this.recipes)
          })
          .catch((error) => console.error(error))
        this.ingredient = ''
      }
    }
  }
}
</script>
