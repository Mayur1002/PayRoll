import express from 'express'

import { addEmployeeSalary, deleteEmployeeSalaryById, getAllEmployeeSalaries, getEmployeeSalaryById, updateEmployeeSalaryById } from '../controllers/employeeSalariesControllers.js';


const router = express.Router();
router.get('/getall_es', getAllEmployeeSalaries);
router.get('/get_es_byid/:id', updateEmployeeSalaryById);
router.post('/add_es', addEmployeeSalary)
router.put('/update_es/:id', getEmployeeSalaryById);
router.delete('/delete_es/:id', deleteEmployeeSalaryById);

export default router;