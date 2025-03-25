import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getDeleteAllUsers, getDeleteUsersById, getUsersById, permaDeleteUserById, restoreUserById, updateUserById } from '../controllers/userController.js';

const routerUser = Router();

routerUser.get('/users', getAllUsers);
routerUser.get('/users/:id', getUsersById);
routerUser.post('/users', createUser);
routerUser.put('/users/:id', updateUserById);
routerUser.delete('/users/admin/perma/:id', permaDeleteUserById);
routerUser.delete('/users/:id', deleteUserById);
routerUser.patch('/users/admin/restore/:id', restoreUserById);


routerUser.get('/users/admin/erased', getDeleteAllUsers);
routerUser.get('/users/admin/erased/:id', getDeleteUsersById);

export default routerUser;