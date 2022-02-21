const fs = require("fs");
const cloudformationSchema = require("@serverless/utils/cloudformation-schema");
const esbuild = require("esbuild");
const yaml = require("js-yaml");
const rimraf = require("rimraf");
const SERVERLESS_YML_PATH = "./serverless.yml";
const OUT_DIR = "./dist";

const ESBUILD_CONFIG = {
  bundle: true,
  external: ["aws-sdk"],
  format: "cjs",
  legalComments: "none",
  minify: true,
  platform: "node",
  outbase: "src",
  outdir: OUT_DIR,
};

async function getConfig() {
  return yaml.loadAll(fs.readFileSync(SERVERLESS_YML_PATH), {
    schema: cloudformationSchema,
  })[0];
}

(async function main() {
  rimraf.sync(OUT_DIR);

  const { functions, provider } = await getConfig();

  const handlers = Object.entries(functions)
    .map(([, fn]) => fn.handler.replace("dist/", "src/"))
    .map((fn) => {
      const parts = fn.split(".");
      const path = parts.slice(0, parts.length - 1).join(".");
      return fs.existsSync(path + ".ts") ? path + ".ts" : path + ".js";
    });

  console.info("🤖 Building Handlers 🤖");

  await esbuild
    .build({
      ...ESBUILD_CONFIG,
      entryPoints: handlers,
      target: provider.runtime
        ? "node" + provider.runtime.match(/\d+/g)[0]
        : "node14",
    })
    .catch(() => process.exit(1));

  handlers.map((handler) => {
    const bundlePath = handler.replace(".ts", ".js").replace("src/", "dist/");
    const stat = fs.statSync(bundlePath);
    console.log(
      bundlePath,
      "-",
      +(stat.size / 1024 / 1024).toPrecision(3),
      "MB"
    );
  });
})();
