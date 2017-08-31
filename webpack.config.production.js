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
    // new webpack.DefinePlugin({
    //   'DEVELOPMENT': JSON.stringify(process.env.NODE_ENV === 'development')
    // }),
    new webpack.DefinePlugin({
      'FORM_SUBMISSION_API_URL': JSON.stringify(process.env.FORM_SUBMISSION_API_URL)
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]
};