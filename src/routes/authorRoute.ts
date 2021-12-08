import express, {NextFunction, Request, Response} from 'express';
import authorController from '../controller/authorController';
import { checkAuth } from '../controller/usersController';

const router = express.Router();

router.get('/',authorController.getAllAuthors)
router.get('/:id', authorController.getAuthorById)
router.post('/', checkAuth, authorController.postAuthor)
router.put('/:id',checkAuth, authorController.updateAuthor)
router.delete('/:id',checkAuth,authorController.deleteAuthor)

// router.get('/:authorId/book/:bookId', getABook)
// router.post('/:authorId/add-book', postBook)
// router.put('/:authorId/book/:bookId', updateBook)
// router.delete('/:authorId/book/:bookId', deleteBook)


export default router;

// https://authorandbooks.herokuapp.com/author/1