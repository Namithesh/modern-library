const mysql = require('mysql2');

const mysql_promise = require('mysql2/promise');

const bcrypt = require('bcrypt');

const config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_DATABASE || "library",
};

const pool = mysql_promise.createPool(config);

const connection = mysql.createConnection(config);

(function () {
    connection.query(
        'SELECT 1',
        function(err, results, fields) {
          if (!err) console.log('Connection SUCCESS');
          else console.log('Connection FAILURE');
        }
    );
}());

(async function () {
    try {
        const [results, _] = await pool.execute(
            'SELECT 1'
        );

        addAdmin();
    
        console.log('Pool SUCCESS');
        console.log('Result', results);
            
    } catch(e) {
        console.log('Pool FAILURE');
    }
}());

async function saveUserToDatabase(name, roll_no, password, role) {

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const SQL = 'INSERT INTO auth(name, roll_no, password, role) VALUES(?, ?, ?, ?)';
    const ARGS = [name, roll_no, hashedPassword, role];
  
    try {
      const [results, _] = await pool.execute(
        SQL,
        ARGS,
      );
  
      console.log(results);
      if (results.affectedRows === 1) {
        console.log("User registered:", roll_no, password, hashedPassword);
        return true;
      }
      return false;
  
    } catch(e) {
      return false;
    }
}

async function addAdmin() {
    try {
        const [results, _] = await pool.execute(
            'SELECT COUNT(*) as COUNT FROM auth WHERE role="ADMIN"'
        );

        const count = results[0].COUNT;
        console.log('current admin count', count);

        if (count === 0) {
            await saveUserToDatabase('Admin User', '999', 'ppp', 'ADMIN');
            // console.log('Added admin user with roll_no 999 and password ppp');
        }
            
    } catch(e) {
        console.log('ERR', e);
    }
}

async function getData(SQL) {

    if (SQL === null) return null;

    try {
        const [results, _] = await pool.execute(SQL);
    
        console.log(results);
        return {
            error : null,
            results : results,
        }
    } catch (err) {
        return {
            error : err,
            results : [],
        }
    }
}

function handleDb(err, results, _, fn) {
    if (err) {
        console.log('ERR', err);
        return {
            err : err,
        }
    }

    fn(results);
}

module.exports.pool = pool;
module.exports.connection = connection;
module.exports.getData = getData;