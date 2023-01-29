/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    watchOptions: {
        poll: 1000,
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
};