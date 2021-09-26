const { connection, pool, getData } = require('../db');

async function saveToGallery(image_name) {

    const SQL = 'INSERT INTO gallery (image_url) VALUES(?)';
    const ARGS = [image_name];

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

async function getAllGallery() {
    const SQL = 'SELECT * FROM gallery';
    return await (await getData(SQL)).results;
}

module.exports.saveToGallery = saveToGallery;
module.exports.getAllGallery = getAllGallery;