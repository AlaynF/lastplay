

module.exports = function (req, res, next) {
    var token = req.query.token;

    if (!token) {
        res.redirect('/login')
    } else {
        // SEND TO LOGIN PAGE
        next();
    }

    return;
};
