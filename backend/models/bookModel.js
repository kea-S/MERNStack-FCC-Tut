import mongoose from "mongoose";

// a schema is a building block for a model;
// this is the constructor I guess
const bookSchema = mongoose.Schema(
    { // first layer is the number of objects i.e. the building blocks
        title: { // u can go inside to further add details
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        },
    },

    {
        timestamps: true
    }
);

// a model is a sort of like template that that the items u store in ur database
// follow
export const Book = mongoose.model("Classics", bookSchema);