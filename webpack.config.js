const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

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
    filename: "js/[name].[hash].js",
    path: PATHS.public,
    publicPath: "/"
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.js"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.vue$/i,
        loader: "vue-loader",
        options: {
          loader: {
            scss: "vue-style-loader!css-loader!sass-loader"
          }
        }
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
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.static}/index.html`,
      filename: "./index.html"
      // inject: false
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.static}/img`, to: `${PATHS.public}/img` },
      { from: `${PATHS.static}/favicon.ico`, to: `${PATHS.public}` }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
};
