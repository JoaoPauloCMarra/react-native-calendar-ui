const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);
const workspaceRoot = path.resolve(__dirname, "..");

// 1. Watch the workspace root so we can resolve packages there
config.watchFolders = [...(config.watchFolders || []), workspaceRoot];

// 2. Resolve node_modules from the project first, then the workspace
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Force invalid duplicates to be excluded
// To avoid needing 'metro-config' exports which can be tricky to import, we manually merge the blacklist
const defaultBlacklist = config.resolver.blacklistRE || /(?!)/;
const newExclusions = [
  /\/packages\/react-native-calendar-ui\/node_modules\/react\/.*/,
  /\/packages\/react-native-calendar-ui\/node_modules\/react-native\/.*/,
];

config.resolver.blacklistRE = new RegExp(
  "(" +
    defaultBlacklist.source +
    ")|(" +
    newExclusions.map((r) => r.source).join("|") +
    ")"
);

// 4. Force resolution of critical dependencies to the example app's node_modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  react: path.resolve(__dirname, "node_modules/react"),
  "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
  "react-native": path.resolve(__dirname, "node_modules/react-native"),
};

module.exports = config;
