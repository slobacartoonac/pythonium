/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',
    watchOptions: {
        ignored: '**/node_modules',
    },
    devServer: {
        port: 8080,
        hot: true,
        client: {
            reconnect: true,
            overlay: {
                errors: true,
                warnings: false
            }
        },
    },
});