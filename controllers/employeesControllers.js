import { pool } from '../server.js';

// Add a new employee
export const addEmployee = async (req, res) => {
    const { name, department, position, age, gender, leaves } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO employees (name, department, position, age, gender, leaves) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, department, position, age, gender, leaves]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing employee by ID
export const updateEmployeeById = async (req, res) => {
    const { id } = req.params;
    const { name, department, position, age, gender, leaves } = req.body;
    try {
        const result = await pool.query(
            'UPDATE employees SET name = $1, department = $2, position = $3, age = $4, gender = $5, leaves = $6 WHERE id = $7 RETURNING *',
            [name, department, position, age, gender, leaves, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM employees');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get an employee by ID
export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an employee by ID
export const deleteEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
