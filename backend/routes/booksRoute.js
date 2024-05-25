import express from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();

// to add a nwe resource we use the post method, here we're adding a new route
// to act as a function to save a new book
// sort of like a setter
// posts cannot be tested in browser, need to use https://www.postman.com/lunar-comet-790916/workspace/react-js/request/create?requestId=92815953-9923-4ca2-9e63-534595fa308b
// in postman copy paste the local http with the post, then body -> raw (C)

// if using middleman thing (apps.use(/books) in the index file) no need redef

router.post("/", async (request, response) => { // second param = callback fx
    // a callback fx takes in a request and response 
    try {
        // validation to see if input has title, author and publish year
        if (!(request.body.title && request.body.author
            && request.body.publishYear)) {
            // throw an error
            return response.status(400).send({
                message: "Send all required fields: title, suthor, publishYear"
            });
        }
        // actually create the new book to be sent over to the model
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook); // await is just join

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}
);

// if the post method set/wrote the database input into file, this reads V it

router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        }
        ); // send output (object) as json file
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}
);

// get a single book from DB by ID (R)
// colon by id route to signal we need to take in a parameter

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params; // why does this need curly braces?
        const book = await Book.findById(id);
        return response.status(200).json(book); // send output as json file
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}
);

// now to update (U)
// need to have the param to find the book, need to request body to update
// use .put() to update
router.put("/:id", async (request, response) => {
    try {
        if (!(request.body.title && request.body.author
            && request.body.publishYear)) {
            // throw an error
            return response.status(400).send({
                message: "Send all required fields: title, suthor, publishYear"
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200)
            .send({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}
);

// now for deletion D, fulfilling CRUD
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200)
            .send({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}
);

export default router;