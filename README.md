
# PDFDiff
Script get diff of images and mark this diff with rectangle

```
  fs.writeFileSync('samples/diff1.png', PNGDiff.getBoundedDiffImage(
    fs.readFileSync('samples/1.png'), 
    fs.readFileSync('samples/2.png'),
    50,
    50
  ));
```

or

```
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
  
  const bufferToSave = PNG.sync.write(pngInstance);
```

## Samples

| file1 | file2 | diff |
| --- | --- | --- |
| ![](samples/image1.png) | ![](samples/image2.png) | ![](samples/diff2.png) |
| ![](samples/1.png) | ![](samples/2.png) | ![](samples/diff1.png) |

## Dependencies
 - pngjs-draw
 - pngjs 
 - pixelmatch
