import { rspack } from '@rspack/core'

export const linariaJsLoader = (isDevelopment: boolean) => ({
  loader: '@wyw-in-js/webpack-loader',
  options: {
    sourceMap: isDevelopment,
    displayName: isDevelopment,
    /** Для того, чтобы на даблклик можно было выделить название компонента отдельно от hash */
    classNameSlug: isDevelopment
      ? (hash: string, title: string) => `${title}-${hash}`
      : undefined,
  },
})

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
