import React from "react";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const handleDeleteClick = (id) => {
    if (!id) {
      console.error("No ID provided for deletion");
      return;
    }
    onDelete(id);
  };

  return (
    <table border="1" cellPadding="10" style={{ marginBottom: 20 }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp, index) => {
          const empId = emp.id || emp._id; // fallback for MongoDB-style IDs
          return (
            <tr key={empId ? `emp-${empId}` : `temp-${index}`}>
              <td>{empId}</td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>
                <button onClick={() => onEdit(emp)}>Edit</button>
                <button
                  onClick={() => handleDeleteClick(empId)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeList;
