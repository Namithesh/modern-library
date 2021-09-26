const { connection, pool, getData } = require('../db');

async function getAllArticles() {
    const SQL = 'SELECT * FROM article';
    return await (await getData(SQL)).results;
}

async function getArticleDetails(id) {
    
    const SQL = 'SELECT * FROM article WHERE article_id = ?';
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

async function deleteArticleById(id) {
    
    const SQL = 'DELETE FROM article WHERE article_id = ?';
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

async function saveArticle(title, data, student_name, user_id, image_path) {

    const SQL = 'INSERT INTO article (title, content, student_name, user_id, cover_image) VALUES(?, ?, ?, ?, ?)';
    const ARGS = [title, data, student_name, user_id, image_path];

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

module.exports.getAllArticles = getAllArticles;
module.exports.saveArticle = saveArticle;
module.exports.getArticleDetails = getArticleDetails;
module.exports.deleteArticleById = deleteArticleById;