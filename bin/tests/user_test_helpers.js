const User = require('../models/user')

const usersInDb = async () => {
  return await User.get()
}

module.exports = {
  usersInDb
}