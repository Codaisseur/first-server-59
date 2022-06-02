const { Router } = require("express");

//models
const User = require("../models").user;
const TodoList = require("../models").todoList;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    console.log(e.message);
  }
});

//get user with its lists -> http :4000/users/1
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const oneUser = await User.findByPk(userId, { include: TodoList });

    if (!oneUser) {
      return res.status(404).send("User not found");
    }

    res.send(oneUser);
  } catch (e) {
    console.log(e.message);
  }
});

//updates an existing user -> http PUT :4000/users/4 name=Boo
router.put("/:id", async (req, res) => {
  try {
    //step 1. getting info from body
    const { name, phone } = req.body;
    const { id } = req.params;

    //step 2. find the user to update
    const user = await User.findByPk(id);

    //step 3. update the user
    const updatedUser = await user.update({ name, phone });

    //step 4. send the updated user as a response
    res.send(updatedUser);
  } catch (e) {
    console.log(e.message);
  }
});

//delete a user -> http DELETE :4000/users/4
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    //step 1. find the user to delete
    const userToDelete = await User.findByPk(id);

    //step 2. delete the user
    await userToDelete.destroy();

    //step 3. send a string with "deleted"
    res.send("User terminated");
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
