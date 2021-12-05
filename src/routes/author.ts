import express, {NextFunction, Request, Response} from 'express';
import authorController from '../controller/authorController';


const router = express.Router();

router.get('/',authorController.getAllAuthors)
router.get('/:id', authorController.getAuthorById)
router.post('/', authorController.postAuthor)
router.put('/:id', authorController.updateAuthor)

router.delete('/:id',authorController.deleteAuthor)

// router.get('/:authorId/book/:bookId', getABook)
// router.post('/:authorId/add-book', postBook)
// router.put('/:authorId/book/:bookId', updateBook)
// router.delete('/:authorId/book/:bookId', deleteBook)


export default router;

// https://authorandbooks.herokuapp.com/author/1