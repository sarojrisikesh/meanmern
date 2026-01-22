const db = require('../config/db');

const User = {
    create: (data, callback) => {
        db.query("INSERT INTO users SET ?", data, callback);
    },

    findByEmail: (email, callback) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], callback);
    },

    getUsers: (callback) => {
        db.query("SELECT * FROM users", callback);
    },

    deleteUser: (id, callback) => {
        db.query("DELETE FROM users WHERE id = ?", [id], callback);
    },

    updateUser: (id, data, callback) => {
        db.query("UPDATE users SET ? WHERE id = ?", [data, id], callback);
    }
	
};

module.exports = User;
