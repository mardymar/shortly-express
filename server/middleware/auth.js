const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //console.log(req.cookes);


  if(JSON.stringify(req.cookies) === '{}') {
    //console.log(req);
    models.Sessions.create()
    .then( (packet) => {
      return models.Users.get( { id: packet.insertId } );
    })
    .then( (session) => {
      console.log(session)
      //req.session = session;
      //res.cookie('shortlyid', session.hash);
      //next();
    })
    .catch( (err) => {
     console.error('ERROR creating session in Sessions model: ', err);
    });
  }

  console.log(req.body, 'Create Session');

  next();

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

