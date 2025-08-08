<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../helpers/response.php';

function getEmployees() {
    global $conn;
    $result = $conn->query("SELECT ID AS id, name, position, department FROM employees");
    if (!$result) {
        sendError('Database error: ' . $conn->error, 500);
    }
    $employees = [];
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row; // already has lowercase 'id'
    }
    sendJSON($employees);
}


function addEmployee() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['name']) || empty($data['position']) || empty($data['department'])) {
        sendError("Missing required fields", 400);
    }

    $name = $conn->real_escape_string($data['name']);
    $position = $conn->real_escape_string($data['position']);
    $department = $conn->real_escape_string($data['department']);

    $sql = "INSERT INTO employees (name, position, department) VALUES ('$name', '$position', '$department')";

    if ($conn->query($sql)) {
        $inserted_id = $conn->insert_id;

        // Fetch the inserted employee
        $result = $conn->query("SELECT * FROM employees WHERE id = $inserted_id");

        if ($result) {
            $newEmployee = $result->fetch_assoc();
            sendJSON($newEmployee);
        } else {
            sendError('Failed to fetch inserted employee: ' . $conn->error, 500);
        }
    } else {
        sendError('Insert failed: ' . $conn->error, 500);
    }
}


function updateEmployee() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id']) || empty($data['name']) || empty($data['position']) || empty($data['department'])) {
        sendError("Missing required fields", 400);
    }

    $id = intval($data['id']);
    $name = $conn->real_escape_string($data['name']);
    $position = $conn->real_escape_string($data['position']);
    $department = $conn->real_escape_string($data['department']);

    $sql = "UPDATE employees 
            SET name='$name', position='$position', department='$department' 
            WHERE id=$id";

    if ($conn->query($sql)) {
        sendJSON(['message' => 'Employee updated successfully']);
    } else {
        sendError('Update failed: ' . $conn->error, 500);
    }
}

function deleteEmployee() {
    global $conn;

    // Read ID from query string or JSON body
    $id = 0;
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Check JSON body first
        $data = json_decode(file_get_contents("php://input"), true);
        if (!empty($data['id'])) {
            $id = intval($data['id']);
        } elseif (!empty($_GET['id'])) {
            $id = intval($_GET['id']);
        }
    }

    if ($id <= 0) {
        sendError('Invalid employee ID', 400);
        return;
    }

    // Check if employee exists
    $stmt = $conn->prepare("SELECT id FROM employees WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        sendError('Employee not found', 404);
        return;
    }

    // Delete employee
    $stmt = $conn->prepare("DELETE FROM employees WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        sendJSON(['message' => 'Employee deleted successfully']);
    } else {
        sendError('Delete failed: ' . $stmt->error, 500);
    }
}
