const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieSession({
  name: 'session',
  keys: ['pineapple'],
  // Cookie Options
  // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  maxAge: 10 * 1000
}))

app.use('/account', AccountRouter)
app.use('/questions', APIRouter)

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.log(err)
  res.status(500)
  res.json({ message: err.message })
}

app.use(errorHandler)

// Start listening for requests
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
