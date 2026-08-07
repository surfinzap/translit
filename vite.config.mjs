import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const currentYear = new Date().getFullYear();
const copyrightBanner = `/*!
 * Translit v${packageJson.version} (Rusyn transliteration)
 * Copyright 2014–${currentYear} Braňo Šandala (https://brano.me)
 *
 * app: https://tota.sk/translit
 * src: https://github.com/surfinzap/translit-rue
 *
 * Licensed under MIT (https://github.com/surfinzap/translit-rue/blob/main/LICENSE.txt)
 */`;

const addTopBanner = () => ({
  name: "add-top-banner",
  generateBundle(_options, bundle) {
    for (const chunk of Object.values(bundle)) {
      if (chunk.type === "chunk") {
        chunk.code = copyrightBanner + "\n" + chunk.code;
      }
    }
  },
});

export default defineConfig(() => {
  return {
    plugins: [addTopBanner()],
    build: {
      lib: {
        entry: resolve("src/translit.js"),
        name: "translit",
        formats: ["es", "cjs", "umd"],
        fileName: (format) =>
          format === "cjs" ? `translit.cjs` : `translit.${format}.js`,
      },
      outDir: "dist",
      minify: "oxc",
      sourcemap: false,
      emptyOutDir: true,
      target: ["es2020", "chrome80", "firefox78", "safari14", "edge88"],
    },
  };
});
