"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const usersController_1 = require("../controller/usersController");
const router = express_1.default.Router();
router.get('/:authorId/:bookId', bookController_1.getABook);
router.post('/:authorId/:bookId', usersController_1.checkAuth, bookController_1.postBook);
router.put('/:authorId/:bookId', usersController_1.checkAuth, bookController_1.updateBook);
router.delete('/:authorId/:bookId', usersController_1.checkAuth, bookController_1.deleteBook);
exports.default = router;
