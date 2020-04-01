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

/* GET books list. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    order: [['createdAt', 'DESC']]
  });
  res.render("books/index", { books, title: "Sequelize-It!" });
}));

module.exports = router;
