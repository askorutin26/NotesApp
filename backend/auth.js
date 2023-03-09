function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token === null) {
    return res.sendStatus(403);
  }
  req.token = token;
  next();
}

export default authenticateToken;
