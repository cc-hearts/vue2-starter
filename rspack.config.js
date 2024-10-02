const rspack = require('@rspack/core')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

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
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src'),
    },
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
}
module.exports = config
