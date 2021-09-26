const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { connection, pool } = require('./db');

async function getUserByRoll(roll_no) {

    const SQL = 'SELECT user_id, name, roll_no, password FROM auth WHERE roll_no = ?';
    const ARGS = [roll_no];

    try {
        const [results, _ ] = await pool.execute(
            SQL,
            ARGS);
        if (results.length > 0) {
            let user = results[0];
            console.log('user', user);
            return user;
        }
        console.log('user not found');
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

async function getUserById(user_id) {

    const SQL = 'SELECT user_id, name, roll_no, password, role FROM auth WHERE user_id = ?';
    const ARGS = [user_id];

    try {
        const [results, _ ] = await pool.execute(SQL, ARGS);

        const SQL2 = 'UPDATE auth SET last_login = NOW() WHERE user_id = ?';
        const ARGS2 = [user_id];

        const [results2, _2 ] = await pool.execute(
            SQL2,
            ARGS2);

        if (results.length > 0) {
            let user = results[0];
            console.log('user', user);
            return user;
        }

        console.log('user not found');
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

async function authenticateUser(roll_no, password, done) {

    const user = await getUserByRoll(roll_no);

    if (user == null) {
        return done(null, false, { message: 'Wrong Roll No or Password' });
    }

    try {
        const compare_results = await bcrypt.compare(password, user.password);
        if (compare_results) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Wrong Password'});
        }
    } catch(e) {
        return done(e);
    }
};

function initialize(passport) {

    passport.use(new LocalStrategy({ usernameField: 'roll_no' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.user_id));
    passport.deserializeUser(async (id, done) => {
        return done(null, await getUserById(id));
    });
}

module.exports = initialize;
