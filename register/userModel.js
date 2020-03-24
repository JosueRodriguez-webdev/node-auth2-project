const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  add
};

function find() {
  return db("user");
}

function findBy(filter) {
  return db("user")
    .where(filter)
    .first();
}

function add(obj) {
  return db("user").insert(obj);
}
