
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

let employees = [];
let id = 1;

app.get('/api/employees/', (req, res) => {
  res.json(employees);
});

app.post('/api/employees/', (req, res) => {
  const emp = { id: id++, ...req.body };
  employees.push(emp);
  res.json(emp);
});

app.put('/api/employees/:id', (req, res) => {
  const empId = parseInt(req.params.id);
  employees = employees.map(emp => emp.id === empId ? { ...emp, ...req.body } : emp);
  res.json({ message: "Updated" });
});

app.delete('/api/employees/:id', (req, res) => {
  const empId = parseInt(req.params.id);
  employees = employees.filter(emp => emp.id !== empId);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
