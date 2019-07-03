import * as express from 'express';
import UserController from '../controllers/userController';
import getUserRequest from '../requests/getUserRequest';
import createUserRequest from '../requests/createUserRequest';
import updateUserRequest from '../requests/updateUserRequest';
import deleteUserRequest from '../requests/deleteUserRequest';

export const getRoutes = async () => {
    const router = express.Router();

    const userController = new UserController();

    router.get('/user', userController.get);
    router.get('/user/:id', getUserRequest, userController.getOne);
    router.put('/user', createUserRequest, userController.create);
    router.patch('/user/:id', updateUserRequest, userController.update);
    router.delete('/user/:id', deleteUserRequest, userController.delete);

    return router;
}