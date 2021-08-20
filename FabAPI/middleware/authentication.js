var jwt = require('jsonwebtoken');


// Check authentication
function checkJwtAuthentication(req, res, next) {
    if (req.headers && req.headers.authorization) {
        var parted = req.headers.authorization.split(' ');
        if (parted.length === 2) {
            jwt.verify(parted[1], process.env.JWT_SECRET_TOKEN, function (err, decoded) {
                if (err) {
                    console.log(err);
                    return res.status(401).json({ success: false, error: true, data: Array(), message: 'Failed to authenticate token.' });
                }
                req.trusted = req.trusted || {};
                Object.assign(req.trusted, decoded);
                return next();
            });
        } else {
            return res.status(401).json({ success: false, error: true, data: Array(), message: 'No token provided.' });
        }
    } else {
        return res.status(401).json({ success: false, error: true, data: Array(), message: 'No token provided.' });
    }
}

module.exports = checkJwtAuthentication;