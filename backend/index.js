import express, { response } from "express"; // create a web application
import { PORT, mongoDBURL } from "./config.js"; // breackets are needed for npm
import mongoose from "mongoose"; // import from mongoose library installed
import { Book } from "./models/bookModel.js"; // import book model from models
import booksRoute from "./routes/booksRoute.js"; //OOP bs but using modules
import cors from "cors";

const app = express(); // init express app

// middleware for parsing (interpreting) request body (input from user)
app.use(express.json());

// middleware for handling CORS
// option 1: allow all origins with Default of.cors(*)
app.use(cors());
// Option 2: allow custom origins (can control)
// app.use(cors(
//         {
//             origin: "http://localhost:5555",
//             methods: ["GET", "POST", "PUT", "DELETE"],
//             allowedHeaders: ["Content-Type"]
//         }
//     )
// );

// each URL has to have a HTTP Routei
// HTTP method that gets a resource from a server
// first parameter is string for our route name, default is /
// second param is a callback function that receives a request and response
app.get('/', (request, response) => {
    console.log(request); // get info from server
    return response.status(234).send("Welcome to a tutorial for MERN Stack");
    // ^ set info for server ^ (basically request getter response setter)   
}
);

/* for better efficiency. use express router to store different CRUDs for
models: see booksRoute.js*/

// says to the app for each request that uses /books, use booksRoute imported
app.use("/books", booksRoute);

// to use mongoDB library u need to install mongoose with NPM install mongoose
mongoose // mongoose is an object data monitoring library for mongoDB
    .connect(mongoDBURL) // react pipeline
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            // establishes a connection with the port, second arg runs same time
            console.log("Listening");
        }
        );
    }
    )
    .catch((err) => {
        console.log(err);
    }
    );