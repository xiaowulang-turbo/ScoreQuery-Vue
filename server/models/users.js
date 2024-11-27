const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['男', '女'], required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  birthDate: { type: Date, required: true },
})

module.exports = mongoose.model('users', userSchema)
