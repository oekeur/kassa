// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');

// new WebpackDevServer(webpack(config), {
//   contentBase: './dist',
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true,
//   stats: {
//     colors: true,
//     hash: false,
//     version: false,
//     timings: false,
//     assets: false,
//     chunks: false,
//     modules: false,
//     reasons: false,
//     children: false,
//     source: false,
//     errors: false,
//     errorDetails: false,
//     warnings: false,
//     publicPath: false
//   }
// }).listen(3000, 'localhost', function(err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Listening at localhost:3000');
// });



var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    contentBase: './dist',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
}).listen(3000, '192.168.1.133', function (err) {
    if (err) {
        console.log(err);
    }

  console.log('Listening at localhost:3000');
});




// var http = require('http');
// var express = require('express');
// var app = express();

// app.use(require('morgan')('short'));

// // ************************************
// // This is the real meat of the example
// // ************************************
// (function() {

//   // Step 1: Create & configure a webpack compiler
//   var webpack = require('webpack');
//   var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
//   var compiler = webpack(webpackConfig);

//   // Step 2: Attach the dev middleware to the compiler & the server
//   app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true, publicPath: webpackConfig.output.publicPath
//   }));

//   // Step 3: Attach the hot middleware to the compiler & the server
//   app.use(require("webpack-hot-middleware")(compiler, {
//     log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
//   }));
// })();

// // Do anything you like with the rest of your express application.

// // app.get("/*", function(req, res) {
// //   res.sendFile(__dirname + '/index.html');
// // });
// app.get("/multientry", function(req, res) {
//   res.sendFile(__dirname + '/index-multientry.html');
// });

// if (require.main === module) {
//   var server = http.createServer(app);
//   server.listen(process.env.PORT || 3000, function() {
//     console.log("Listening on %j", server.address());
//   });
// }
