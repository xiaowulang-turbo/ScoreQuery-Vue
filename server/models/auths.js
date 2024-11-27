const mongoose = require('mongoose')
const Schema = mongoose.Schema

// auths schema
const authSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('auths', authSchema)
