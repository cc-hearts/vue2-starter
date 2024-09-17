const rspack = require('@rspack/core');
const { VueLoaderPlugin } = require('vue-loader');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: './src/index.ts',
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: false,
  plugins: [
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.vue', '.ts', '...'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  experiments: {
    css: false,
  },
};
module.exports = config;