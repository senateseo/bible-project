import fs from "fs-extra";
import esbuild from "esbuild";
import postcssPlugin from "esbuild-style-plugin";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import * as dotenv from "dotenv";
import archiver from "archiver";

dotenv.config();

const outdir = "build";

async function deleteOldDir() {
  await fs.remove(outdir);
}

async function runEsBuild() {
  await esbuild.build({
    entryPoints: ["src/index.jsx"],
    bundle: true,
    outdir: outdir,
    treeShaking: true,
    minify: true,
    legalComments: "none",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsx: "automatic",
    loader: {
      ".png": "dataurl",
    },
    plugins: [
      postcssPlugin({
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
      }),
    ],
  });
}

async function zipFolder(dir) {
  const output = fs.createWriteStream(`${dir}.zip`);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.pipe(output);
  archive.directory(dir, false);
  await archive.finalize();
}

async function copyFiles(entryPoints, targetDir) {
  await fs.ensureDir(targetDir);
  await Promise.all(
    entryPoints.map(async (entryPoint) => {
      await fs.copy(entryPoint.src, `${targetDir}/${entryPoint.dst}`);
    })
  );
}

async function build() {
  await deleteOldDir();
  await runEsBuild();

  const commonFiles = [
    { src: "build/index.js", dst: "index.js" },
    { src: "src/index.html", dst: "index.html" },
    { src: "build/index.css", dst: "index.css" },
    { src: "src/_locales", dst: "_locales" },
    { src: "src/locales", dst: "locales" },
    { src: "src/assets", dst: "assets" },
  ];

  // chromium
  await copyFiles(
    [...commonFiles, { src: "src/manifest.json", dst: "manifest.json" }],
    `./${outdir}/chromium`
  );

  await zipFolder(`./${outdir}/chromium`);

  console.log("Build success.");
}

build();
