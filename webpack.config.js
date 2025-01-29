const path = require("path");

module.exports = {
  entry: "./download-sdk.js", // Path to your script
  output: {
    filename: "bundle.js", // Output bundled file
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  target: "node", // Target Node.js environment
  mode: "production", // Optimize for production
};
