const firebase = require('firebase');
const jwt = require('jwt-simple');

const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.uid, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
  const auth = firebase.auth();
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'It must provide email and password'});
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function(user){
      console.log(`User ${user.email} sign in`);
      res.send({ token: tokenForUser(user) });
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/wrong-password':
          return res.status(422).send({ error: 'The password is invalid or the user does not have a password.'});
          break;
        case 'auth/user-not-found':
          return res.status(422).send({ error: 'The email or password is not valid'});
          break;
        default:
          console.log(`Error ${errorCode} para el email: ${email}`);
          res.send(error);
          break;
      }
    });
}

exports.signout = function(req, res, next) {
  const auth = firebase.auth();
  const user = auth.currentUser;

  auth.signOut()
    .then(function() {
      console.log(`User ${user !== null ? user.email : ''} sign out`);
      res.json({ success: 'User signed out' });
    })
    .catch(function(error) {
      console.log(`Error in signOut ${error}`);
      res.send(error);
    });
}

exports.signup = function(req, res, next){
  const auth = firebase.auth();
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'It must provide email and password'});
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log(`New user created ${user.email}`);
      res.json({ success: tokenForUser(user) });
    })
    .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          return res.status(422).send({ error: 'Email is in use'});
          break;
        case 'auth/invalid-email':
          return res.status(422).send({ error: 'The email address is not valid.'});
          break;
        case 'auth/operation-not-allowed':
          return res.status(422).send({ error: 'email/password accounts are not enabled.'});
          break;
        case 'auth/weak-password':
          return res.status(422).send({ error: 'Password should be at least 6 characters'});
          break;
        default:
          res.send(error);
          break;
      }
    });
}
