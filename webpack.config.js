/**
 * Created by kevin gosse on 05/02/2016.
 */

var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: './js/app.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['./babelRelayPlugin']
                }
            }
        ]
    }
};
