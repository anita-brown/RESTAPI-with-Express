import express, {Request, Response, NextFunction} from 'express';
import { readFile, writeFile, author } from '../utils/utils';
import {validateEntry} from '../utils/utils';




export const getAllAuthors = (req: Request, res: Response, next: NextFunction) => {
    const data = readFile();
    console.log("anita")
    res.status(200).json({message: 'succesfull', data: data})
}

export const getAuthorById = (req:Request, res:Response, _next:NextFunction) => {
    const data = readFile();
    const authorData = data.find((item: author) => `${item.id}` === req.params.id)
    if(!authorData){
        return res.status(404).json({message: `author not found`})
    }
    res.status(200).json({message: "success", data: authorData})
}

export const postAuthor = (req:Request, res:Response, _next:NextFunction)=>{
    const {error} = validateEntry(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }else{
        const data = readFile();
        console.log(data, "data found")
        // const newBook = { ...req.body, books: getIdForBooks(req.body.books)  }
        const {author, age, address}  = req.body
        // const newData = {id: data.length + 1, dateRegistered: new Date().getTime(), ...newBook};
        let newAuthor
        let allNewData
        if(data.length === 0){
            newAuthor = {
                id: 1,
                author,
                age,
                address,
                dateRegistered: Date.now(),
                books: []
            }
            allNewData = [newAuthor]
            console.log(allNewData, "new data")
        }else{
            newAuthor = {
                id: data.length + 1,
                author,
                age,
                address,
                dateRegistered: Date.now(),
                books: []
            }
            allNewData = [...data, newAuthor];
        }
         console.log(allNewData, "DATA")
    
         writeFile(allNewData);
    
        res.status(201).json({message: "create new book...", data: newAuthor})
    }

}

export const updateAuthor = (req:Request, res:Response, next:NextFunction)=>{
    const data = readFile();
    const dataToUpdate = data.find((item: {item:author, id: number})=> `${item.id}` === req.params.id)
    if(!dataToUpdate){
        return res.status(404).json({message:"does not exist"})
    }
    const newData = {...dataToUpdate, ...req.body };
    const dataIndex = data.findIndex((item:{id:number})=>`${item.id}` === req.params.id)
    data.splice(dataIndex, 1, newData);
    writeFile(data);
    console.log(dataToUpdate);
    res.status(201).json({message: "author updated...", data: newData})
}

export const deleteAuthor = (req:Request, res:Response, next:NextFunction)=>{
    const data = readFile();
    const dataToDelete = data.find((item:{item:author, id: number}) => `${item.id}` === req.params.id);
    if(!dataToDelete){
       return res.status(404).json({message:"not found"})
    }
    const dataIndex = data.findIndex((item:{item:author, id: number}) => `${item.id}` === req.params.id);
    data.splice(dataIndex, 1)
    writeFile(data);
    res.status(200).json({message: "Trashed!", data: data})
}


export default{
    getAllAuthors,
    getAuthorById,
    postAuthor,
    updateAuthor,
    deleteAuthor
}