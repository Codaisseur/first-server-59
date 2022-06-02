const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models").user;
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.get("/test", (req, res, next) => {
  res.send("testingggg");
});

// CRUD =>
// Signup => POST => { name, email, password }
router.post("/signup", async (req, res, next) => {
  try {
    // email, name, password
    const { email, name, password } = req.body;
    console.log({ email, name, password });

    if (!email || !password) {
      return res.status(400).send("Missing parameters");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create the user in my db.
    const user = await User.create({ name, email, password: hashedPassword });

    res.send(user);
  } catch (e) {
    next(e);
  }
});

// POST /login => { email, password }
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find a user with this email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(400).send("Incorrect credentials");

    // check if passwords match
    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return res.status(400).send("Incorrect credentials");
    }

    // if they match, we create a token and send it back
    const token = toJWT({ userId: user.id });
    console.log("token", token);

    res.send({ message: "Congrats you are logged in!", token });
  } catch (e) {
    next(e);
  }
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY1NDE3NzA4MywiZXhwIjoxNjU0MTg0MjgzfQ.e_tGutDhLmiZFjxvbNCq3k630f6I3cawUB9k3N9hu-k
module.exports = router;

// LATER:  to check if whoever is making a request has a valid
// token.
// this goes on authMiddleware
// ---------
// const decodedToken = toData(token);
// console.log("decoded token", decodedToken);
// ---------
