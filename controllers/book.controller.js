const db = require("../models");
const Book = require("../models/book.model");


const User = db.user;

exports.getBooks = async (req, res) => {
  let books = await Book.find();
  res.json(books);
};

exports.getBook = async (req, res) => {
  let { id } = req.params;
  let book = await Book.findById(id);
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body);
  let book = await Book.create({
    title: title,
    content: content,
    author: author,
  });
  let article1 = new Book({
    title: "Le nom de la personne",
    content: "belle",
    author: "178cm",
  });
  article1.save();
  let user = new User({
    name: "Le nom de la personne",
    type: "belle",
    size: "178cm",
  });
  user.save();
  res.json(book);
};

exports.updateBook = async (req, res) => {
  let { id } = req.params;
  const { title, content, author } = req.body;
  let book = await Book.findByIdAndUpdate(id, {
    title: title,
    content: content,
    author: author,
  });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  let { id } = req.params;
  await Book.deleteOne({ _id: id });
  res.send("Success");
};
