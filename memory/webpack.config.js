const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
      compress: true,
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public' }
            ]
        })
    ]
   
};
