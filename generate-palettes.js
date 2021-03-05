const colorthief = require("colorthief");
const fs = require("fs");
const path = require("path");
const rgbhex = require("rgb-hex");

const folder = "./source-images/";
const paletteSize = 5;

fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    const img = (path.join(folder, file));
    colorthief.getPalette(img, paletteSize)
      .then(colors => {
        colors.forEach(color => {
          const palette = color.join();
          console.log(file, rgbhex(palette));
        });
      })
      .catch(err => { console.log(err);});
  });
});


