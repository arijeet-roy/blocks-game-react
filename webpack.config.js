var config = {
   entry: './index.js',
   output: {
      path:'/',
      filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 8081
   },
	
   module: {
      loaders: [
         {
            test: /.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['react', 'es2015', 'stage-1']
            }
         }
      ]
   }
}

module.exports = config;