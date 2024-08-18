import { pool } from '../server.js';

// Add a new employee-salary relation
export const addEmployeeSalary = async (req, res) => {
    const { employee_id, salary_id, payment_date } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO employee_salaries (employee_id, salary_id, payment_date) VALUES ($1, $2, $3) RETURNING *',
            [employee_id, salary_id, payment_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing employee-salary relation by ID
export const updateEmployeeSalaryById = async (req, res) => {
    const { id } = req.params;
    const { employee_id, salary_id, payment_date } = req.body;
    try {
        const result = await pool.query(
            'UPDATE employee_salaries SET employee_id = $1, salary_id = $2, payment_date = $3 WHERE id = $4 RETURNING *',
            [employee_id, salary_id, payment_date, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Employee-Salary relation not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all employee-salary relations
export const getAllEmployeeSalaries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employee_salaries');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get an employee-salary relation by ID
export const getEmployeeSalaryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM employee_salaries WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Employee-Salary relation not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an employee-salary relation by ID
export const deleteEmployeeSalaryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM employee_salaries WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Employee-Salary relation not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
