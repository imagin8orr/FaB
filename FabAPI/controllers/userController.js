
module.exports = {
    checkEmailIsExist: function (email, callback) {
        con.query('SELECT email FROM `user` WHERE email =  ? ', [email], function (err, user_data) {
            return callback(err, user_data);
        });
    },
    createUser: function (insert_array, callback) {
        con.query('INSERT INTO user(username, email, screen_name, password, phone, address) VALUES ?', [insert_array], function (err, user_data) {
            return callback(err, user_data);
        });
    },
    checkUser: function (email, callback) {
        const path = process.env.API_URL + 'public/profile/thumb/thumbnails-';
        con.query('SELECT user_id, email, username, password, screen_name, CONCAT( "' + path + '", profile) AS "profile", user_type FROM user WHERE email = ?;',
            [email], function (err, updated) {
                return callback(err, updated);
            });
    },
    getUserInfo: function (user_id, callback) {
        const path = process.env.API_URL + 'public/profile/thumb/thumbnails-';
        con.query('SELECT user_id, email, username, password, screen_name, CONCAT( "' + path + '", profile) AS "profile", address, phone, user_type FROM user WHERE user_id = ?;',
            [user_id], function (err, data) {
                return callback(err, data);
            });
    },
    updateUserPassword: function (password, email, callback) {
        con.query('UPDATE user SET password = ? WHERE email = ?;',
            [password, email], function (err, updated) {
                return callback(err, updated);
            });
    },
    updateUserInfo: function (update_array, callback) {
        con.query('UPDATE user SET  email=?, username=?, screen_name=?, phone=?, address=? WHERE user_id = ?;',
            update_array, function (err, updated) {
                return callback(err, updated);
            });
    },
    updateUserInfoWithPassword: function (update_array, callback) {
        con.query('UPDATE user SET  email=?, username=?, screen_name=?, phone=?, address=?, password=? WHERE user_id = ?;',
            update_array, function (err, updated) {
                return callback(err, updated);
            });
    },
    getPreviousImageFile: function (id, callback) {
        con.query('SELECT profile FROM `user` WHERE user_id  =  ?', [id], function (err, user_data) {
            return callback(err, user_data);
        });
    },
    updateImageFile: function (update_array, callback) {
        con.query('UPDATE user SET profile = ? WHERE user_id = ?', update_array, function (err, user_data) {
            return callback(err, user_data);
        });
    },
    getUserIdByEmail: function (email, callback) {
        con.query('SELECT user_id, username FROM `user` WHERE email =  ?;', [email], function (err, user_data) {
            return callback(err, user_data);
        });
    },
}