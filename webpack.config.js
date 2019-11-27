const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  app: path.join(__dirname, "./app"),
  public: path.join(__dirname, "./public_html"),
  static: path.join(__dirname, "./app/static")
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.app
  },
  output: {
    filename: "js/[name].js",
    path: PATHS.public,
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
                require("postcss-focus"),
                require("webpack-merge")
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.static}/index.html`,
      filename: "./index.html"
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.static}/img`, to: `${PATHS.public}/img` }
    ])
  ]
};
