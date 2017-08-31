var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, ''),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      { 
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { 
          presets: [ 
            ["es2015", {"modules": false}], "react" ]          
         }
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]
};