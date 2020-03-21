const mongoose = require('mongoose')
var Schema = mongoose.Schema

const Recipe = new Schema(
  {
    name: { type: String, default: '' },
    id: { type: String, default: '' },
    category: {
      type: { type: String, default: '' },
      name: { type: String, default: '' },
      slug: { type: String, default: '' },
      iconLink: { type: String, default: '' },
      iconPath: { type: String, default: '' }
    },
    slug: { type: String, default: '' },
    headline: { type: String, default: '' },
    description: { type: String, default: '' },
    difficulty: { type: String, default: '' },
    prepTime: { type: String, default: '' },
    totalTime: { type: String, default: '' },
    imagePath: { type: String, default: '' },
    cardLink: { type: String, default: '' },
    ingredients: [
      {
        name: { type: String, default: '' },
        slug: { type: String, default: '' },
        imagePath: { type: String, default: '' }
      }
    ],
    utensils: [
      {
        id: { type: String, default: '' },
        type: { type: String, default: '' },
        name: { type: String, default: '' }
      }
    ],
    steps: [
      {
        index: { type: String, default: '' },
        instructions: { type: String, default: '' },
        timers: [
          {
            name: { type: String, default: '' },
            duration: { type: String, default: '' },
            temperature: { type: String, default: '' },
            temperatureUnit: { type: String, default: '' },
            ovenMode: { type: String, default: '' }
          }
        ],
        images: [
          {
            link: { type: String, default: '' },
            path: { type: String, default: '' },
            caption: { type: String, default: '' }
          }
        ]
      }
    ],
    averageRating: { type: String, default: '' },
    ratingsCount: { type: String, default: '' },
    favoritesCount: { type: String, default: '' },
    isPremium: { type: String, default: '' },
    websiteUrl: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)
Recipe.index({ ingredients: 1 })
Recipe.index({ ingredients: 'text' })

module.exports = mongoose.model('Recipe', Recipe)
