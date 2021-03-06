"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdForBooks = exports.writeFile = exports.readFile = exports.validateEntry = exports.writeUsersFile = exports.readUsersFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
// import uuidv4 from 'uuidv4'
// Export and Create interface for keys types in the object
// Export, Create, Read and write files to database in json format
const myFilePath = path_1.default.join(__dirname, '../database.json');
const usersPath = path_1.default.join(__dirname, '../users.json');
const readUsersFile = () => {
    try {
        const userData = fs_1.default.readFileSync(usersPath, { encoding: "utf-8" });
        console.log(userData);
        return JSON.parse(userData);
    }
    catch (error) {
        console.log(error, "error occured");
        return [];
    }
};
exports.readUsersFile = readUsersFile;
const writeUsersFile = (userData) => {
    try {
        fs_1.default.writeFileSync(usersPath, JSON.stringify(userData, null, 4));
    }
    catch (error) {
    }
};
exports.writeUsersFile = writeUsersFile;
const validateEntry = (data) => {
    const schema = joi_1.default.object({
        author: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        address: joi_1.default.string().required()
        // books: Joi.array().required()
    }).unknown();
    return schema.validate(data);
};
exports.validateEntry = validateEntry;
const readFile = () => {
    try {
        const data = fs_1.default.readFileSync(myFilePath, { encoding: 'utf8' });
        console.log(data);
        return JSON.parse(data);
    }
    catch (error) {
        console.log(error, "error occured");
        return [];
    }
};
exports.readFile = readFile;
const writeFile = (data) => {
    fs_1.default.writeFileSync(myFilePath, JSON.stringify(data, null, 4));
};
exports.writeFile = writeFile;
function getIdForBooks(booksData) {
    return booksData.map((book, index) => {
        return { id: `book${index + 1}`, ...book };
    });
}
exports.getIdForBooks = getIdForBooks;
