const knex = require("knex");

const plugToDB = require("../knexfile.js");

const db = knex(plugToDB.development);

module.exports = db;
