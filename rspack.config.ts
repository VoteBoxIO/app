import ReactRefreshRspackPlugin from '@rspack/plugin-react-refresh'
import * as dotenv from 'dotenv'
import fs from 'fs'
import HtmlRspackPlugin from 'html-webpack-plugin'
import { rspack } from '@rspack/core'
import path from 'path'
import { Configuration, DefinePlugin, ProvidePlugin } from '@rspack/core'
import { linariaCssLoaderRules, linariaJsLoader } from './webpack/linaria'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// Load environment variables
dotenv.config()
const isDevelopment = process.env.NODE_ENV !== 'production'
const isHttpsMode = process.env.HTTPS === 'true'

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/Index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: isDevelopment ? '/' : process.env.WEBPACK_PUBLIC_PATH,
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, ...linariaJsLoader(isDevelopment)],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i, // Rule for image files including .webp
        type: 'asset/resource', // Rspack handles assets the same way
      },
      ...linariaCssLoaderRules(isDevelopment),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      url: require.resolve('url/'),
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    new HtmlRspackPlugin({ template: './public/index.html' }),
    new rspack.CssExtractRspackPlugin({
      filename: 'styles.css',
      chunkFilename: '[name].styles.css',
    }),
    isDevelopment && new ReactRefreshRspackPlugin(),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true, // Support for React Router
    client: {
      overlay: true,
    },
    ...(isHttpsMode
      ? {
          port: 443,
          https: {
            key: fs.readFileSync(
              path.resolve(__dirname, '.cert/localhost-key.pem'),
            ),
            cert: fs.readFileSync(
              path.resolve(__dirname, '.cert/localhost.pem'),
            ),
          },
          allowedHosts: 'all',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      : {
          port: 8001,
        }),
  },
}

export default config
