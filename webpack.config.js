const path=require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports= {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: './main.js',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },

    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                  loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                      modules: true
                    }
                  }
                ]
              },
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
              },
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin({debug: true}),
        new webpack.HotModuleReplacementPlugin(),
      ],
    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        open: true,
        port: 9000,
        watchContentBase: true,
        progress: true
      },

}