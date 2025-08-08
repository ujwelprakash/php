import React, { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/api";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchEmployees().then(setEmployees);
  }, []);
  
const handleAddOrUpdate = async (data) => {
  if (editing) {
    await updateEmployee(editing.id, data);
    // Use local updated data + id to update state
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editing.id ? { ...data, id: editing.id } : emp
      )
    );
    setEditing(null);
  } else {
    const newEmp = await addEmployee(data);
    setEmployees((prev) => [...prev, newEmp]);
  }
};



  const handleEdit = (emp) => {
    setEditing(emp);
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("No ID provided for deletion");
      return;
    }
    try {
      const result = await deleteEmployee(id);
      console.log(result.message || "Deleted successfully");
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  return (
    <div className="App" style={{ padding: 20 }}>
      <h1>Employee Manager</h1>
      <EmployeeList
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EmployeeForm onAdd={handleAddOrUpdate} initialData={editing} />
    </div>
  );
}

export default App;
