module.exports = function override(config, env) {
  if (env === "production") {
    config.output.filename = "static/js/[name].js";
    config.output.chunkFilename = "static/js/[name].chunk.js";
  }
  
  // Modify CSS filenames
  const cssPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
  );

  if (cssPlugin) {
    cssPlugin.options.filename = "static/css/[name].css";
    cssPlugin.options.chunkFilename = "static/css/[name].chunk.css";
  }

  return config;
};