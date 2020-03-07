
<template lang='pug' >
//- .container
include ../views/hello.pug
</template>

<script>
// import hello from "./hello";
import ingredients from "../assets/ingredients";
import axios from "axios";
export default {
    data() {
        return {
            recipes: "",
            ingarr: [],
            ingredient: "",
            ingListFilter: [],
            ingDrop: [],
            count: 0,
            returnedIng: {}
        };
    },
    components: {},
    name: "search",
    methods: {
        pt(str) {
            if (str) {
                return str.slice(2, -1);
            } else {
                return "na";
            }
        },
        sortObjByCount(ingredients) {
            return this.toArray(ingredients).sort((a, b) => {
                return a.count > b.count ? -1 : 1;
            });
        },
        toArray(ingredients) {
            const ingArr = [];
            for (const [key, value] of Object.entries(ingredients)) {
                ingArr.push({ ing: key, count: value });
            }
            return ingArr;
        },
        ingFilter(ingredient) {
            if (ingredient.length < 2) {
                this.ingListFilter = [];
            }
            if (ingredient.length > 2) {
                this.ingListFilter = [];
                const reg = new RegExp(ingredient, "i");
                ingredients.forEach(ingr => {
                    const a = ingr.match(reg);
                    if (a) {
                        this.ingListFilter.push(a.input);
                    }
                });
            }
        },
        async search() {
            this.returnedIng = {};
            this.recipes = "";
            this.count = 0;
            let search = this.ingredient;
            axios
                .get("http://localhost:3000/api/recipe/" + search)
                .then(response => {
                    let results = response.data.results;
                    results.forEach(result => {
                        result.ingredients.forEach(ingredient => {
                            let i = ingredient.name.toLowerCase();
                            if (
                                i === search.toLowerCase() ||
                                i === "Salt".toLowerCase() ||
                                i === "Pepper".toLowerCase()
                            ) {
                                return;
                            }
                            const ingr = ingredient.name;
                            if (!this.returnedIng[ingr.toString()]) {
                                this.returnedIng[ingr.toString()] = 1;
                            } else {
                                this.returnedIng[ingr.toString()]++;
                            }
                        });
                    });
                    this.recipes = results;
                    this.count = results.length;
                    this.returnedIng = this.sortObjByCount(this.returnedIng);
                    // console.log(this.returnedIng);
                })
                .catch(error => console.error(error));
            this.ingredient = "";
        }
    }
};
</script>
