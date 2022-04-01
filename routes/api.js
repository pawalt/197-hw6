const express = require('express')

const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.json(questions)
  } catch (e) {
    next(e)
    res.send('questions getting had a problem!')
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { questionText } = req.body
  const answer = ""
  const author = req.session.username

  try {
    const q = await Question.create({ questionText, answer, author })
    res.json(q)
  } catch (e) {
    next(e)
    res.send('question creation had a problem')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body

  try {
    await Question.updateOne({ _id }, { answer })
    res.send('question answering was successful')
  } catch (e) {
    console.log(e)
    res.send('question answering had a problem')
  }
})

module.exports = router