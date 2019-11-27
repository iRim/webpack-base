const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./app/index.js"
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "./public_html"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.scss|.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("autoprefixer"),
                require("cssnano")({
                  preset: "default"
                }),
                require("css-mqpacker"),
                require("postcss-flexbugs-fixes"),
                require("postcss-animation"),
                require("postcss-focus")
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
      // chunkFilename: "[name].[id].css"
    })
  ]
};
