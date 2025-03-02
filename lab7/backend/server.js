const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error testing database connection:', err);
    res.status(500).json({ error: 'Failed to connect to database' });
  }
});

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Get an employee by ID
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  try {
    const [rows] = await db.query('SELECT * FROM employees WHERE employee_id = ?', [id]); // Query the database for the employee with the given ID
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' }); // Return 404 if the employee is not found
    }
    res.status(200).json(rows[0]); // Return the employee data
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).json({ error: 'Failed to fetch employee' }); // Return 500 if there is a server error
  }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
  const { firstName, lastName, email, birthdate, salary } = req.body;

  if (!firstName || !lastName || !email || !birthdate || !salary) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO employees (first_name, last_name, email, birthdate, salary) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, birthdate, salary]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Update an employee
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, birthdate, salary } = req.body;

  if (!firstName || !lastName || !email || !birthdate || !salary) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await db.query(
      'UPDATE employees SET first_name = ?, last_name = ?, email = ?, birthdate = ?, salary = ? WHERE employee_id = ?',
      [firstName, lastName, email, birthdate, salary, id]
    );
    res.status(200).json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM employees WHERE employee_id = ?', [id]);
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));