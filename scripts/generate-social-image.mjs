import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Run with `node scripts/generate-social-image.mjs`. Reuses Next's image tooling.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const root = fileURLToPath(new URL("../", import.meta.url));
const width = 1200;
const height = 630;
// Screenshot composition generated with imagegen; prompt lives alongside the source.
const image = sharp(join(root, "artifacts/col-social-source.png"))
  .resize(width, height, { fit: "cover" }).grayscale().toColourspace("srgb");
await image.clone().png().toFile(join(root, "public/col-social.png"));
await image.jpeg({ quality: 94, chromaSubsampling: "4:4:4" }).toFile(join(root, "public/col-social-preview-v5.jpg"));

// Check the files that the shared metadata serves, including their declared size.
for (const file of ["col-social.png", "col-social-preview-v5.jpg"]) {
  const metadata = await sharp(join(root, "public", file)).metadata();
  assert.equal(metadata.width, width);
  assert.equal(metadata.height, height);
}
console.log("Generated and verified both 1200 × 630 social images.");
