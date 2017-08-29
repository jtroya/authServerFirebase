const Authentication = require('./controllers/authentication');
const Services = require('./services/Services');

module.exports = (app) => {
  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);
  app.post('/signout', Authentication.signout);

  app.get('/private', Services.requireSignIn, function(req, res ){
    res.send(res.user);
  });
}
