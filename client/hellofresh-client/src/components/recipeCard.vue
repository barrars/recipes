<template lang='pug'>
  div.maxWidth.container
    .tile.is-ancestor
      div.tile.is-parent
        .box.tile
          .columns.is-mobile.tile.is-child
            .tile.is-child
              p {{recipe.name}}
              p.heading {{recipe.headline}}
              p difficulty: {{recipe.difficulty}} | {{recipe.prepTime}}
                i.far.fa-clock
            .tile.is-child
              img(:src=`cardPrefix + recipe.imagePath`)
          .tile.is-child.columns.is-mobile
            ul.is-child.tile.is-size-7.has-text-grey.has-background-white-ter
              li(v-for='(item, index) in recipe.utensils' :key='index')
                p.underline {{item.name}}
            p.description {{recipe.description}}

    div.is-size-7.flex.centerTxt

      .box.ingredients( v-for='(item, index) in recipe.ingredients' :key='index')
          p {{item.name}}
          img(v-if='(item.imagePath)' :src=`ingredientPrefix + item.imagePath`)
    .is-parent.tile.content.is-vertical
      .tile.is-child( v-for='(item, index) in recipe.steps' :key='index')
        p.is-size-4 {{item.index}}.
          span.is-size-6 {{item.instructions}}
          p.timer.subtitle(v-if='(item.timers[0])') {{item.timers[0].name}}, {{item.timers[0].duration}}
          img(v-if='(item.images[0])' :src=`stepPrefix + item.images[0].path`)
        hr
    //- </router-link>
</template>

<script>
import axios from 'axios'
export default {
  //   name: 'Card',
  data () {
    return {
      cardPrefix: 'https://img.hellofresh.com/f_auto,fl_lossy,h_100/hellofresh_s3/',
      ingredientPrefix: 'https://img.hellofresh.com/f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3',
      stepPrefix: 'https://img.hellofresh.com/f_auto,fl_lossy,h_400,q_auto/hellofresh_s3/',
      msg: 'scotty!',
      recipe: ''
    }
  },
  mounted () {
    this.getRecipe()
  },

  methods: {
    // recipe () {
    //   console.log('loaded')
    // },
    getRecipe () {
      axios
        .get('https://recipes.barrars.com/api/card/' + this.$route.params.id)
        .then(response => {
          const results = response.data
          console.log(results)

          this.recipe = results
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style scoped>
.maxWidth{
  max-width: 770px;
}
.bg{
  color: red;
  background-image : url("{{cardPrefix + recipe.imagePath}}")
}
li{
  list-style: decimal;
}
.timer{
  position: absolute;
}
.underline{

  text-decoration:underline ;
}
.centerTxt{
  text-align: center;

}
.tile{
  align-items: center;
}
.box:not(:last-child){

  margin: 0px 3px 3px 0px;
}
.flex{
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.red{
  color: red;
  }
  hr{
    background: black;
    margin: 0;
    padding: 0;
  }
.ingredients{
  margin: 0px 3px 3px 0px;
  padding: 0;

}
.description{
    border-left: solid 2px red;
    padding-left: 10px;
    margin-left: 10px;
}
</style>
