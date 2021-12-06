import fs from 'fs';
import path from 'path';
import Joi from 'joi';
import { Jwt } from 'jsonwebtoken';
// import uuidv4 from 'uuidv4'
// Export and Create interface for keys types in the object
// Export, Create, Read and write files to database in json format
const myFilePath = path.join(__dirname, '../database.json');
const usersPath = path.join(__dirname, '../users.json');



export const readUsersFile= () => {
    try {
        const userData = fs.readFileSync(usersPath, {encoding: "utf-8"})
        console.log(userData)
        return JSON.parse(userData);
    } catch (error) {
        console.log(error, "error occured")
        return []
    }

}

export const writeUsersFile = (userData: Users[]) => {
    try {
        fs.writeFileSync(usersPath, JSON.stringify(userData, null, 4))
    } catch (error) {
        
    }
}

export const validateEntry = (data: author) => {
    const schema = Joi.object({
        author: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required()
        // books: Joi.array().required()
    }).unknown();
    return schema.validate(data)
}


export const readFile = () => {
    try{
        const data = fs.readFileSync(myFilePath, {encoding:'utf8'})
        console.log(data)
        return JSON.parse(data);
        
    }catch(error){
        console.log(error, "error occured")
        return []
    }
    
}


export const writeFile = (data: author[]) =>{
        fs.writeFileSync(myFilePath, JSON.stringify(data, null, 4));

}
    
export function getIdForBooks (booksData: books[]): books[] {
    return booksData.map((book: books, index) => {
        return {id:`book${index + 1}`, ...book}
    })
}



export interface author {
    id?: number,
    author: string,
    dateRegistered: number,
    age: number,
    address: number,
    books: books[]
}


export interface books {
    id?: string,
    name: string,
    isPublished: boolean,
    datePublished: Date | null,
    serialNumber: number|null
}
export interface Users {
    id? : string,
    name: string,
    email: string,
    password: string,
    dateOfBirth: string

}