const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");

module.exports = {
    mode: NODE_ENV,
    entry: "./app.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },

    devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : "source-map",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["env", {
                                targets: {
                                    browsers: "> 5%"     // adaptation for browsers with a share of more than 5%
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    },

    resolve: {                                       // rules for loading modules
        modules: ["node_modules"],
        extensions: [".js"]
    },

    resolveLoader: {                                // rules for loading loaders
        modules: ["node_modules"],
        extensions: [".js"]
    }
};


if(NODE_ENV == "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        })
    );
}