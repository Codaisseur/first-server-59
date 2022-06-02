const express = require("express");
const { toData } = require("./auth/jwt");
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const authMiddleware = require("./auth/middleware");

const PORT = 4000;

const app = express();

// middlewares -> tools
app.use(express.json()); //body parser middleware

// routers
app.use("/users", userRouter);
app.use("/auth", authRouter);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY1NDE3NzA4MywiZXhwIjoxNjU0MTg0MjgzfQ.e_tGutDhLmiZFjxvbNCq3k630f6I3cawUB9k3N9hu-k

app.get("/secret", authMiddleware, async (req, res, next) => {
  res.send("if you see this is because you have a valid token!");
});

// start the app.
app.listen(PORT, () => console.log("Hello from port 4000"));

//brew install httpie

//sudo apt install httpie

// Middlewares
//1. A function called before you reach the request
//a. To the entire index.js with app.use
//b. to pass it to the endpoint
//c. pass it to a router family

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

// const myMiddleware = ( request, response, next ) => {
//   console.log("In middleware")
//   next()
// }

// const randomAuthorizedMiddleware = (request, response, next) => {
//   const randomNumber = Math.random() * 10
//   console.log(randomNumber)

//   if (randomNumber < 5) {
//     return response.status(401).send("You can't be here")
//   } else {
//     console.log("welcome")
//     next()
//   }

// }
