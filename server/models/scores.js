const mongoose = require('mongoose')
const Schema = mongoose.Schema

// scores schema
const scoreSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  scores: [
    {
      level: { type: String, enum: ['CET4', 'CET6'], required: true },
      score: { type: Number, required: true },
      examDate: { type: Date, required: true },
      details: {
        listening: { type: Number, required: true },
        reading: { type: Number, required: true },
        writing: { type: Number, required: true },
      },
    },
  ],
})

module.exports = mongoose.model('scores', scoreSchema)
