const express = require("express");
const Users = require("./userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const restricted = require("../auth/restricted-middleware.js");

const router = express.Router();

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(req.body)
    .then(() => {
      res.status(201).json({ message: "successfully created an account." });
    })
    .catch(() => {
      res.status(500).json({ message: "Error when adding user." });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ username: user.username, token: token });
      } else {
        res.status(401).json({ message: "User is not authorized." });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Invalid Credentials" });
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      res.status(400).json({ message: "You shall not pass" });
    });
});

function generateToken(user) {
  const payload = {
    subject: "user",
    id: user.id,
    username: user.username
  };

  const secrets = "secret key to edit token";

  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secrets, options);
}

module.exports = router;
