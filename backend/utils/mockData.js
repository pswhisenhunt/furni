const generateColors = require('./generateColors')
const generateMaterials = require('./generateMaterials')
const generateProducts = require('./generateProducts')

const color = require('../models/color')
const material = require('../models/material')
const product = require('../models/product')

const generateMocks = () => {
  color.deleteAll().then(() => {
    generateColors()
  })

  material.deleteAll().then(() => {
    generateMaterials()
  })

  product.deleteAll().then(() => {
    generateProducts()
  })
}

module.exports = generateMocks