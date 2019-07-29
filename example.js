const fs = require('fs');
const PNGDiff = require('./pngDiff');

const toParse = [
  ['samples/1.png', 'samples/2.png', 'samples/diff1.png', 50, 50],
  ['samples/image1.png', 'samples/image2.png', 'samples/diff2.png', 50, 50],
]

for (const [file1, file2, output, x, y] of toParse) {
  fs.writeFileSync(output, PNGDiff.getBoundedDiffImage(
    fs.readFileSync(file1), 
    fs.readFileSync(file2),
    x,
    y
  ));
}
