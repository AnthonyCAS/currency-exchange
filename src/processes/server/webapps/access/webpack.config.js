var webpack = require('webpack');
var path = require('path');
var fs = require('fs-extra');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackOnBuildPlugin = require('on-build-webpack');
var WebpackPreBuildPlugin = require('pre-build-webpack');

// Webpack Config
var webpackConfig = {
  entry: {
    'main': './src/main.browser.ts',
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src'),
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    // Before build
    new WebpackPreBuildPlugin(function(stats) {
      if (process.env.NODE_ENV == 'serve') return;
      if (__dirname.match(/\.common/)) return;
      // Copy shared resources
      var sharedPath = path.join(__dirname, 'src/app/shared')
      var globalSharedPath = path.join(__dirname, '../../../../shared/webapps/common/src/app/shared');

      var sharedExists = fs.existsSync(sharedPath);
      if (sharedExists) {
        fs.removeSync(sharedPath);
      }
      fs.copySync(globalSharedPath, sharedPath);

      var sharedAssetsPath = path.join(__dirname, 'src/shared-assets')
      var globalSharedAssetsPath = path.join(__dirname, '../../../../shared/webapps/common/src/shared-assets');
      var sharedAssetsExists = fs.existsSync(sharedAssetsPath);
      if (sharedAssetsExists) {
        fs.removeSync(sharedAssetsPath);
      }
      fs.copySync(globalSharedAssetsPath, sharedAssetsPath);
    }),

    // After Build
    new WebpackOnBuildPlugin(function(stats) {
      if (process.env.NODE_ENV == 'serve') return;
      if (__dirname.match(/\.common/)) return;
      // Copy all assets to dist folder
      fs.copySync('src/assets', 'dist/assets');
      fs.copySync('src/shared-assets', 'dist/shared-assets');
      fs.copySync('src/favicon.ico', 'dist/favicon.ico');
    }),

  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.pug$/, loader: 'pug-loader' },
      { test: /\.styl$/, loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/' }
    ]
  }

};


// Our Webpack Defaults
var defaultConfig = {
  // devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    // sourceMapFilename: '[name].map',
    // chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ path.resolve(__dirname, 'node_modules') ]
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
