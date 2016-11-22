var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  node: {
    fs: 'empty',
    tls: 'empty'
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    "react-hot-loader/patch", // make sure the HMR package is included
    './src/index.js'
  ],
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Horizon React Boilerplate',
      template: './index_template.ejs',
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.ContextReplacementPlugin(/bindings$/, /^$/),
    new webpack.HotModuleReplacementPlugin(),
  ],
  externals: ['bindings'],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader/webpack', 'babel']
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css?sourceMap&modules&importLoaders=1!postcss'
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?name=images/[name].[ext]&limit=8192'
      },
      {
        test: /\.yml$/,
        loader: 'yml'
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, '..', 'src'),
    extensions: ['', '.js', '.jsx', '.json', '.css', '.png', '.jpg', '.jpeg', '.gif']
  },
  postcss: function () {
    return [
      require('postcss-smart-import'),
      require('precss'),
      require('autoprefixer')
    ];
  }
};
