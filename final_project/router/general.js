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

module.exports.general = public_users;
