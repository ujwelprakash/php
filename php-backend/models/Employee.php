<?php
class Employee {
    public $id;
    public $name;
    public $position;
    public $department;

    function __construct($id, $name, $position, $department) {
        $this->id = $id;
        $this->name = $name;
        $this->position = $position;
        $this->department = $department;
    }
}
