const getRandomInt = require('./getRandomInt')
const product = require('../models/product')
const color = require('../models/color')
const material = require('../models/material')
const category = require('../models/category')

const generateProducts = async () => {
  const colors = await color.get()
  const materials = await material.get()
  const categories = await category.get()
  const types = ['couch','bed','bedframe','mattress','table','chair','mirror','plant','pillow']
  const adjectives = ['wooden','large','metal','silky','small','medium','rod iron','king sized','queen sized','twin sized','cozy','modern','boho', 'traditional', 'mid-century']
  const products = []
  
  for (let i = 0; i < 100; i++) {
    let type = types[getRandomInt(types.length - 1)]
    products.push({
      number: `000THZG${getRandomInt(2000)}`,
      type: type,
      description: `${adjectives[getRandomInt(adjectives.length - 1)]} ${type}`,
      colors: [colors[getRandomInt(colors.length - 1)].id, colors[getRandomInt(colors.length - 1)].id],
      materials: [materials[getRandomInt(materials.length - 1)].id, materials[getRandomInt(materials.length - 1)].id],
      categories: [categories[getRandomInt(categories.length - 1)].id],
      price: (Math.random() * (2000 - 50) + 50).toFixed(2),
      averageRating: (Math.random() * (6 - 1) + 1).toFixed(2) 
    })
  }
  const savedProducts = await Promise.all(products.map(p => product.save(p)))
  console.log(savedProducts)
}

module.exports = generateProducts