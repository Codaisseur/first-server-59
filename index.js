const express = require("express");
const User = require("./models").user;
const TodoList = require("./models").todoList

const PORT = 4000;

const app = express();

//brew install httpie

//sudo apt install httpie

// Middlewares
//1. A function called before you reach the request
//a. To the entire index.js with app.use
//b. to pass it to the endpoint
//c. pass it to a router family

app.use(express.json()) //body parser middleware

const myMiddleware = ( request, response, next ) => {
  console.log("In middleware")
  next()
}

const randomAuthorizedMiddleware = (request, response, next) => {
  const randomNumber = Math.random() * 10
  console.log(randomNumber)

  if (randomNumber < 5) {
    return response.status(401).send("You can't be here")
  } else {
    console.log("welcome")
    next()
  }

}

app.use(randomAuthorizedMiddleware)

//REST API
// 1. Clean URLs
//  /users/1

// 2. Operations as HTTP methods -> CRUD

// CREATE = post
// READ = get

// 3. Appropriate use of HTTP status codes

//    200 - 299: Successful responses
//    300 - 399: Redirection messages
//    400 - 499: Client error responses
//    500 - 599: Server error responses


//responds with all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    console.log(e.message);
  }
});

//get user with its lists -> http :4000/users/1
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const oneUser = await User.findByPk(userId, { include: TodoList });

    if (!oneUser){
      return res.status(404).send("User not found")
    }

    res.send(oneUser);
  } catch (e) {
    console.log(e.message);
  }
});

//creates a new user -> http :4000/users name=Test phone=1234 email=test@test.com password=test
app.post("/users", async (req, res) => {
  try {

    //getting the user info from the body
    const { name, phone, email, password } = req.body

    //creating a new user
    const newUser = await User.create({ name, phone, email, password })

    //sending the created user as a response
    res.send(newUser)

  } catch (e) {
    console.log(e.message);
  }
});

//updates an existing user -> http PUT :4000/users/4 name=Boo
app.put("/users/:id", async (req, res) => {
  try {

    //step 1. getting info from body
    const { name, phone } = req.body
    const { id } = req.params

    //step 2. find the user to update
    const user = await User.findByPk(id)

    //step 3. update the user
    const updatedUser = await user.update({ name, phone })

    //step 4. send the updated user as a response
    res.send(updatedUser) 

  } catch (e) {
    console.log(e.message);
  }
});

//delete a user -> http DELETE :4000/users/4
app.delete("/users/:id", async (req, res) => {
  try {

    const { id } = req.params

    //step 1. find the user to delete
    const userToDelete = await User.findByPk(id)

    //step 2. delete the user
    await userToDelete.destroy()

    //step 3. send a string with "deleted"
    res.send("User terminated")

  } catch (e) {
    console.log(e.message);
  }
});


app.listen(PORT, () => console.log("Hello from port 4000"));
