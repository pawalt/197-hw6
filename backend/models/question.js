const mongoose = require('mongoose')

const { Schema, model } = mongoose

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  answer: { type: String },
  author: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
})

const Question = model('Question', questionSchema)

module.exports = Question