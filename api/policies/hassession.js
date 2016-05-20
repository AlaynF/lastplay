

module.exports = function (req, res, next) {
    var token;

    if (req.session.userId) {
        res.redirect('/home')
    } else {
        // SEND TO LOGIN PAGE
        next();
    }

    return;
};
