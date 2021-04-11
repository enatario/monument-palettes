const colorthief = require("colorthief");
const path = require("path");
const fs = require("fs");
const rgbhex = require("rgb-hex");

const sourceFolder = "./source-images/";
const defaultPaletteSize = 5;

const extractColors = async(image, paletteSize) => {
  try {
    const rgbColors = await colorthief.getPalette(image, paletteSize | defaultPaletteSize);
    const hexColors = rgbColors.map((color) => rgbhex(color.join()));
    return hexColors;
  } catch (e) {
    console.error(`${image} is not a valid image type`);
  }
};

const getImagePaths = (directory) => {
  let imagePaths = [];
  const imageDirectory = fs.readdirSync(directory, []);
  imageDirectory.map(imagePath => {
    imagePaths.push(path.join(directory, imagePath));
  });
  return imagePaths;
};

const cleanFileName = (file) => {
  return file.replace(/^.*-|\.[^.]*$/g, "");
};

const mapData = async(directory) => {
  const files = await getImagePaths(directory);
  let data = await Promise.all(files.map(async file => {
    const palette = await extractColors(file);
    const name = cleanFileName(file);
    return {name, palette};
  }));
  return data;
};

const init = async() => {
  const json = JSON.stringify(await mapData(sourceFolder));
  try {
    fs.writeFileSync("./src/_data/data.json", json);
    console.log("data.json is now available");
  } catch (e) {
    console.error(e);
  }
};

init();
