const express = require('express');

const router = express.Router();
const Book = require('../models').Book;

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET /books - Shows the full books list. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [['createdAt', 'DESC']]
  });
  res.render("books/index", { books, title: "Books" });
}));

/* GET /books/new - Shows the 'create new book' form */
router.get('/new', asyncHandler(async (req, res) => {
  res.render("books/new_book", {book: {}, title: "New Book" });
}));

/* POST /books/new - Submits form and creates a new book. */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    await Book.create(req.body);
    res.redirect("/books") 
  } catch(error) {
    console.log(error);
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("books/new_book", {book, errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }
}));

/* GET /books/:id - Shows more details from the book. */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/update_book", {book, title: "Update Book" });
  } else {
    res.render("books/page_not_found", {title: "Page Not Found",});
  }
}));

/* POST /books/:id/ - Updates a book.  */
router.post('/:id', asyncHandler(async (req, res) => {
  try {
    let book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body)
      res.redirect("/books") 
    } else {
      res.render("books/page_not_found", {title: "Page Not Found"})
    }
  } catch(error) {
    console.log(error);
    if(error.name === "SequelValidationError") {
      let book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("books/update_book", {book, errors: error.errors, title: "Update Book"})
    } else {
      throw error;
    } 
  }
  
}));

/* POST /books/:id/delete - Deletes a book.  */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy()
  res.redirect("/books") 
}));


// Set up a custom error handler middleware function that logs the error to the console and renders an “Error” view with a friendly message for the user. This is useful if the server encounters an error, like trying to view the “Books Detail” page for a book :id that doesn’t exist. See the error.html file in the example-markup folder to see what this would look like.
// Set up a middleware function that returns a 404 NOT FOUND HTTP status code and renders a "Page Not Found" view when the user navigates to a non-existent route, such as /error. See the page_found.html file in the example markup folder for an example of what this would look like.

module.exports = router;
