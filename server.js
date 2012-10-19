var CONFIG = {
  "PORT" : 3000
};

var express = require('express'),
 	cluster = require('cluster'),
 	cons = require('consolidate'),
 	util = require( 'util' );

var app = express(),
	logger = console;
app.engine('dust', cons.dust);
// all environments
app.configure(function(){
  app.set('title', 'My Application');
});


app.configure('development', function(){
    var oneYear = 31557600000;
    //app.use(express.logger());
    //app.use(express.static(__dirname + '/public'));
    app.set('view engine', 'dust');
    app.set('views', __dirname + '/views');
    app.use('/static', express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    //app.use(express.session({cookie: {path: '/', httpOnly: true, expires: new Date(Date.now() + 315360000000)}, secret: process.env.SESSION_SECRET || 'secret123hello', store: new RedisStore({"port": 6279}) }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  //app.use(express.logger());
  //app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/views');
  app.use('/static', express.static(__dirname + '/public'));
  app.use(express.errorHandler());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  //app.use(express.session({cookie: {path: '/', httpOnly: true, expires: new Date(Date.now() + 315360000000)}, secret: process.env.SESSION_SECRET || 'secret123hello', store: new RedisStore({"port": 6279}) }));
});


app.listen(CONFIG.PORT, function() {
  logger.info("Listening on" , {'port': CONFIG.PORT});
  logger.info("start time is", new Date().toString());
});


//----------------- catch exit signals and do some cleanup ----------

process.on('SIGINT', function () {
    logger.info('server.js Got SIGINT, exiting...');
    // do some cleanup here...
    process.exit(0);
});
process.on('SIGTERM', function () {
    logger.info('server.js Got SIGTERM, exiting...');
    // do some cleanup here...
    process.exit(0);
});

//--------------

app.get("/", function(req, res){
	res.render('index', {
    title: 'Testing out dust.js server-side rendering'
  });
});
