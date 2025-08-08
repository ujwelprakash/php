const BASE = "http://localhost/php-backend/routes/employee.php";

export const fetchEmployees = async () => {
  const res = await fetch(BASE);
  return res.json();
};

export const addEmployee = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateEmployee = async (id, data) => {
  const res = await fetch(`${BASE}?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteEmployee = async (id) => {
  const res = await fetch(`${BASE}?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const text = await res.text(); // read raw response

  try {
    const data = JSON.parse(text); // try to parse as JSON
    if (!res.ok) {
      throw new Error(data.error || "Failed to delete employee");
    }
    return data;
  } catch {
    throw new Error(`Invalid JSON from server: ${text}`);
  }
};
