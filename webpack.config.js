const path = require('path');
// to run webpack dev server, need this plugin for the index.html file
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//**** WE HAD TO GO BACK A VERSION FOR WEBPACK DEV SERVER TO 4.0.0

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: './client/index.js'
    },
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
      rules:[
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
          }
        }, 
        {
            test: /\.scss?/,
            use: [
              // for mini-css-extract plugin
              // MiniCssExtractPlugin.loader, 
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader"
            ]
        }
      ]
    },
    devServer: {
        static: {
          publicPath: '/',
          directory: path.join(__dirname, 'build'),
        },
        compress: true,
        hot: true, // enables hot reloading
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        // new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
         title: 'development',
         template: 'client/index.html'
        })
    ],
};
