const path = require('path')

module.exports  = {
  mode: 'development',
  entry: './frontend/index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    port: 8080
  },
  output: {
    path: path.resolve(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      { 
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  }
}