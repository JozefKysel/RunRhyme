exports.verifyToken = (req, res, next) => {
  req.token = req.headers.authorization.split(' ')[1];
  next();
}
