import { Router } from 'express';
import { createUsers, deleteUserById, getAllUsers, getDeleteAllUsers, getDeleteUsersById, getUsersById, permaDeleteUserById, restoreUserById, updateUserById } from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUsers);
router.put('/users/:id', updateUserById);
router.delete('/users/admin/perma/:id', permaDeleteUserById);
router.delete('/users/:id', deleteUserById);
router.patch('/users/admin/restore/:id', restoreUserById);


router.get('/users/admin/erased', getDeleteAllUsers);
router.get('/users/admin/erased/:id', getDeleteUsersById);

export default router;