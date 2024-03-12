const { codegen } = require("swagger-axios-codegen");

console.log("WELL");
codegen({
  remoteUrl: "https://api.comabooks.org/api_json",
  outputDir: "./src/generated",
  useStaticMethod: true,
});
