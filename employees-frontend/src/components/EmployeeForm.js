import React, { useEffect, useState } from "react";

const EmployeeForm = ({ onAdd, initialData }) => {
  const [form, setForm] = useState({
    id: null, // keep ID for updates
    name: "",
    position: "",
    department: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ id: null, name: "", position: "", department: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass form data (including ID if editing)
    onAdd(form);

    // Reset only if adding, not editing
    if (!form.id) {
      setForm({ id: null, name: "", position: "", department: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Position"
        required
      />
      <input
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <button type="submit">{form.id ? "Update" : "Add"}</button>
    </form>
  );
};

export default EmployeeForm;
