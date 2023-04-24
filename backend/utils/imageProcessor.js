const uuid = require('uuid')
//const fs = require('fs')

const renameImage = (imageName) => {
  const extension = findExtension(imageName)
  const newImageName = `${uuid.v4()}.${extension}`
  return newImageName
}

const findExtension = (imageFile) => {
  const startingIndex = imageFile.lastIndexOf('.') + 1
  return imageFile.slice(startingIndex, imageFile.length)
}

// const writeImageToFile = (image) => {
//   const projectPath = '~/Development/furni'
//   const localPath = `${projectPath}/public/images`
// }

module.exports = {
  //writeImageToFile,
  renameImage
}