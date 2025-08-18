import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure this file exists for the styles below

const API_URL = "http://localhost:8000/api/employees/";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", role: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? API_URL + editingId + "/" : API_URL;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    await res.json();
    alert(editingId ? "Employee updated!" : "Employee added!");
    window.location.reload();
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp.id);
  };

  const handleDelete = async (id) => {
    await fetch(API_URL + id + "/", { method: "DELETE" });
    alert("Employee deleted!");
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>👩‍💼 Employee Management System</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          placeholder="Job Role"
          value={formData.role}
          onChange={e => setFormData({ ...formData, role: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button className="submit-btn" type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="employee-list">
        {employees.map(emp => (
          <div className="employee-card" key={emp.id}>
            <div className="info">
              <h3>{emp.name}</h3>
              <p>{emp.role}</p>
              <p>{emp.email}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(emp)} className="edit-btn">
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(emp.id)} className="delete-btn">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
