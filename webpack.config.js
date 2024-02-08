const HtmlWebpackPlugin = require('html-webpack-plugin');

const LOADERS = [
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  },
];

const PLUGINS = [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
];

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.css','.tsx', '.ts', '.js']
  },
  module: {
    rules: LOADERS,
  },
  plugins: PLUGINS,
  devServer: {
    port: 3001,
    historyApiFallback: true,
  }
}
