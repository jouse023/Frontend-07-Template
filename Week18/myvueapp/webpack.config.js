const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack"); //to access built-in plugins

module.exports = {
  entry: "./src/main.js",
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'my-first-webpack.bundle.js',
  // },
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/*.html", to: "[name].[ext]" }],
    }),
  ],
};
