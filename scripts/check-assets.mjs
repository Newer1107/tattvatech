import { access } from "node:fs/promises";
import path from "node:path";

const requiredFiles = [
  "public/brand/tattvatech-logo.png",
  "public/brand/tattvatech-symbol.png",
  "public/brand/favicon.ico",
  "src/app/favicon.ico",
];

const missing = [];

for (const file of requiredFiles) {
  try {
    await access(path.resolve(file));
  } catch {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error("Missing required assets:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("Asset check passed.");
