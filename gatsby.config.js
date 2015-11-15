module.exports = function(config) {
console.log('config', config)
config.removeLoader('css');
config.loader('css', function(cfg) {
    cfg.test = /\.cssm$/;
    cfg.loader = 'style!css?modules'
    return cfg
  }, function(cfg) {
  return cfg;
  })
  console.log('END MODIFICATION');
  console.log(config.resolve().module.loaders);
  return config;
}
