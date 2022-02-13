// Dependencies
const inquirer = require("inquirer");
const connection = require('./db/connection');
const cTable = require("console.table");

// const mysql = require('mysql');

// Connection information 
// const db = mysql.createConnection({
//   host: 'localhost',
// //   PORT
// port: 3306,

//   // Your MySQL username,
//   user: 'root',
//   // Your MySQL password
//   password: 'Password!1',
//   database: 'employee_db'
// });

// Connect to mySql server and database
// connection.connect(function(err){
//     if(err) throw err;
//     console.log ("SQL connected");

//     // add start function here
//     start();
// });

// Basic application functionality
function start() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "start",
                messgae: "We have information onemployees, departments, and employee roles. What would you like to do?",
                choices: ["View", "Add", "Update", "Exit"]
            }
        ]).then(function (res) {
            switch (res.start) {
                case "View":
                    view();
                    break;
                case "Add":
                    add();
                    break;
                case "Update":
                    updateEmployee();
                    break;
                case "Exit":
                    console.log("------------------------------------------");
                    console.log("All done");
                    console.log("------------------------------------------");
                    break;
                    console.log("default");
            }
        });
}

// View the function set
function view() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "view",
                messgae: "Select an option to view ",
                choices: ["All employees", "By department", "By role"]
            }
        ]).then(function (res) {
            switch (res.view) {
                case "All employees":
                    viewAllEmployees();
                    break;
                case "By department":
                    viewByDepartment();
                    break;
                case "By role":
                    viewByRole();
                default:
                    console.log("default");
            }
        });
}

function viewAllEmployees() {
    connection.query("SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, r.title AS Role, r.salary AS Salary, d.name AS Department FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewByDepartment() {
    // query database for all departments
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        // once you have the departments, prompt user for which they choose
        console.table(results)
        // inquirer
        //     .prompt([
        //         {
        //             name: "choice",
        //             type: "rawlist",
        //             choices: function () {
        //                 let choiceArr = [];
        //                 for (i = 0; i < results.lenght; i++) {
        //                     choiceArr.push(results[i].name);
        //                 }
        //                 return choiceArr;
        //             },
        //             message: "Select department"
        //         }
        //     ]).then(function (asnwer) {
        //         connection.query(
        //             "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE d.name =?",
        //             [asnwer.choice], function (err, results) {
        //                 if (err) throw err;
        //                 console.table(results);
                        start();
        //             }
        //         )
        //     });
    });

}

function viewByRole() {
    // query database for all departments
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        // once you have the roles, prompt user for which they choose
        // inquirer
        //     .prompt([
        //         {
        //             name: "choice",
        //             type: "rawlist",
        //             choices: function () {
        //                 let choiceArr = [];
        //                 for (i = 0; i < results.lenght; i++) {
        //                     choiceArr.push(results[i].title);
        //                 }
        //                 return choiceArr;
        //             },
        //             message: "Select role"
        //         }
        //     ]).then(function (answer) {
        //         console.log(answer.choice);
        //         connection.query(
        //             "SELECT e.id AS ID, e.first_name AS First, e.last_name AS Last, e.role_id AS Role, r.salary AS Salary, m.last_name AS Manager, d.name AS Department FROM employee e LEFT JOIN role r ON e.role_id = r.title LEFT JOIN department d ON r.department_id = d.id WHERE e.role_id =?",
        //             [asnwer.choice], function (err, results) {
        //                 if (err) throw err;
                        console.table(results);
                        start();
        //             }
        //         )
            // });
    });
}


// Add Function Set
function add() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "add",
                messgae: "What would you like to add?",
                choices: ["Department", "Employee role", "Employee"]
            }
        ]).then(function (res) {
            switch (res.add) {
                case "Department":
                    addDepartment();
                    break;
                case "Employee role":
                    addRole();
                    break;
                case "Employee":
                    addEmployee();
                default:
                    console.log("default");
            }
        })

}

function addDepartment() {
    // Prompt information for departments
    inquirer
        .prompt([
            {
                name: "department",
                type: "input",
                messgae: "What name would you like to call this department?"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department VALUES (DEFAULT, ?)",
                [answer.department],
                function (err) {
                    if (err) throw err;
                    console.log("------------------------------------------");
                    console.log("Departments updated with " + answer.department);
                    console.log("------------------------------------------");
                    start();
                }
            )
        })
}

function addRole() {
    // Prompt information for departments
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "What name would you like to call this Employee role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this Employee role?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What the department ID for this Employee role?"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO role VALUES (DEFAULT, ?, ?, ?)",
                [answer.role, answer.salary, answer.department_id],
                function (err) {
                    if (err) throw err;
                    console.log("------------------------------------------");
                    console.log("Roles updated with " + answer.role);
                    console.log("------------------------------------------");
                    start();
                }
            )
        })
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        // Once yyou have results prompt user to new employee information
        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Enter employee's first name"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Enter employees last name",
                },
                {
                    name: "role",
                    type: "rawlist",
                    choices: function () {
                        let choiceArr = [];
                        for (i = 0; i < results.length; i++) {
                            const roleObj = {
                                name: results[i].title,
                                value: results[i].id
                            }
                            choiceArr.push(roleObj);
                        }
                        return choiceArr;
                    },
                    message: "Select title"

                },
                {
                    name: "manager",
                    type: "number",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                    message: "Enter manageer ID",
                    default: "1"
                }


            ]).then(function (answer) {
                // answer id an objjject with key value pairs from inquirer prompt
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.role,
                        manager_id: answer.manager
                    }
                )

                console.log("------------------------------------------");
                console.log("Employee Successfally Added");
                console.log("------------------------------------------");
                start();
            });

    });
}

// Update Function Set
function updateEmployee() {
    // Select employee to update
    connection.query("SELECT * FROM employee",
        function (err, results) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "choice",
                        type: "rawlist",
                        choices: function () {
                            let choiceArr = [];
                            for (i = 0; i < results.length; i++) {
                                choiceArr.push(results[i].last_name);
                            }
                            return choiceArr;
                        },
                        message: "Select employee to update"
                    }
                ])
                .then(function (answer) {
                    // SaveName is employee
                    const saveName = answer.choice;

                    connection.query("SELECT * FROM role",
                        function (err, results) {
                            if (err) throw err;
                            inquirer
                                .prompt([
                                    {
                                        name: "role",
                                        type: "rawlist",
                                        choices: function () {
                                            var choiceArr = [];
                                            for (i = 0; i < results.length; i++) {
                                                const roleObj = {
                                                    name: results[i].title,
                                                    value: results[i].id
                                                }
                                                choiceArr.push(roleObj);
                                            }
                                            return choiceArr;
                                        },
                                        message: "Select title"
                                    },
                                    {
                                        name: "manager",
                                        type: "number",
                                        validate: function (value) {
                                            if (isNaN(value) === false) {
                                                return true;
                                            }
                                            return false;
                                        },
                                        message: "Enter new manager ID",
                                        default: "1"
                                    }
                                ]).then(function (answer) {
                                    console.log(answer);
                                    console.log(saveName);
                                    connection.query("UPDATE employee SET ? WHERE last_name = ?",
                                        [
                                            {
                                                role_id: answer.role,
                                                manager_id: answer.manager
                                            }, saveName
                                        ],

                                    ),
                                    console.log("------------------------------------------");
                                    console.log("Employee Updated");
                                    console.log("------------------------------------------");
                                    start();

                                });

                })
        })
})
}

start();