import express, {Request, Response, NextFunction} from 'express';
import { readFile, writeFile, author } from '../utils/utils';
import {getIdForBooks, validateEntry} from '../utils/utils';


export const getABook = (req: Request, res: Response, next:NextFunction)=>{
    const data = readFile();
    const authorData = data.find((item: author)=> `${item.id}` === req.params.authorId);
    if(!authorData){
        return res.status(404).json({message: `author with the id ${req.params.authorId} not found!`})
    }
    const bookData = authorData.books.find((item:author) => `${item.id}` === req.params.bookId)
    if(!bookData){
        return res.status(404).json({message: `book with the id ${req.params.bookId} not found`})
    }
    res.status(200).json({mesaage: "success", data: bookData})
}


export const postBook = (req:Request, res:Response) => {

    const data = readFile();
    
    let authorFind = data.find(((item: {item:author, id: number})=> `${item.id}` === req.params.authorId));
    const authorIndex = data.findIndex((item: {item:author, id: number}) => `${item.id}` === req.params.authorId)
    
    if(!authorFind){
    
    return res.status(404).json({message:"author does not exist"})
    
    }
    
    const {name, isPublished, datePublished, serialNumber} = req.body
    let bookId
    if(authorFind.books.length === 0){
        bookId = 'book1'
    }else{
        bookId = `book${authorFind.books.length + 1}`
    }
    
    const newBook = {
        id: bookId,
        name,
        isPublished,
        datePublished: datePublished || null,
        serialNumber: serialNumber || null
    }
    
    authorFind = {
    
    ...authorFind,
    
    books: [ ...authorFind.books, newBook ]
    }
    
    data[authorIndex] = authorFind
    writeFile(data);
    
    res.status(201).json({message: "new book added", author: authorFind })
    
    }

    export const updateBook = (req: Request, res:Response, next:NextFunction) =>{
        const data = readFile();
        const authorFind = data.find((item: {item:author, id: number})=> `${item.id}` === req.params.authorId);
        if(!authorFind){
            return res.status(404).json({message: `author with the id ${req.params.authorId} does not exist`})
        }
        const bookToUpdate = authorFind.books.find((item: {item:author, id: number})=> `${item.id}` === req.params.bookId)
        if(!bookToUpdate){
            return res.status(404).json({message: `book with the id ${req.params.bookId} does not exist`})
        }
        const newData = {...bookToUpdate, ...req.body};
        const dataIndex = authorFind.books.findIndex((item:author) => `${item.id}` === req.params.bookId)
        authorFind.books.splice(dataIndex, 1, newData);
    
        writeFile(authorFind)
        res.status(201).json({message: "book updated...", data: newData})
    }



export const deleteBook = (req:Request, res:Response, next:NextFunction) =>{
    const data = readFile();
    const authorFind = data.find((item: {item:author, id: number})=> `${item.id}` === req.params.authorId);
    if(!authorFind){
        return res.status(404).json({message: `author with the id ${req.params.authorId} does not exist`})
    }
    const bookToDelete = authorFind.books.find((item: {item:author, id: number})=> `${item.id}` === req.params.bookId)
    if(!bookToDelete){
        return res.status(404).json({message: `book with the id ${req.params.bookId} does not exist`})
    }
    const dataIndex = authorFind.books.findIndex((item:{item:author, id: number}) => `${item.id}` === req.params.id);
    authorFind.books.splice(authorFind.books, 1);
    writeFile(data);
    res.status(200).json({message: `Book with the id ${req.params.bookId} has been trashed...`})
}

export default {
    getABook,
    postBook,
    updateBook,
    deleteBook
}