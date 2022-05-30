const express = require("express");
const User = require("./models").user;
const PORT = 4000;

const app = express();

// responds with all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    console.log(e.message);
  }
});

// responds with specific user
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const oneUser = await User.findByPk(userId);

    res.send(oneUser);
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(PORT, () => console.log("Hello from port 4000"));
