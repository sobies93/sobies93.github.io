const path = require('path');

const public_dist = path.resolve(__dirname, '../dist/public');

module.exports = {
    devServer: {
      compress: true,
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    // output: {
    //     path: public_dist,
    // },
};
