
var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
    username: {
      type: 'string',
      required: 'true',
      unique: true // Yes unique one
    },

    password: {
      type: 'string'
    },

    name: {
      type: 'string'
    },

    email: {
      type: 'email',
      required: 'true',
      unique: true // Yes unique one
    },


    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },

  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },

  comparePassword : function (password, user, cb) {
      if (password == user.password) {
          cb(null, true);
      } else {
          cb('No User Found', false);
        }
    }
};
