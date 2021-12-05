"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const bookController_1 = require("../controller/bookController");
_1.default.get('/:authorId/book/:bookId', bookController_1.getABook);
_1.default.post('/:authorId/add-book', bookController_1.postBook);
_1.default.put('/:authorId/book/:bookId', bookController_1.updateBook);
_1.default.delete('/:authorId/book/:bookId', bookController_1.deleteBook);
exports.default = _1.default;
