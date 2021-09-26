const { connection, pool, getData } = require('../db');

async function addEvent(info) {

    const SQL = 'INSERT INTO event (text) VALUES(?)';
    const ARGS = [info];

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

async function getAllEvents() {
    const SQL = 'SELECT * FROM event';
    return await (await getData(SQL)).results;
}

async function deleteEventById(id) {
    
    const SQL = 'DELETE FROM event WHERE id = ?';
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

module.exports.addEvent = addEvent;
module.exports.getAllEvents = getAllEvents;
module.exports.deleteEventById = deleteEventById;