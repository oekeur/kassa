var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  node: {
    fs: 'empty',
    tls: 'empty'
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    // 'webpack-hot-middleware/client',
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
      title: 'Wolbodo kassa',
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
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css?sourceMap&modules&localIdentName=[name]-[local]---[hash:base64:5]&importLoaders=1!postcss'
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
