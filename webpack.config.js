const path = require('path');

module.exports = {
  entry: './src/index.js',
  
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};