
module.exports = {
    checkEmailIsExist: function (email, callback) {
        con.query('SELECT email FROM `user` WHERE email =  ? ', [email], function (err, user_data) {
            return callback(err, user_data);
        });
    },
}