const User = require('../models/user')

const initialUsers  = [
  {
    firstName: 'betty',
    lastName: 'boop',
    email: 'test@test.com', 
    streetNumber: '123',
    streetName: 'hello world dr.',
    city: 'austin',
    state: 'tx',
    zipcode: '78702'
  },
  {
    firstName: 'roger',
    lastName: 'rabbit',
    email: 'test@mail.com', 
    streetNumber: '456',
    streetName: 'hello world dr.',
    city: 'austin',
    state: 'tx',
    zipcode: '78702'
  },
]

const usersInDb = async () => {
  return await User.get()
}

module.exports = {
  usersInDb,
  initialUsers
}