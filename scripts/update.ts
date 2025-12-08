#!/usr/bin/env bun
import { $ } from "bun";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT_DIR = join(import.meta.dir, "..");
const PACKAGE_DIR = join(ROOT_DIR, "packages/react-native-calendar-ui");
const EXAMPLE_DIR = join(ROOT_DIR, "example");

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  overrides?: Record<string, string>;
  [key: string]: any;
}

function readPackageJson(dir: string): PackageJson {
  const path = join(dir, "package.json");
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writePackageJson(dir: string, pkg: PackageJson): void {
  const path = join(dir, "package.json");
  writeFileSync(path, JSON.stringify(pkg, null, 2) + "\n");
}

async function main() {
  console.log("🔄 Starting dependency update...\n");

  // Step 1: Update example with Expo's recommended versions
  console.log("📦 Updating example dependencies with Expo recommendations...");

  // First check what needs updating
  console.log("\n🔍 Checking for updates...");
  try {
    await $`bun expo install --check`.cwd(EXAMPLE_DIR);
  } catch (error) {
    // expo install --check exits with 1 if there are updates, which is expected
  }

  // Then apply the fixes
  console.log("\n📥 Installing Expo-recommended versions...");
  await $`bun expo install --fix`.cwd(EXAMPLE_DIR);

  // Step 2: Read the example's final versions AFTER expo install --fix
  const examplePkg = readPackageJson(EXAMPLE_DIR);
  const reactVersion = examplePkg.dependencies?.react || "19.1.0";
  const reactNativeVersion =
    examplePkg.dependencies?.["react-native"] || "0.81.5";
  const reactDomVersion = examplePkg.dependencies?.["react-dom"] || "19.1.0";

  console.log(
    `\n✅ Example using: React ${reactVersion}, React Native ${reactNativeVersion}`
  );

  // Step 3: Sync versions to package devDependencies
  console.log("\n🔄 Syncing versions to package...");
  const packagePkg = readPackageJson(PACKAGE_DIR);

  if (packagePkg.devDependencies) {
    packagePkg.devDependencies.react = reactVersion;
    packagePkg.devDependencies["react-native"] = reactNativeVersion;
  }

  packagePkg.overrides = {
    react: reactVersion,
    "react-native": reactNativeVersion,
  };

  writePackageJson(PACKAGE_DIR, packagePkg);

  // Step 4: Update example overrides
  examplePkg.overrides = {
    react: reactVersion,
    "react-native": reactNativeVersion,
  };

  writePackageJson(EXAMPLE_DIR, examplePkg);

  // Step 5: Update root overrides
  const rootPkg = readPackageJson(ROOT_DIR);
  rootPkg.overrides = {
    react: reactVersion,
    "react-native": reactNativeVersion,
  };

  writePackageJson(ROOT_DIR, rootPkg);

  // Step 6: Install from root
  console.log("\n📦 Installing from root...");
  await $`bun install`.cwd(ROOT_DIR);

  // Step 7: Final validation
  console.log("\n🏥 Final validation...");
  try {
    await $`bunx expo-doctor@latest`.cwd(EXAMPLE_DIR);
    console.log("\n✅ All expo-doctor checks passed!");
  } catch (error) {
    console.log("\n⚠️  Some expo-doctor checks failed, but continuing...");
  }

  console.log("\n🎉 Update complete!");
  console.log(`\n📊 All workspaces using:`);
  console.log(`   React: ${reactVersion}`);
  console.log(`   React Native: ${reactNativeVersion}`);
  console.log(`   React DOM: ${reactDomVersion}`);
}

main().catch((error) => {
  console.error("❌ Update failed:", error);
  process.exit(1);
});
