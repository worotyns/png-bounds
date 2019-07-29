const Drawing = require('pngjs-draw');
const PNG = Drawing(require('pngjs').PNG);
const pixelmatch = require('pixelmatch');

/**
 * Helper class for generating rectangle on diff pixels
 * @constructor
 */
class PNGDiff {

  /**
   * @param {Buffer} file1 
   * @param {Buffer} file2 
   * @param {*} x 
   * @param {*} y 
   */
  static getBoundedDiffImage(file1, file2, x, y) {
    const original = PNG.sync.read(file1);
    const edited = PNG.sync.read(file2);
    
    const {width, height} = original;
    const pngInstance = new PNG({width, height});
    
    pixelmatch(original.data, edited.data, pngInstance.data, width, height, {threshold: 0.01, alpha: 0.1, includeAA: false});
    
    const boundList = new PNGDiff({
      png: pngInstance, 
      boxWidth: x, 
      boxHeight: y,
    });
    
    const bounds = boundList.parse().getResults();
    
    pngInstance.data = edited.data;
    
    for (const rect of bounds) {
      pngInstance.fillRect(rect.xmin, rect.ymin, (rect.xmax-rect.xmin), (rect.ymax-rect.ymin), pngInstance.colors.red(50))
    }
    
    return PNG.sync.write(pngInstance);
  }

  static prepareMatrix({mainWidth, mainHeight, boxWidth, boxHeight}) {
    const countHeight = Math.ceil(mainHeight / boxHeight);
    const countWidth = Math.ceil(mainWidth / boxWidth);

    return JSON.parse(JSON.stringify(Array.from(new Array(countWidth)).fill(Array.from(new Array(countHeight).fill(null)))));
  }

  constructor({png, boxWidth, boxHeight}) {
    this.matrix = PNGDiff.prepareMatrix({mainWidth: png.width, mainHeight: png.height, boxWidth, boxHeight});
    
    this.png = png;

    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;
  }

  /**
   * Method reads all diff pixels then get each-red-like
   * And append to grouping method [x, y] position of this pixel
   */
  parse() {
    let x = -1, y = -1
    for (let i = 0; i < this.png.data.length; i+=4) {
      x++;

      if ((i/4) % this.png.width === 0) {
        y++;
        x = 0;
      }
    
      if (this.png.data[i+2] === 0) {
        this.appendByXY(x, y);
      }
    }

    return this;
  }

  appendByXY(x, y) {
    const {boxWidth, boxHeight} = this;
    const xIdx = Math.floor(x / boxWidth);
    const yIdx = Math.floor(y / boxHeight);

    try {
      this.matrix[xIdx][yIdx] = true;
    } catch(error) {
      console.error({
        xLength: this.matrix.length, 
        yLength: this.matrix[0].length, 
        x, 
        y, 
        xIdx, 
        yIdx, 
        message: error.message
      })
    }
  }

  getResults() {
    const pairs = [];
    for (const x in this.matrix) {
      for (const y in this.matrix[x]) {
        if (this.matrix[x][y]) {
          pairs.push({
            xmin: ~~x  * this.boxWidth, 
            xmax: (~~x + 1) * this.boxWidth, 
            ymin: ~~y * this.boxHeight, 
            ymax: (~~y + 1) * this.boxHeight
          });
        }
      }
    }
    return pairs
  }
}

module.exports = PNGDiff;