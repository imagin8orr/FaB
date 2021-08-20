var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {
    bcryptPassword: function (password, callback) {
        try {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    return callback(err1, null);
                } else {
                    return callback(null, hash);
                }
            });
        } catch (err) {
            return callback(err, null);
        }
    },
    get_jwt_token: function (user_id, email, callback) {
        con.query('SELECT setting_value FROM `settings` WHERE setting_name = "session_days" AND setting_status = 1 AND setting_is_delete = 0;', function (err, setting_result) {
            if (err) {
                return callback(err, null);
            }
            try {
                console.log(parseInt(setting_result[0].setting_value) * 24 + 'h');
                return callback(null, jwt.sign({
                    user_id: user_id,
                    email: email,
                }, process.env.JWT_SECRET_TOKEN, {
                    expiresIn: parseInt(setting_result[0].setting_value) * 24 + 'h'
                }))
            } catch (err) {
                return callback(err, null);
            }
        });

    },
    get_verify_email_jwt_token: function (user_id, email, callback) {
        con.query('SELECT setting_value FROM `settings` WHERE setting_name = "email_verification_days" AND setting_status = 1 AND setting_is_delete = 0;', function (err, setting_result) {
            if (err) {
                return callback(err, null);
            }
            try {
                return callback(null, jwt.sign({
                    user_id: user_id,
                    email: email,
                    user_type: 2
                }, process.env.JWT_SECRET_TOKEN, {
                    expiresIn: parseInt(setting_result[0].setting_value) * 24 + 'h'
                }))
            } catch (err) {
                return callback(err, null);
            }
        });
    },
    insert_email_secret_code: function (insert_array, callback) {
        try {
            con.query('INSERT INTO secretcode(user_id, email, token) VALUES ?', [insert_array], function (err, secretcode_result) {
                return callback(err, secretcode_result);
            });
        } catch (err) {
            console.log(err);
        }
    },
    check_secret_code_is_exist: function (user_id, callback) {
        try {
            con.query('SELECT secretcode_id FROM `secretcode` WHERE user_id = ?', [user_id], function (err, secretcode_result) {
                if (err) {
                    return callback(err, null);
                } else {
                    return callback(null, secretcode_result);
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
    delete_secret_code: function (user_id, callback) {
        try {
            con.query('DELETE FROM `secretcode` WHERE user_id = ?', [user_id], function (err, secretcode_result) {
                if (err) {
                    return callback(err, null);
                } else {
                    return callback(null, secretcode_result);
                }
            });
        } catch (err) {
            console.log(err);
        }
    },
}