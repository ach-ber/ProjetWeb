const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
});

// rajouté deb
const path = require("path");

module.exports = {
 outputDir: path.resolve(__dirname, "../public")
}

// rajouté fin