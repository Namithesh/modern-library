const { connection, pool, getData } = require('../db');

async function saveBookTransaction(name, roll_no, book_name, date, duration) {

    const SQL = 'INSERT INTO book_transaction (name, roll_no, book_name, date, borrow_interval) VALUES(?, ?, ?, ?, ?)';
    const ARGS = [name, roll_no, book_name, date, duration];

    connection.query(
        SQL,
        ARGS,
        function(err, results, fields) {
            if (err) {
                console.log('ERR', err);
                return {
                    success : false,
                };
            }

            console.log(results);
            return {
                success : true,
            };
        }
    );
}

async function getAllBookTransaction() {
    const SQL = 'SELECT * FROM book_transaction';
    return await (await getData(SQL)).results;
}

async function deleteBookTransactionById(id) {
    
    const SQL = 'UPDATE book_transaction SET returned = 1 WHERE id = ?';
    const ARGS = [id];

    try {
        const [results, _] = await pool.execute(SQL, ARGS);
    
        return {
            error : null,
            success : true,
        }
        
    } catch (err) {
        return {
            error : err,
            success : false,
        }
    }
}

// async function deleteBookTransactionById(id) {
    
//     const SQL = 'DELETE FROM book_transaction WHERE id = ?';
//     const ARGS = [id];

//     try {
//         const [results, _] = await pool.execute(SQL, ARGS);
    
//         return {
//             error : null,
//             success : true,
//         }
        
//     } catch (err) {
//         return {
//             error : err,
//             success : false,
//         }
//     }
// }

module.exports.saveBookTransaction = saveBookTransaction;
module.exports.getAllBookTransaction = getAllBookTransaction;
module.exports.deleteBookTransactionById = deleteBookTransactionById;