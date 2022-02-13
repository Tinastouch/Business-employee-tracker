// const Connection = require('mysql/lib/Connection');
const mysql = require('mysql2');

// Connection information 
const db = mysql.createConnection({
  host: 'localhost',
//   PORT
port: 3306,

  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Password!1',
  database: 'employee_db'
});

// Connect to mySql server and database
db.connect(function(err){
    if(err) throw err;
    console.log ("SQL connected");
    
});



module.exports = db;