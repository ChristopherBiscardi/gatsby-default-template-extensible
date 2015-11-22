var ExtractTextPlugin = require("extract-text-webpack-plugin");

function configureDevelopment(config) {
  config.removeLoader('css');
  config.loader('css', function(cfg) {
    cfg.test = /\.css$/;
    cfg.loader = 'style!css?modules!postcss'
    return cfg
  })
  config.merge({
    postcss: [
      require('postcss-import')(),
      require('postcss-cssnext')({
        browsers: 'last 2 versions'
      })
    ]
  })
}

function configureForJSBundle(config) {
  config.removeLoader('css');
  config.loader('css', function(cfg) {
    cfg.test = /\.css$/;
    cfg.loader = 'css/locals?modules!postcss'
    return cfg
  })
}

function configureForHTMLGeneration(config) {

  config.removeLoader('css');
  config.loader('css', function(cfg) {
    cfg.test = /\.css$/;
    cfg.loader = ExtractTextPlugin.extract('style', 'css?modules&minimize!postcss');
    return cfg
  })
  config.plugin('extract-css',
                ExtractTextPlugin,
                ["styles.css"]);
  config.merge({
    postcss: [
      require('postcss-import')(),
      require('postcss-cssnext')({
        browsers: 'last 2 versions'
      })
    ]
  })
}

module.exports = function(config, env) {

  switch(env) {
    case 'production':
      configureForJSBundle(config);
    break;
    case 'static':
      configureForHTMLGeneration(config);
    break;
    default:
      configureDevelopment(config);
    break;
  }

  return config;
}
