// =============
// Dependencies.
// =============

const HtmlWebPackPlugin =
  require('html-webpack-plugin')

const MiniCssExtractPlugin =
  require('mini-css-extract-plugin')

const path = require('path')

// ========
// Plugins.
// ========

const plugins = [
  // CSS.
  new MiniCssExtractPlugin({
    filename: '[name].css'
  }),

  // HTML.
  new HtmlWebPackPlugin({
    template: './source/demo.html',
    filename: './index.html',
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeCDATASectionsFromCDATA: true,
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }
  })
]

// ======
// Rules.
// ======

const cssRuleForDev = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader'
  ]
}

const cssRuleForProd = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
  ]
}

const jsRule = {
  test: /\.js$/,
  use: 'babel-loader'
}

// ==================
// Split "vendor" JS.
// ==================

const optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        chunks: 'all',
        enforce: true,
        name: 'vendor',
        test: /node_modules/
      }
    }
  }
}

// ====================
// Entry: Source files.
// ====================

const entry = {
  /*
    NOTE:

    - Demo is not used for distribution.

    - Index is not used for local demo.

    It is easier from a config standpoint
    to just keep them in the same `entry`.
  */
  demo: './source/demo.js',
  index: './source/index.js'
}

// ====================
// Output: Build files.
// ====================

const output = {
  path: path.join(__dirname, 'build'),
  filename: '[name].js'
}

// =======
// Config.
// =======

const config = {
  // Shared.
  entry,
  optimization,
  output,
  plugins,

  // Rules.
  module: {
    rules: [
      jsRule
    ]
  }
}

// =======
// Export.
// =======

module.exports = (env, args = {}) => {
  // Get rules.
  const rules = config.module.rules

  // Production?
  if (args.mode === 'production') {
    rules.push(cssRuleForProd)
  } else {
    rules.push(cssRuleForDev)
  }

  // Expose object.
  return config
}
