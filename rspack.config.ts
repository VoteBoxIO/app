import {
  Configuration,
  DefinePlugin,
  ProvidePlugin,
  rspack,
} from '@rspack/core'
import ReactRefreshRspackPlugin from '@rspack/plugin-react-refresh'
import * as dotenv from 'dotenv'
import fs from 'fs'
import HtmlRspackPlugin from 'html-webpack-plugin'
import path, { format } from 'path'

// Load environment variables
dotenv.config()
const isDevelopment = process.env.NODE_ENV !== 'production'
const isHttpsMode = process.env.HTTPS === 'true'
const PUBLIC_PATH = '/app'

export const formatDateTime = (date: Date = new Date()): string => {
  return date.toLocaleString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export const linariaCssLoaderRules = (isDevelopment: boolean) =>
  isDevelopment
    ? {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          rspack.CssExtractRspackPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      }
    : {
        test: /\.css$/,
        use: [
          rspack.CssExtractRspackPlugin.loader,
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
    publicPath: isDevelopment ? '/' : `${PUBLIC_PATH}/`,
  },
  devtool: isDevelopment ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
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
        type: 'asset/resource', // Rspack handles assets the same way
      },
      linariaCssLoaderRules(isDevelopment),
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
    new HtmlRspackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
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
      'process.env.RELEASE_DATE': JSON.stringify(formatDateTime()),
      ...(!isDevelopment && {
        'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
      }),
    }),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true, // Support for React Router
    client: {
      overlay: false,
    },
    ...(isHttpsMode
      ? {
          server: {
            type: 'https',
            options: {
              key: fs.readFileSync(
                path.resolve(__dirname, '.cert/localhost-key.pem'),
              ),
              cert: fs.readFileSync(
                path.resolve(__dirname, '.cert/localhost.pem'),
              ),
            },
          },
          port: 443,
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
