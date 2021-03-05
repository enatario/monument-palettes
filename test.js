const colorthief = require("colorthief");
const { resolve } = require("path");
const rgbhex = require("rgb-hex");

const img = resolve(process.cwd(), "./source-images/test.jpg");
const paletteSize = 5;

colorthief.getPalette(img, paletteSize)
  .then(colors => {
    colors.forEach(color => {
      const palette = color.join();
      console.log(rgbhex(palette));
    });
  })
  .catch(err => { console.log(err);});
