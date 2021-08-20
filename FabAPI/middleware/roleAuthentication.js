var userController = require('../controllers/userController');
var empty = require('is-empty');

// Check authentication
function checkRoleAuthentication(req, res, next) {
    if (req.body.permission_id == 16 || req.body.permission_id == 17) {
        return next();
    } else {
        userController.getUserStatus(req.trusted.user_id, function (err, user_master) {
            if (err) {
                console.log('checkRoleAuthentication : getModuleAndPermissions', err);
                return res.status(500).json({
                    success: false,
                    error: true,
                    data: Array(),
                    message: _messages[0]
                });
            } else {
                if (empty(user_master)) {
                    userController.checkUserPermission(req.trusted.user_id, req.body.permission_id, function (err, is_permitted) {
                        if (err) {
                            console.log('checkRoleAuthentication : getModuleAndPermissions', err);
                            return res.status(500).json({
                                success: false,
                                error: true,
                                data: Array(),
                                message: _messages[0]
                            });
                        } else {
                            if (empty(is_permitted)) {
                                return res.status(403).json({
                                    success: false,
                                    error: true,
                                    data: Array(),
                                    message: _messages[1]
                                });
                            } else {
                                return next();
                            }
                        }
                    });
                } else {
                    return next();
                }
            }
        });
    }
}

module.exports = checkRoleAuthentication;