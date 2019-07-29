
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

## Samples

| file1 | file2 | diff |
| --- | --- | --- |
| ![](samples/image1.png) | ![](samples/image2.png) | ![](samples/diff2.png) |
| ![](samples/1.png) | ![](samples/2.png) | ![](samples/diff1.png) |

## Dependencies
 - pngjs-draw
 - pngjs 
 - pixelmatch
