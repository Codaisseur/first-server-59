const { toData } = require("./jwt");
const User = require("../models").user;

async function authMiddleware(req, res, next) {
  console.log("headers", req.headers);

  const auth = req.headers.authorization;

  // does the header exist? => respond unauthorized
  if (!auth) return res.status(400).send("You didn't send a auth header");

  const authHeader = auth.split(" "); // ["Bearer", "aoihdlaksndkljasndkjasndkjasnd"]

  // does it have a token?
  if (authHeader[0] === "Bearer" && authHeader[1]) {
    // is the token valid?
    try {
      console.log("our split header", authHeader);
      // validate/decode the token
      const data = toData(authHeader[1]);
      console.log("what is data", data); // { userId: 4 }

      const user = await User.findByPk(data.userId);

      req.user = user;

      next();
    } catch (e) {
      return res.status(401).send("Token invalid or expired");
    }
  }
}

module.exports = authMiddleware;
