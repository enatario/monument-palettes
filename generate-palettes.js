const colorthief = require("colorthief");
const fs = require("fs");
const path = require("path");
const rgbhex = require("rgb-hex");

const folder = "./source-images/";
const filePaths = fs.readdirSync(folder, []);
const defaultPaletteSize = 5;

const extractColors = async(dir, paletteSize) => {
  const rgbColors = await colorthief.getPalette(dir, paletteSize | defaultPaletteSize);
  const hexColors = rgbColors.map((color) => rgbhex(color.join()));
  return hexColors;
};

const paths = () => {
  let files = [];
  filePaths.map(file => {
    const imgPath = (path.join(folder, file));
    files.push(imgPath);
  });
  return files;
};

const mapData = async() => {
  const files = await paths();
  let data = await Promise.all(files.map(async file => {
    let palette = await extractColors(file);
    file = path.basename(file, ".jpg");
    let obj = {id: file, colors: palette};
    return obj;
  }));
  return data;
};

const init = async() => {
  let json = JSON.stringify(await mapData());
  fs.writeFileSync("./src/_data/palettes.json", json);
};

init();


