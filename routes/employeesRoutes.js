import express from 'express'
import { addEmployee, deleteEmployeeById, getAllEmployees, getEmployeeById, updateEmployeeById } from '../controllers/employeesControllers.js';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddlewares.js';


const router = express.Router();

router.get('/getallemployees', verifyToken, getAllEmployees);
router.get('/getemployeesbyid/:id', verifyToken, getEmployeeById);
router.post('/addemployees', verifyToken, authorizeRoles('admin'), addEmployee)
router.put('/updateemployees/:id', verifyToken, authorizeRoles('admin'), updateEmployeeById);
router.delete('/deleteemployees/:id', verifyToken, authorizeRoles('admin'), deleteEmployeeById);

export default router;