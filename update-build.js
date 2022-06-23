const fs = require("fs");
const filePath = "./src/configuration.json";

const configJson = JSON.parse(fs.readFileSync(filePath).toString());
configJson.buildDate = new Date().getTime();

fs.writeFileSync(filePath, JSON.stringify(configJson, null, 2));

const jsonData = {
  buildDate: configJson.buildDate,
};

const jsonContent = JSON.stringify(jsonData);

fs.writeFile("./public/meta.json", jsonContent, "utf8", function (error) {
  if (error) {
    console.log("An error occured while saving build date and time to meta.json");
    return console.log(error);
  }

  console.log("Latest build date and time updated in meta.json file");
});
