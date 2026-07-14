import { readFile } from "node:fs/promises";
import path from "node:path";

const files = [
  "src/constants/reviews.ts",
  "src/constants/achievements.ts",
  "src/constants/site.ts",
  "README.md",
];

const bannedPhrases = [
  "fortune 500",
  "global offices",
  "award-winning",
  "10,000+ clients",
  "millions in revenue",
];

const violations = [];

for (const file of files) {
  const contents = await readFile(path.resolve(file), "utf8");
  for (const phrase of bannedPhrases) {
    if (contents.toLowerCase().includes(phrase)) {
      violations.push(`${file}: contains banned phrase "${phrase}"`);
    }
  }
}

if (violations.length > 0) {
  console.error("Content validation failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
