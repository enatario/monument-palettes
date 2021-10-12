# Monument Palettes
Color palettes from the [Monument Valley I] game.

**Palettes coming soon:**
* Forgotten Shores
* Ida's Dream
* Monument Valley II

## What's inside
This project uses [colorthief] to generate palettes from a set of images. This site runs using [11ty] and [Netlify]. The base template uses my own [11ty scaffold], which you are welcome to use for your own projects.

## Make your own palette site!
The guts of this project are very much extendable for your own palette site. Here's what you need to know:

### Prequisites
* [Node]
* A general understanding of [11ty]
* Probably some working knowledge of CSS (with [SCSS]), JS, and HTML (with [Nunjucks])

### Get started
* Clone this repo: `git clone git@github.com:enatario/monument-palettes.git`
* Pop into your cloned project: `cd monument-palettes`
* Install packages: `npm i`

### Run locally
* Run `npm start`
* View your project on`localhost:8080`

### Build
* Run `npm run build`
* Your project files will be available in `dist`
* The `netlify.toml` file provides [deploy instructions] if you'd like to publish to the web.

### Generate your own palettes
* Delete all of the images from `./source-images/` and put in your own images
* Run `node generate-palettes.js`
* View your json file in `./src/_data/data.json`

#### Tweak the output
* Change the number of colors generated per palette by changing the number on the `defaultPaletteSize` constant in `./generate-palettes.js`
  * The [colorthief API] will show you further optimizations you can make to adjust your palette output.
  * The function `cleanFileName` essentially gets the basename of my image file and also trims off the numbers in it so I can use it as a chapter name in my json. You may or may not need this. If you do, you'll wanna look into [RegEx] to clean up your file names (or use a javascript method to clean the name to your liking).
    * E.g. `source-images/02.1-The Garden.png` becomes `The Garden`
* Change the loops and general architecture of the page in `./src/index.njk`
* Change the overall styling of the page in `./src/css`

[Monument Valley I]: https://www.monumentvalleygame.com/mv1
[colorthief]: https://lokeshdhakar.com/projects/color-thief/
[11ty]: https://www.11ty.dev/
[Netlify]: https://www.netlify.com/
[11ty scaffold]: https://github.com/enatario/eleventy-base
[Node]: https://nodejs.org/
[SCSS]: https://sass-lang.com/
[Nunjucks]: https://mozilla.github.io/nunjucks/
[deploy instructions]: https://docs.netlify.com/cli/get-started/
[colorthief API]: https://lokeshdhakar.com/projects/color-thief/#api
[RegEx]: https://regexr.com/
