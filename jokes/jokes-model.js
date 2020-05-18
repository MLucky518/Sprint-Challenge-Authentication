const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");

function findBy(user) {
  return db("users").where(user);
}
function findById(id) {
    return db("users").select("id", "username").where({ id }).first();
  }

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db("users").insert(user);
  return findById(id) ; // replaces making a find by id for this project
}

module.exports = {
  add,
  findBy,
};
