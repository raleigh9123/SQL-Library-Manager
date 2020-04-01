const express = require('express');

const router = express.Router();
const Book = require('../models').Article;

const asyncHandler = cb => {
  return async(req,res,next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
    }
  }
}

/* GET books list. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
