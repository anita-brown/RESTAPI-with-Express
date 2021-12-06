import express, {Request, Response} from 'express';
import { readUsersFile,writeUsersFile, Users } from '../utils/utils';
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import  JWT from "jsonwebtoken";
import uuid4 from "uuid4";




export const getAllUsers = (req:Request, res: Response)=> {
    const userData = readUsersFile();
    res.status(200).json({message: 'succesfull',  userData})
}

// SIGNUP 

export const signUp = async (req:Request, res:Response) => {

    const userData = readUsersFile();

    // To check validation of reqbody
    [ check("name", "Full name required"),
        check("email", "Please provide a valid email").isEmail(),
        check("dateOfBirth"),
        check(
          "password",
          "Please provide password greater than 6 characters"
        ).isLength({
          min: 6,
        })
      ]

    const { id, name, dateOfBirth, password,email } = req.body;
//  Validate the input
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array(),
  });
}

// Validate if user doesn't exist
let userNewData = userData.find((user:Users) => {
  return user.email === email;
});
if (userNewData) {
  return res.status(400).json({
    errors: [
      {
        msg: "This user already exists",
      },
    ],
  });
}

const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);

userData.push({
    id: uuid4(),
    name,
    dateOfBirth,
  email,
  password: hashedPassword,
});
console.log(userData)

const token = await JWT.sign(
  {
    email,
  },
  "ughyjkkoiughjkhu3jkhu748uhjki78h",
  {
    expiresIn: 36000000,
  });

res.json({
  token,
})
writeUsersFile(userData)
};


export default {
    getAllUsers,
    signUp
}