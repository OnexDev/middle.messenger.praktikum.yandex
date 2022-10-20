// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: {
      main: "./src/index.ts"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
  },

  devServer: {
    open: true,
    port: 3000,
    host: "localhost",
      historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
          test: /\.hbs|handlebars$/,
          loader: "handlebars-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
            MiniCssExtractPlugin.loader,
            // 'style-loader',
            {
                loader: "css-loader",
                options: {
                    modules: true, importLoaders: 2
                }
            },
            "postcss-loader",
            {
                loader: "sass-loader",
                options: {
                    sassOptions: {
                        outputStyle: "compressed",
                    },
                }
            }
        ],
      },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", '...'],
    alias:{
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
