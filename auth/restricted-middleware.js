const jwt = require("jsonwebtoken");

module.exports = restricted;

function restricted(req, res, next) {
  const { authorization } = req.headers;
  const secret = "secret key to edit token";

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no credentials provided" });
  }
}
