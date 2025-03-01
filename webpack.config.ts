/* eslint-disable no-undef */
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import * as dotenv from 'dotenv'
import fs from 'fs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { Configuration, DefinePlugin, ProvidePlugin } from 'webpack'
import 'webpack-dev-server'

// Load environment variables from .env
dotenv.config()
const isDevelopment = process.env.NODE_ENV !== 'production'
const isHttpsMode = process.env.HTTPS === 'true'

export const linariaCssLoaderRules = (isDevelopment: boolean) =>
  isDevelopment
    ? {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      }
    : {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: false },
          },
        ],
      }

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/Index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: isDevelopment ? '/' : process.env.PUBLIC_PATH,
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: '@wyw-in-js/webpack-loader',
            options: {
              sourceMap: isDevelopment,
              displayName: isDevelopment,
              /** Для того, чтобы на даблклик можно было выделить название компонента отдельно от hash */
              classNameSlug: isDevelopment
                ? (hash: string, title: string) => `${title}-${hash}`
                : undefined,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i, // Rule for image files including .webp
        type: 'asset/resource', // Webpack 5 built-in asset module
      },
      linariaCssLoaderRules(isDevelopment),
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      url: require.resolve('url/'), // Polyfill for the Node.js 'url' module
      buffer: require.resolve('buffer/'), // Add Buffer polyfill
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[name].styles.css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    // ProvidePlugin for Buffer polyfill
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // Ensures Buffer is globally available
    }),
    // DefinePlugin to inject environment variables properly into browser code
    new DefinePlugin({
      'process.env': JSON.stringify(process.env), // Inject all process.env variables
    }),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true, // For React Router
    client: {
      overlay: true,
    },
    // ЕСЛИ НУЖНО ЗАПУСТИТЬ ПО HTTPS ДЛЯ TELEGRAM MINI APP
    ...(isHttpsMode
      ? {
          port: 443, // Set the port to 443
          https: {
            key: fs.readFileSync(
              path.resolve(__dirname, '.cert/localhost-key.pem'),
            ), // Your key path
            cert: fs.readFileSync(
              path.resolve(__dirname, '.cert/localhost.pem'),
            ), // Your cert path
          },
          allowedHosts: 'all', // Allow all hosts, including ngrok
          headers: {
            'Access-Control-Allow-Origin': '*', // To allow ngrok access
          },
        }
      : {
          port: 8001,
        }),
  },
}

export default config
