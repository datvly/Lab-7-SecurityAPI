import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "@asgardeo/auth-react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/EmployeeMgn.css';

const EmployeeManagement = () => {
  const { state, signIn, signOut } = useAuthContext();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    salary: ''
  });
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      signIn();
    } else if (state.isAuthenticated) {
      fetchEmployees();
    }
  }, [state.isAuthenticated, state.isLoading]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employees', formData);
      await fetchEmployees();
      setFormData({ firstName: '', lastName: '', email: '', birthdate: '', salary: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        await fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${editEmployee.employee_id}`, {
        firstName: editEmployee.first_name,
        lastName: editEmployee.last_name,
        email: editEmployee.email,
        birthdate: editEmployee.birthdate,
        salary: editEmployee.salary
      });
      await fetchEmployees();
      setEditEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  return (
    <div className="employee-management">
      <Header />
      {state.isAuthenticated && (
        <div className="container">
          <h1>Employee List</h1>

          {/* Employee Table */}
          <div className="table-section">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Birthdate</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(employees) && employees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{new Date(employee.birthdate).toLocaleDateString()}</td>
                    <td>${employee.salary}</td>
                    <td>
                      <button className="btn-warning" onClick={() => handleEdit(employee)}>Edit</button>
                      <button className="btn-danger" onClick={() => handleDelete(employee.employee_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Employee Form */}
          <div className="form-card">
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Add Employee</button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EmployeeManagement;