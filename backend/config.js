/* creates a PORT, a port is an endpoint on the host machine where the express
server listens for incoming HTTP request. an endpoint is essentially a URL path
on your server associated with a function. When a request is made to it, the 
associated function is executed to handle the request and responds */

/* essentially, I think express makes a server on local, u give it a name
when you assign port */

export const PORT = 5555;

// connects our server to the mongoDB online database we created.
export const mongoDBURL = 
"mongodb+srv://root:root@bookstore-mern.8bi8gng.mongodb.net/books-collection?retryWrites=true&w=majority&appName=BookStore-MERN"