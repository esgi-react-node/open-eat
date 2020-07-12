const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = ({NODE_ENV}) => ({
    mode: NODE_ENV,
    entry: ['@babel/polyfill', './js/app.js'],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./index.html", inject: "body" }),
        new CopyPlugin({
            patterns: [
                { from: 'static', to: '' }
            ]
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                tailwindcss({
                                    purge: {
                                        enabled: NODE_ENV === "production",
                                        content: [
                                            './index.html',
                                            './js/**/*.js'
                                        ]
                                    },
                                    theme: {},
                                    variants: {},
                                    plugins: [],
                                }),
                                autoprefixer(),
                                NODE_ENV === "production" && cssnano()
                            ].filter(Boolean),
                        },
                        
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g)$/,
                loader: 'file-loader'
            }
        ],
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true,
        contentBase: './build',
        writeToDisk: true
    }
});
