"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.updateAuthor = exports.postAuthor = exports.getAuthorById = exports.getAllAuthors = void 0;
const utils_1 = require("../utils/utils");
const utils_2 = require("../utils/utils");
const getAllAuthors = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    console.log("anita");
    res.status(200).json({ message: 'succesfull', data: data });
};
exports.getAllAuthors = getAllAuthors;
const getAuthorById = (req, res, _next) => {
    const data = (0, utils_1.readFile)();
    const authorData = data.find((item) => `${item.id}` === req.params.id);
    if (!authorData) {
        return res.status(404).json({ message: `author not found` });
    }
    res.status(200).json({ message: "success", data: authorData });
};
exports.getAuthorById = getAuthorById;
const postAuthor = (req, res, _next) => {
    const { error } = (0, utils_2.validateEntry)(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    else {
        const data = (0, utils_1.readFile)();
        console.log(data, "data found");
        // const newBook = { ...req.body, books: getIdForBooks(req.body.books)  }
        const { author, age, address } = req.body;
        // const newData = {id: data.length + 1, dateRegistered: new Date().getTime(), ...newBook};
        let newAuthor;
        let allNewData;
        if (data.length === 0) {
            newAuthor = {
                id: 1,
                author,
                age,
                address,
                dateRegistered: Date.now(),
                books: []
            };
            allNewData = [newAuthor];
            console.log(allNewData, "new data");
        }
        else {
            newAuthor = {
                id: data.length + 1,
                author,
                age,
                address,
                dateRegistered: Date.now(),
                books: []
            };
            allNewData = [...data, newAuthor];
        }
        console.log(allNewData, "DATA");
        (0, utils_1.writeFile)(allNewData);
        res.status(201).json({ message: "create new book...", data: newAuthor });
    }
};
exports.postAuthor = postAuthor;
const updateAuthor = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const dataToUpdate = data.find((item) => `${item.id}` === req.params.id);
    if (!dataToUpdate) {
        return res.status(404).json({ message: "does not exist" });
    }
    const newData = { ...dataToUpdate, ...req.body };
    const dataIndex = data.findIndex((item) => `${item.id}` === req.params.id);
    data.splice(dataIndex, 1, newData);
    (0, utils_1.writeFile)(data);
    console.log(dataToUpdate);
    res.status(201).json({ message: "author updated...", data: newData });
};
exports.updateAuthor = updateAuthor;
const deleteAuthor = (req, res, next) => {
    const data = (0, utils_1.readFile)();
    const dataToDelete = data.find((item) => `${item.id}` === req.params.id);
    if (!dataToDelete) {
        return res.status(404).json({ message: "not found" });
    }
    const dataIndex = data.findIndex((item) => `${item.id}` === req.params.id);
    data.splice(dataIndex, 1);
    (0, utils_1.writeFile)(data);
    res.status(200).json({ message: "Trashed!", data: data });
};
exports.deleteAuthor = deleteAuthor;
exports.default = {
    getAllAuthors: exports.getAllAuthors,
    getAuthorById: exports.getAuthorById,
    postAuthor: exports.postAuthor,
    updateAuthor: exports.updateAuthor,
    deleteAuthor: exports.deleteAuthor
};
