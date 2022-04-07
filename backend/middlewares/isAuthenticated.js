const isAuthenticated = (req, res, next) => {
  if (!('username' in req.session) || req.session.username === "") {
    next(new Error("whoopdiedooooooo"))
  }
  next()
}

module.exports = isAuthenticated