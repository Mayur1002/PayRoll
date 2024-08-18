import express from 'express'
import { addSalary, deleteSalaryById, getAllSalaries, getSalaryById, updateSalaryById } from '../controllers/salariesControllers.js';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddlewares.js';


const router = express.Router();

router.get('/getallsalaries', verifyToken, getAllSalaries);
router.get('/getsalariesbyid/:id', verifyToken, getSalaryById);
router.post('/addsalaries', verifyToken, authorizeRoles('admin'), addSalary)
router.put('/updatesalaries/:id', verifyToken, authorizeRoles('admin'), updateSalaryById);
router.delete('/deletesalaries/:id', verifyToken, authorizeRoles('admin'), deleteSalaryById);

export default router;