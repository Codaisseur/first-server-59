const express = require("express");

//routers
const userRouter = require("./routers/users")
// const listrouter = require("./routers/list")

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

// app.use(randomAuthorizedMiddleware)

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

app.use("/users", myMiddleware, userRouter)
// app.use("/lists", listRouter)


app.listen(PORT, () => console.log("Hello from port 4000"));
