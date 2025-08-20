import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sizes = [480, 768, 1200, 1600];
const formats = ["webp", "avif"];

/** Dossiers sources */
const ILLUSTRATIONS_DIR = "public/illustrations";
const BACKGROUNDS_DIR   = "public/backgrounds";

/** Helpers */
function listPngs(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith(".png"))
    .map(f => path.join(dir, f));
}

async function makeVariants(filePath) {
  const ext = path.extname(filePath); // .png
  const base = filePath.slice(0, -ext.length); // /path/file

  const img = sharp(filePath).withMetadata();

  for (const width of sizes) {
    for (const format of formats) {
      const out = `${base}-${width}.${format}`;
      await img
        .resize({ width, withoutEnlargement: true })
        .toFormat(format, { quality: 70 })
        .toFile(out);
      console.log("✔", out);
    }
  }
}

async function run() {
  const illus = listPngs(ILLUSTRATIONS_DIR);
  for (const f of illus) {
    console.log("→ illustrations:", f);
    await makeVariants(f);
  }

  // Backgrounds : au minimum 1600 (tu peux rajouter 2560 si besoin)
  const bgs = listPngs(BACKGROUNDS_DIR);
  for (const f of bgs) {
    console.log("→ backgrounds:", f);
    const base = f.slice(0, -4);
    await sharp(f).resize({ width: 1600, withoutEnlargement: true }).toFormat("avif", { quality: 60 }).toFile(`${base}-1600.avif`);
    await sharp(f).resize({ width: 1600, withoutEnlargement: true }).toFormat("webp", { quality: 70 }).toFile(`${base}-1600.webp`);
    console.log("✔", `${base}-1600.{avif,webp}`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});