const { connection, pool, getData } = require('../db');

async function saveBook(title, search_keywords, download_url) {

    const SQL = 'INSERT INTO books (title, search_keywords, download_url) VALUES(?, ?, ?)';
    const ARGS = [title, search_keywords, download_url];

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

async function getAllBooks() {
    const SQL = 'SELECT * FROM books';
    return await (await getData(SQL)).results;
}

async function getBooksBySearch(search) {
    const SQL = `SELECT * FROM books WHERE title LIKE "%${search}%" OR search_keywords LIKE "%${search}%"`;
    return await (await getData(SQL)).results;
}

module.exports.saveBook = saveBook;
module.exports.getAllBooks = getAllBooks;
module.exports.getBooksBySearch = getBooksBySearch;