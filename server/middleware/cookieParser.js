const parseCookies = (req, res, next) => {
  //console.log(typeof(req.headers.cookie), 'cookies');
  var obj = {};

  if(req.headers.cookie){

    var cookies = req.headers.cookie.split('; ');

    for(var i = 0; i < cookies.length; i++){
      var cookiePair = cookies[i].split('=');
      obj[cookiePair[0]] = cookiePair[1];
    }
  }

  req.cookies = obj;
  next();
};

module.exports = parseCookies;