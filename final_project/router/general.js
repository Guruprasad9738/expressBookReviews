const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


//Function to check if the user exists
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }
  

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.query.username;
    const password = req.query.password;

    if (username && password){
        if(!doesExist(username)){
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
          return res.status(404).json({message: "User already exists!"});    
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    bookslist = res.send(books);
    console.log("books list with id 1 " + bookslist)
    //return res.status(300).json({message: "Yet to be implemented"});
});

//Async and Await method
//ASYNC AWAIT
const getBooks = async () => {
    const response = await public_users.get('/');
  
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to get book list');
    }
};
  
public_users.get('/', async (req, res) => {
    const books = await getBooks();

    res.status(200).json({ books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

    const ISBNLIst = [];
    const isbn = req.params.isbn;
    for (i = 0; i < isbn.length; i++) {
        const booksListWithISBN = res.send(books[isbn]);
        //const author = res.send(books[2].author);
        res.send(booksListWithISBN);
        console.log("books list with id 1 " + booksListWithISBN + " and author is" + author);
    }
});

const findByISBN = async (isbn) => {
    const response = await public_users.get(`/isbn/${isbn}`);
  
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Book not found');
    }
};
  
public_users.get('/isbn/:isbn', async (req, res) => {
try {
    const book = await findByISBN(req.params.isbn);

    res.json(book);
} catch (error) {
    res.status(404).send(error.message);
}
});

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    //Write your code here
    const author = req.params.author;
    const booksListWithISBN = res.send(books[3]);
    const title = res.send(books[3].title);
    res.send(booksListWithISBN.author);
    //res.json(booksListWithISBN.title);
    console.log("books list with id 2 " + res.send(booksListWithISBN.author));

});

//ASYNC AWAIT BASED ON AUTHOR
const findByAuthor = async (author) => {
    for (const key in books) {
      if (books[key].author === author) {
        return books[key];
      }
    }
  
    throw new Error('Book not found');
};
  
public_users.get('/author/:author', async (req, res) => {
try {
    const book = await findByAuthor(req.params.author);

    res.json(book);
} catch (error) {
    res.status(404).send(error.message);
}
});

//ASYNC AWAIT BASED ON TITLE
const findByTitle = async (title) => {
    for (const key in books) {
      if (books[key].title === title) {
        return books[key];
      }
    }
  
    throw new Error('Book not found');
};
  
public_users.get('/title/:title', async (req, res) => {
try {
    const book = await findByTitle(req.params.title);

    res.json(book);
} catch (error) {
    res.status(404).send(error.message);
}
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const booksListWithISBN = res.send(books[3]);
    const title = res.send(books[3].title);
    res.send(booksListWithISBN.title);
    res.json(booksListWithISBN.title);
    console.log("books list with id 2 " + res.send(booksListWithISBN.title));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const booksListWithISBN = res.send(books[1]);
    review = res.send(books[1].reviews);
    res.send(review);
    //return res.status(300).json({message: "Yet to be implemented"});
});

public_users.delete("/reviewDel/:isbn", (req, res) => {

    const booksListWithISBN = res.send(books[1]);
    review = res.send(books[1].reviews);
    res.send(review);

})

module.exports.general = public_users;
