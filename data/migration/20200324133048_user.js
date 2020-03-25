exports.up = function(knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.increments();
    tbl
      .string("username", 25)
      .unique()
      .notNullable();
    tbl.string("password", 25).notNullable();
    tbl.string("department", 50);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user");
};
