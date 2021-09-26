const { connection, pool } = require('./db');

async function getRole(user_id) {
    if (user_id === null) return null;
    try {
        const SQL = 'SELECT role from auth WHERE user_id = ?';
        const ARGS = [user_id];
        const [results, _] = await pool.execute(SQL, ARGS);

        if (results.length > 0) {
            const role = results[0].role;
            return role;
        }

        console.log('user_id not found', user_id);
        return null;
    } catch(err) {
        console.log(err);
        return null;
    }
}

async function isAdmin(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect('/login');

    const role = req.user.role;
    if (role === 'ADMIN') return next();
    
    return res.redirect('/access-denied');
}

async function isStudent(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect('/login');

    const role = req.user.role;
    if (role === 'STUDENT') next();
    
    return res.redirect('/access-denied');
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}
  
function isNotLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/start');
    }
    return next();
}

module.exports.isAdmin = isAdmin;
module.exports.isStudent = isStudent;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isNotLoggedIn = isNotLoggedIn;