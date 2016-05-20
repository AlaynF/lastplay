/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
    var token;

    if (req.session.userId) {
        //IS A VALID USER
        next();
    } else {
        // SEND TO LOGIN PAGE
        res.redirect('/login');
        return;
    }
    
    return;
};
