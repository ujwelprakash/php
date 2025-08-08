<?php
require_once '../controllers/EmployeeController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getEmployees();
        break;
    case 'POST':
        addEmployee();
        break;
    case 'PUT':
        updateEmployee();
        break;
    case 'DELETE':
        deleteEmployee();
        break;
    case 'OPTIONS':
        http_response_code(200);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
}
