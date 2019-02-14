const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');
const MAX_FILENAME_LENGTH = 36; // not including extension

async function createBarcode(text, barcodeType) {
  return new Promise((resolve, reject) => {
    console.log('Creating QR code from text:', text);
    bwipjs.toBuffer({
      bcid: barcodeType,       // Barcode type - qrcode is default
      text: text,    // Text to encode
      scale: 3,               // 3x scaling factor
      // height:      10,              // Bar height, in millimeters
      includetext: true,            // Show human-readable text - does this work?
      textxalign: 'center',        // Always good to set this
    }, async (err, png) => {
      if (err) {
        // `err` may be a string or Error object
        console.error(err); // todo: add error handling display on the client side
        return reject();
      } else {
        // console.log(png);
        // png is a Buffer
        // png.length           : PNG file length
        // png.readUInt32BE(16) : PNG image width
        // png.readUInt32BE(20) : PNG image height
        const imageURL = await writeFile(png, text, barcodeType);
        return resolve(imageURL);
      }
    });
  })
}

function writeFile(pngBuffer, text, barcodeType) {
  return new Promise((resolve, reject) => {
    const filename = barcodeType + '-' + text.toLowerCase().replace(/[\s]+/gi, '_').replace(/[^\w]+/gi, '-').substring(0, MAX_FILENAME_LENGTH);
    const fileURL = path.join('qr_codes', filename + '.png');
    fs.writeFile(fileURL, pngBuffer, (err) => {
      if (err) {
        console.error(err);
        return reject();
      }
      console.log("The file was saved!");
      return resolve(fileURL);
    });
  });
}

module.exports = app => {
  app.post('/api/generate-qr-code', async (req, res) => {
    console.log('Received data:', req.body);
    let imageURL = await createBarcode(req.body.text, req.body.type);
    // res.sendFile(path.join(__dirname, "../qr_codes/qrcode.png"));
    res.json({ url: imageURL });
  });
};