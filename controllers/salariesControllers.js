import { pool } from '../server.js';

// Add a new salary
export const addSalary = async (req, res) => {
    const { pf, travel_allowance, base_salary, pf_number, rent_allowance, esops, date_given } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO salaries (pf, travel_allowance, base_salary, pf_number, rent_allowance, esops, date_given) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [pf, travel_allowance, base_salary, pf_number, rent_allowance, esops, date_given]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an existing salary by ID
export const updateSalaryById = async (req, res) => {
    const { id } = req.params;
    const { pf, travel_allowance, base_salary, pf_number, rent_allowance, esops, date_given } = req.body;
    try {
        const result = await pool.query(
            'UPDATE salaries SET pf = $1, travel_allowance = $2, base_salary = $3, pf_number = $4, rent_allowance = $5, esops = $6, date_given = $7 WHERE id = $8 RETURNING *',
            [pf, travel_allowance, base_salary, pf_number, rent_allowance, esops, date_given, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Salary not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all salaries
export const getAllSalaries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM salaries');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a salary by ID
export const getSalaryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM salaries WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Salary not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a salary by ID
export const deleteSalaryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM salaries WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Salary not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
