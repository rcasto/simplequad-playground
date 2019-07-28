var path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    // Change to your "entry-point".
    entry: './src/animation',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.worker\.(ts|js)x?$/,
            use: [{ 
                loader: 'worker-loader',
                options: {
                    name: 'quad.worker.js'
                }
            }, {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }, {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    }
};