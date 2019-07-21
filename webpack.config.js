const nodeExternals = require('webpack-node-externals')

const common = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@material-ui/core': '@material-ui/core/es'
    }
  }

}
module.exports = [
  {
    ...common,
    entry: './src/client',
    output: {
      path: `${__dirname}/public`
    }
  },

  {
    ...common,
    target: 'node',
    entry: './src/server',
    externals: [nodeExternals({
      whitelist: [
        /@material-ui\/core\/*./
      ]
    })]
  }
]
