const { codegen } = require("swagger-axios-codegen");

codegen({
  remoteUrl: "http://192.168.100.150:3000/api_json",
  outputDir: "./src/generated",
  useStaticMethod: true,
});
