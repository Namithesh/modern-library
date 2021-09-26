const { connection, pool, getData } = require('../db');

async function getAllUsers() {
    const SQL = 'SELECT * FROM auth WHERE role="STUDENT"';
    return await (await getData(SQL)).results;
}

module.exports.getAllUsers = getAllUsers;