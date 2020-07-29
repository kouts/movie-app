const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/scss/styles.scss')]
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/variables.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'MovieApp';
      args[0].meta = { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' };
      args[0].meta = { description: 'A single page application that displays movies using the Movie Database API as it\'s source.' };
      return args;
    });
  }
};
