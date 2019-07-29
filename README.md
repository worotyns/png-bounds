
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

### Sample drawing
![Image1](samples/image1.png)
![Image2](samples/image2.png)
![Diff1](samples/diff2.png)

### Webshoot
![Image1](samples/1.png)
![Image2](samples/2.png)
![Diff1](samples/diff1.png)


## Dependencies
 - pngjs-draw
 - pngjs 
 - pixelmatch
