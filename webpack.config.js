// bundles all packages and libraries in index.js into a single file

const path = require('path'); //require path module

module.exports = {
  mode: 'development', //later change to 'production' mode
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //output file put in this path
    filename: 'bundle.js',
  },
};
