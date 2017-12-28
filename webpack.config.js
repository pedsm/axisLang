module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'axis.js',
        path: `${__dirname}/bin`,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
}