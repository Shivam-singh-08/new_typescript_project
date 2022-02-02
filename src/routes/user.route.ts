import express, { Router } from 'express';
import controller from '../controller/user.controller';

const router =express.Router()

router.get('/getall', controller.getAllUsers);
router.get('/:id',controller.getUserById);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.delete('/:id',controller.deleteUser);

export default router;