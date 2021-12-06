import express, {NextFunction, Request, Response} from 'express';
import router from './post';
import{ getABook,postBook,updateBook,deleteBook } from '../controller/bookController';


router.get('/:authorId/:bookId', getABook)
router.post('/:authorId/:bookId', postBook)
router.put('/:authorId/:bookId', updateBook)
router.delete('/:authorId/:bookId', deleteBook)


export default router;