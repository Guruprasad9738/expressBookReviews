const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


//Function to check if the user exists
const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {

    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

function getBooks() {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}

function getBooksList() {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //getBooks().then((bks) => res.send(JSON.stringify(bks)));
    getBooksList().then((BOOKS) => res.send(JSON.stringify(BOOKS)));

});

function getBooksByISBN(isbn) {
    return new Promise((resolve, reject) => {
        let isbnNum = parseInt(isbn);
        if (books[isbnNum]) {
            resolve(books[isbnNum]);
        } else {
            reject({ status: 404, message: `ISBN ${isbn} not found` });
        }
    })
}
// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    getBooksByISBN(req.params.isbn)
        .then(
            result => res.send(result),
            error => res.status(error.status).json({ message: error.message })
        );
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    getBooks()
        .then((bookEntries) => Object.values(bookEntries))
        .then((books) => books.filter((book) => book.author === author))
        .then((filteredBooks) => res.send(filteredBooks));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    getBooks()
        .then((bookEntries) => Object.values(bookEntries))
        .then((books) => books.filter((book) => book.title === title))
        .then((filteredBooks) => res.send(filteredBooks));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    getBooksByISBN(req.params.isbn)
        .then(
            result => res.send(result.reviews),
            error => res.status(error.status).json({ message: error.message })
        );
});

module.exports.general = public_users;
