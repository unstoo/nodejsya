const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [    
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundeled_client'),
    // necessary for HMR to know where to load the hot update chunks.
    publicPath: '/static/',
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  devServer: {
    hot: true,
    compress: true,
    port: 3000,   
    // to serve static files.
    // contentBase: path.join(__dirname, 'client'),    
    // The bundled files will be available in the browser under this path
    // publicPath: '/static/',
    // stats: 'errors-only'
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],

  module: {
    rules: 
    [      
      { 
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { 
          presets: [ 
            ["es2015", {"modules": false}],  
            "react"  
          ],          
          plugins: ['react-hot-loader/babel']
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
              localIdentName: '[name]-[local]-[hash:base64:5]'
            }
          }
        ]
      }
    ]    
  }
}