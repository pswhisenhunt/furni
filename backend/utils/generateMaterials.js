const material = require('../models/material')

const generateMaterials = async () => {
  const materials = [
    {name: 'cotton'},
    {name: 'metal'},
    {name:'lumber'},
    {name:'concrete'},
    {name:'particleboard'},
    {name:'plywood'},
    {name:'veneer'},
    {name:'plastic'}
  ]
  const savedMaterials = await Promise.all(materials.map(m => material.save(m)))
  console.log(savedMaterials)
}

module.exports = generateMaterials