const colorthief = require("colorthief");
const path = require("path");
const fs = require("fs");
const rgbhex = require("rgb-hex");

const sourceFolder = "./source-images/";
const defaultPaletteSize = 5;

const extractColors = async(dir, paletteSize) => {
  const rgbColors = await colorthief.getPalette(dir, paletteSize | defaultPaletteSize);
  const hexColors = rgbColors.map((color) => rgbhex(color.join()));
  return hexColors;
};

const getImagePaths = (directory) => {
  let imagePaths = [];
  const imageDirectory = fs.readdirSync(directory, []);
  imageDirectory.map(imagePath => {
    imagePaths.push(path.join(directory, imagePath));
  });
  return imagePaths;
};

const mapData = async(directory) => {
  const files = await getImagePaths(directory);
  let data = await Promise.all(files.map(async file => {
    let palette = await extractColors(file);
    file = path.basename(file, ".png");
    const name = file.substring(file.indexOf("-") + 1).trim();
    return {name, palette};
  }));
  return data;
};

const init = async() => {
  const json = JSON.stringify(await mapData(sourceFolder));
  fs.writeFileSync("./src/_data/data.json", json);
};

init();
