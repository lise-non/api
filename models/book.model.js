const mongoose = require("mongoose");

/**
 * @swagger
 *   models:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         summery:
 *           type: string
 *          cover:
 *           type: string
 */
const schema = new mongoose.Schema({
  title: "string",
  author: "string",
  summery: "string",
  cover: 'string'
});
const Book = mongoose.model("Book", schema);

module.exports = Book;
