"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.postBook = exports.getABook = void 0;
const utils_1 = require("../utils/utils");
const getABook = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const authorData = data.find((item) => `${item.id}` === req.params.authorId);
    if (!authorData) {
        return res.status(404).json({ message: `author with the id ${req.params.authorId} not found!` });
    }
    const bookData = authorData.books.find((item) => `${item.id}` === req.params.bookId);
    if (!bookData) {
        return res.status(404).json({ message: `book with the id ${req.params.bookId} not found` });
    }
    res.status(200).json({ mesaage: "success", data: bookData });
};
exports.getABook = getABook;
const postBook = (req, res) => {
    const data = (0, utils_1.readFile)();
    let authorFind = data.find(((item) => `${item.id}` === req.params.authorId));
    const authorIndex = data.findIndex((item) => `${item.id}` === req.params.authorId);
    if (!authorFind) {
        return res.status(404).json({ message: "author does not exist" });
    }
    const { name, isPublished, datePublished, serialNumber } = req.body;
    let bookId;
    if (authorFind.books.length === 0) {
        bookId = 'book1';
    }
    else {
        bookId = `book${authorFind.books.length + 1}`;
    }
    const newBook = {
        id: bookId,
        name,
        isPublished,
        datePublished: datePublished || null,
        serialNumber: serialNumber || null
    };
    authorFind = {
        ...authorFind,
        books: [...authorFind.books, newBook]
    };
    data[authorIndex] = authorFind;
    (0, utils_1.writeFile)(data);
    res.status(201).json({ message: "new book added", author: authorFind });
};
exports.postBook = postBook;
const updateBook = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const authorFind = data.find((item) => `${item.id}` === req.params.authorId);
    if (!authorFind) {
        return res.status(404).json({ message: `author with the id ${req.params.authorId} does not exist` });
    }
    const bookToUpdate = authorFind.books.find((item) => `${item.id}` === req.params.bookId);
    if (!bookToUpdate) {
        return res.status(404).json({ message: `book with the id ${req.params.bookId} does not exist` });
    }
    const newData = { ...bookToUpdate, ...req.body };
    const dataIndex = authorFind.books.findIndex((item) => `${item.id}` === req.params.bookId);
    authorFind.books.splice(dataIndex, 1, newData);
    (0, utils_1.writeFile)(authorFind);
    res.status(201).json({ message: "book updated...", data: newData });
};
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const authorFind = data.find((item) => `${item.id}` === req.params.authorId);
    if (!authorFind) {
        return res.status(404).json({ message: `author with the id ${req.params.authorId} does not exist` });
    }
    const bookToDelete = authorFind.books.find((item) => `${item.id}` === req.params.bookId);
    if (!bookToDelete) {
        return res.status(404).json({ message: `book with the id ${req.params.bookId} does not exist` });
    }
    const dataIndex = authorFind.books.findIndex((item) => `${item.id}` === req.params.id);
    authorFind.books.splice(authorFind.books, 1);
    (0, utils_1.writeFile)(data);
    res.status(200).json({ message: `Book with the id ${req.params.bookId} has been trashed...` });
};
exports.deleteBook = deleteBook;
exports.default = {
    getABook: exports.getABook,
    postBook: exports.postBook,
    updateBook: exports.updateBook,
    deleteBook: exports.deleteBook
};
