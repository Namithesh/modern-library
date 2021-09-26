const { connection, pool, getData } = require('../db');

async function getAllFeedback() {
    
    const SQL = 'SELECT * FROM feedback';
    return await (await getData(SQL)).results;
}

async function getFeedbackDetails(id) {
    
    const SQL = 'SELECT * FROM feedback WHERE id = ?';
    const ARGS = [id];

    try {
        const [results, _] = await pool.execute(SQL, ARGS);
    
        console.log('feed details', results);
        return {
            error : null,
            data : results,
            exists : results.length > 0,
        }
    } catch (err) {
        return {
            error : err,
            data : [],
            exists : false,
        }
    }
}

async function saveFeedback(title, data) {

    const SQL = 'INSERT INTO feedback (title, data) VALUES(?, ?)';
    const ARGS = [title, data];

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

module.exports.saveFeedback = saveFeedback;
module.exports.getAllFeedback = getAllFeedback;
module.exports.getFeedbackDetails = getFeedbackDetails;