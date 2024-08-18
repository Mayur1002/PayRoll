import express from 'express'
import { addUser, deleteUserById, getAllUsers, getUserById, loginUser, updateUserById } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/getall_users', getAllUsers);
router.get('/get_user_byid/:id', getUserById);
router.post('/add_user', addUser)
router.put('/update_user/:id', updateUserById);
router.delete('/delete_user/:id', deleteUserById);
router.post('/login', loginUser);


export default router;