"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.getAllUsers = void 0;
const utils_1 = require("../utils/utils");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid4_1 = __importDefault(require("uuid4"));
const getAllUsers = (req, res) => {
    const userData = (0, utils_1.readUsersFile)();
    res.status(200).json({ message: 'succesfull', userData });
};
exports.getAllUsers = getAllUsers;
// SIGNUP 
const signUp = async (req, res) => {
    const userData = (0, utils_1.readUsersFile)();
    // To check validation of reqbody
    [(0, express_validator_1.check)("name", "Full name required"),
        (0, express_validator_1.check)("email", "Please provide a valid email").isEmail(),
        (0, express_validator_1.check)("dateOfBirth"),
        (0, express_validator_1.check)("password", "Please provide password greater than 6 characters").isLength({
            min: 6,
        })
    ];
    const { id, name, dateOfBirth, password, email } = req.body;
    //  Validate the input
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    // Validate if user doesn't exist
    let userNewData = userData.find((user) => {
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
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    console.log(hashedPassword);
    userData.push({
        id: (0, uuid4_1.default)(),
        name,
        dateOfBirth,
        email,
        password: hashedPassword,
    });
    console.log(userData);
    const token = await jsonwebtoken_1.default.sign({
        email,
    }, "ughyjkkoiughjkhu3jkhu748uhjki78h", {
        expiresIn: 36000000,
    });
    res.json({
        token,
    });
    (0, utils_1.writeUsersFile)(userData);
};
exports.signUp = signUp;
exports.default = {
    getAllUsers: exports.getAllUsers,
    signUp: exports.signUp
};
