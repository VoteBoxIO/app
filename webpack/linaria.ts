import { rspack } from '@rspack/core'

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
