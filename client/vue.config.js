module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 1337,
        https: false,
        hotOnly: false,
    },
}