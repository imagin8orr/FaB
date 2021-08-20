var express = require('express');
var router = express.Router();
var empty = require('is-empty');
const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');
var userController = require('../controllers/userController');
var commonController = require('../controllers/commonController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile');
    },
    filename: function (req, file, cb) {
        var fileName = Date.now() + '_' + file.originalname.replace(" ", "_");
        cb(null, fileName);
    }
});

var upload = multer({
    storage: storage
});

router.post('/image', upload.any(), function (req, res) {
    if (!req.trusted.user_id || !req.files) {
        return res.status(404).json({
            success: false,
            error: true,
            data: Array(),
            message: _messages[2]
        });
    } else {
        try {
            sharp('public/profile/' + req.files[0].filename).resize(200).toFile('public/profile/thumb/' + 'thumbnails-' + req.files[0].filename, (err, resizeImage) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: err,
                        message: _messages[0]
                    });
                } else {
                    userController.getPreviousImageFile(req.trusted.user_id, function (err, PreviousImageFile) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                success: false,
                                error: true,
                                data: err,
                                message: _messages[0]
                            });
                        } else {
                            var update_array = [req.files[0].filename, req.trusted.user_id];
                            if (empty(PreviousImageFile)) {
                                return res.status(500).json({
                                    success: false,
                                    error: true,
                                    data: err,
                                    message: ''
                                });
                            }
                          
                            if (PreviousImageFile[0].profile) {
                                var oldPath = 'public/profile/' + PreviousImageFile[0].profile;
                                var newPath = 'public/trash/' + PreviousImageFile[0].profile;

                                var newPathThumb = 'public/trash/' + 'thumbnails-' + PreviousImageFile[0].profile;
                                var oldPathThumb = 'public/profile/thumb/' + 'thumbnails-' + PreviousImageFile[0].profile;
                                fs.rename(oldPath, newPath, function (err) {
                                    if (err) console.log(err)
                                    console.log('Successfully moved!');
                                    fs.rename(oldPathThumb, newPathThumb, function (err) {
                                        if (err) console.log(err)
                                        updateImageFile(update_array, req, res)
                                    });
                                })
                            } else {
                                updateImageFile(update_array, req, res)
                            }
                        }
                    });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: true,
                data: error,
                message: _messages[0]
            });
        }
    }
});

function updateImageFile(update_array, req, res) {
    userController.updateImageFile(update_array, function (err, updated_user_result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                error: true,
                data: err,
                message: _messages[0]
            });
        } else {
            updateUserData(req, res)
        }
    });
}

router.get('/info', function (req, res) {
    try {
        if (req.trusted) {
            userController.getUserInfo(req.trusted.user_id, function (err, user_data) {
                if (err) {
                    console.log('users/info : getUserInfo ', err);
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: err,
                        message: _messages[0]
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        error: false,
                        data: user_data[0] ? user_data[0] : Array(),
                        message: ''
                    });
                }
            });
        } else {
            return res.status(500).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[0]
            });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            error: true,
            data: e,
            message: _messages[0]
        });
    }

});

router.post('/profile_update', function (req, res) {
    try {
        if (!req.body.email || !req.body.phone || !req.body.screen_name) {
            return res.status(404).json({
                success: false,
                error: true,
                data: Array(),
                message: _messages[2]
            });
        } else {
            if (req.body.password) {
                commonController.bcryptPassword(req.body.password, function (err, hash) {
                    if (err) {
                        console.log('webhook/signup : bcryptPassword', err);
                        return res.status(500).json({
                            success: false,
                            error: true,
                            data: Array(),
                            message: _messages[0]
                        });
                    } else {
                        var update_array = [req.body.email, req.body.username, req.body.screen_name, req.body.phone, req.body.address, hash, req.trusted.user_id];
                        userController.updateUserInfoWithPassword(update_array, function (err, updated_user_result) {
                            if (err) {
                                console.log('users/profile_update : updateUserInfoWithPassword ', err);
                                return res.status(500).json({
                                    success: false,
                                    error: true,
                                    data: err,
                                    message: _messages[0]
                                });
                            } else {
                                updateUserData(req, res);
                            }
                        });
                    }
                });
            } else {
                var update_array = [req.body.email, req.body.username, req.body.screen_name, req.body.phone, req.body.address, req.trusted.user_id];
                userController.updateUserInfo(update_array, function (err, updated_user_result) {
                    if (err) {
                        console.log('users/profile_update : updateUserInfo ', err);
                        return res.status(500).json({
                            success: false,
                            error: true,
                            data: err,
                            message: _messages[0]
                        });
                    } else {
                        updateUserData(req, res);
                    }
                });
            }

        }
    } catch (e) {
        console.log(e)
    }
});

function updateUserData(req, res) {
    try {
        userController.getUserInfo(req.trusted.user_id, function (err, user_data) {
            if (err) {
                console.log('users/profile_update : updateUserInfo ', err);
                return res.status(500).json({
                    success: false,
                    error: true,
                    data: err,
                    message: _messages[0]
                });
            } else {
                if (!empty(user_data)) {
                    const data_list = {
                        user_id: user_data[0].user_id,
                        email: user_data[0].email,
                        username: user_data[0].username ? user_data[0].username : null,
                        profile: user_data[0].profile,
                        user_type: user_data[0].user_type
                    };
                    return res.status(200).json({
                        success: true,
                        error: false,
                        data: data_list,
                        message: 'Profile ' + _messages[4]
                    });
                } else {
                    return res.status(500).json({
                        success: false,
                        error: true,
                        data: err,
                        message: _messages[0]
                    });
                }
            }
        });

    } catch (e) {
        console.log(e)
    }

}

module.exports = router;