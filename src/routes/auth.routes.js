import { Router } from 'express';
import { register, getAllUsers, login } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';

const routerAuth = Router();

routerAuth.post('/register', register);
routerAuth.post('/login', login);
routerAuth.get('/', authMiddleware, verifyAdmin, getAllUsers);

export default routerAuth;