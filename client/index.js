// index.js

module.exports.controller = function(app) {

/**
 * a home page route
 */
  app.get('/', function(req, res) {
      // any logic goes here
      res.send('over here now!')
  });


}
