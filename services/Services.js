const firebase = require('firebase');

module.exports = {
  requireSignIn: function (req, res, next) {
    const user = firebase.auth().onAuthStateChanged(function(user){
      if (user){
        req.user = user;
        console.log(`Usuario signed in ${user.email}`);
        next();
      } else {
        console.log('User is not signin');
        res.send({ status: 'User is not signin' });
      }
    });
  }
}
