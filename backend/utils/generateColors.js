const color = require('../models/color')

const generateColors = async () => {
  const colors = [
    {
      name: 'white',
      value: '#ffffff'
    },
    {
      name: 'black',
      value: '#000000'
    },
    {
      name: 'red',
      value: '#eb4034'
    },
    {
      name: 'pink',
      value: '#fa6e9a'
    },
    {
      name: 'purple',
      value: '#9a31a3'
    },
    {
      name: 'green',
      value: '#32a852',
    },
    {
      name: 'blue',
      value: '#67b0cf',
    },
    {
      name: 'yellow',
      value: '#f5e947'
    },
    {
      name: 'grey',
      value: '#949492'
    },
    {
      name: 'tan',
      value: '#d4cdb2'
    },
    {
      name: 'orange',
      value: '#f2a933'
    }]
  const savedColors = await Promise.all(colors.map(c => color.save(c)))
  console.log(savedColors)
}

module.exports = generateColors