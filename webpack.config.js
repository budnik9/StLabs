const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const extractLess = new MiniCssExtractPlugin({
    filename: "[name].[hash].css",
    disable: NODE_ENV === "development",
});

module.exports = {
    mode: NODE_ENV,
    entry: "./src/app.js",
    output: {
        path: `${__dirname}/dist`,
        filename: "bundle.js",
    },

    devtool: NODE_ENV === "development" ? "cheap-inline-module-source-map" : "source-map",

    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
        // new webpack.HotModuleReplacementPlugin(),
        extractLess,
    ],

    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: true,
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env", {
                                targets: {
                                    browsers: "> 5%", // adaptation for browsers with a share of more than 5%
                                },
                            }],
                        ],
                    },
                },
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    NODE_ENV === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "./images/[name].[ext]",
                        },
                    },
                    {
                        loader: "url-loader",
                        options: {
                            name: "./images/[name].[ext]",
                            limit: 10000,
                        },
                    },
                ],
            },
        ],
    },

    resolve: { // rules for loading modules
        modules: ["node_modules"],
        extensions: [".js"],
    },

    resolveLoader: { // rules for loading loaders
        modules: ["node_modules"],
        extensions: [".js"],
    },

    devServer: {
        hot: true,
    },
};


if (NODE_ENV === "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
        }),
    );
}
