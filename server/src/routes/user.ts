import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/login', userController.postLogin);
router.post('/register', userController.postRegister);

export default router;
