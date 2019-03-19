const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const licenseKey = fs
  .readFileSync("./config/license-key")
  .toString()
  .replace(/\s/g, "");

if (licenseKey === "") {
  console.log(
    `
Invalid or missing license key. Please save your license key to "${path.resolve(
      "./config/license-key"
    )}

If you are a customer you can find your license key in the customers portal https://customers.pspdfkit.com
otherwise if you are using an evaluation license you can find the license key at https://pspdfkit.com/guides/web/current/standalone/integration/#toc_example-application`
  );
  process.exit(1);
}

const filesToCopy = [
  // PSPDFKit files.
  {
    from: "./node_modules/pspdfkit/dist/pspdfkit-lib",
    to: "./pspdfkit-lib"
  },
  // Application CSS.
  {
    from: "./src/index.css",
    to: "./index.css"
  }
];

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"]
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyWebpackPlugin(filesToCopy),

    new webpack.DefinePlugin({
      // For convenience we define the license key as an environment variable.
      "process.env": {
        PSPDFKIT_LICENSE_KEY: `"${licenseKey}"`
      }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Creates a `vendor.js` bundle which contains external libraries (including pspdfkit.js).
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  }
};

