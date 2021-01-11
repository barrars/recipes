var express = require('express')
const router = express.Router()
const logger = require('../helpers/mylogger')
const db = require('../db/db')
const Recipe = require('../models/recipeModel')

router.get('/:id', async (req, res, next) => {
	const str = req.params.id
	logger.log(str);

  logger.log(':id route hit ' + str)
  logger.log(req.ip)
  logger.log(req.connection.remoteAddress)



  const results = await Recipe.findById(str)

  res.json(results)
})

module.exports = router
