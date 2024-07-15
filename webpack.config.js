module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
    },
  ],
}
