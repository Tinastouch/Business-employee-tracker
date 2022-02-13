DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (ID)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id VARCHAR (30),
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES("HR"), ("Tech"), ("Admin"), ("Management");

INSERT INTO role(title, salary, department_id)
VALUES ("Director", 10000, 1), ("Office Manager", 75000, 2), ("Web Developer", 80000, 3), ("Recruitment", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rob", "Johnson", 1, null), ("Jennifer", "Hope", 2, 1), ("Jerry", "Thompson", 3, 2), ("Nicholas", "Ludgate", 4, 3);