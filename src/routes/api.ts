import * as express from 'express';
import UserController from '../controllers/userController';
import createUserRequest from '../requests/createUserRequest';

export const getRoutes = async () => {
    const router = express.Router();

    const userController = new UserController();

    router.put('/user', createUserRequest, userController.create);

    return router;
}