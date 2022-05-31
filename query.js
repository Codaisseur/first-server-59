const User = require("./models").user;
const TodoList = require("./models").todoList

// findAll => get all the entries from this table
// findOne => get one entry
// findByPk => get one entry by id.

// User.create
// User.update

const logAllUsers = async () => {
  try {
    const users = await User.findAll({
      where: { password: "m" },
    });
    console.log(users);
  } catch (e) {
    console.log(e.message);
  }
};

const getListWithUser = async () => {
  const todoLists = await TodoList.findAll({ raw: true, include: User})
  console.log(todoLists)
}

getListWithUser()

const findById = async (id) => {
  try {
    const oneUser = await User.findByPk(id);
    console.log(oneUser);
  } catch (e) {
    console.log(e.message);
  }
};

const signUpUser = async (name, email, password) => {
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    console.log(newUser);
  } catch (e) {
    console.log(e.message);
  }
};

signUpUser("Wouter", "w@w.com", "w");

//logAllUsers();
// findById(2);
