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

const getPalettes = async(directory) => {
  const imageFiles = await getImagePaths(directory);
  let palette = await Promise.all(imageFiles.map(async file => {
    return await extractColors(file);
  }));
  return palette;
};

const mapData = async(sourceDirectory) => {
  const sourcePaths = fs.readdirSync(sourceDirectory, []);
  let data = await await Promise.all(sourcePaths.map(async sourcePath => {
    const folders = path.join(sourceDirectory, sourcePath);
    const name = sourcePath.substring(sourcePath.indexOf("-") + 1).trim();
    const palettes = await getPalettes(folders);
    return {name, id: sourcePath, palettes};
  }));
  return data;
};

const init = async() => {
  const json = JSON.stringify(await mapData(sourceFolder));
  fs.writeFileSync("./src/_data/data.json", json);
};

init();
