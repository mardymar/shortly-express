const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //console.log(req.cookes);

  if (JSON.stringify(req.cookies) === '{}') {
    //console.log('in create cookies')
    models.Sessions.create()
      .then( (packet) => {
        return models.Sessions.get({ id: packet.insertId });
      })
      .then( (session) => {
        req.session = session;
        res.cookie('shortlyid', session.hash);
        next();
      })
    .catch( (err) => {
      console.log(err);
    });
  } else {
    //console.log(req.cookies.shortlyid);
    var obj = {};
    obj['hash'] = req.cookies.shortlyid;
    models.Sessions.get(obj)
    .then((session) => {


      if (session){
        req.session = session;
        next();
      } else {
        models.Sessions.create()
          .then( (packet) => {
            return models.Sessions.get({ id: packet.insertId });
          })
          .then( (newSession) => {
            console.log(newSession, 'new session');
            req.session = newSession;
            res.cookie('shortlyid', newSession.hash);
            next();
          })
          .catch( (err) => {
            console.log(err);
          });
      }
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }
};