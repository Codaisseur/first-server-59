const jwt = require("jsonwebtoken");

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

// to create tokens
function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

// to verify and get data back from tokens
function toData(token) {
  return jwt.verify(token, secret);
}

module.exports = { toJWT, toData };
