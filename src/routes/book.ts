import express, {NextFunction, Request, Response} from 'express';
import router from '.';
import{ getABook,postBook,updateBook,deleteBook } from '../controller/bookController';


router.get('/:authorId/book/:bookId', getABook)
router.post('/:authorId/add-book', postBook)
router.put('/:authorId/book/:bookId', updateBook)
router.delete('/:authorId/book/:bookId', deleteBook)


export default router;