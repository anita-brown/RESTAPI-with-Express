import express, {NextFunction, Request, Response} from 'express';
import usersController from '../controller/usersController';

const router = express.Router();



/* GET users listing. */

router.get("/", usersController.getAllUsers);
router.post("/signup", usersController.signUp);

export default router;
