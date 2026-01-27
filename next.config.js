const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      components: path.resolve(__dirname, "src/components"),
      ui: path.resolve(__dirname, "src/ui"),
      styles: path.resolve(__dirname, "src/styles"),
      helpers: path.resolve(__dirname, "src/helpers"),
      icons: path.resolve(__dirname, "src/icons"),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@": "./src",
    },
  },
};
