const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');

async function createBarcode(text) {
  return new Promise((resolve, reject) => {
    console.log('Creating QR code from text:', text);
    bwipjs.toBuffer({
      bcid: 'qrcode',       // Barcode type
      text: text,    // Text to encode
      scale: 3,               // 3x scaling factor
      // height:      10,              // Bar height, in millimeters
      includetext: false,            // Show human-readable text
      textxalign: 'center',        // Always good to set this
    }, async (err, png) => {
      if (err) {
        // `err` may be a string or Error object
        console.error(err);
      } else {
        console.log(png);
        // png is a Buffer
        // png.length           : PNG file length
        // png.readUInt32BE(16) : PNG image width
        // png.readUInt32BE(20) : PNG image height
        const imageURL = await writeFile(png, text);
        return resolve(imageURL);
      }
    });
  })
}

function writeFile(pngBuffer, text) {
  return new Promise((resolve, reject) => {
    const filename = text.toLowerCase().replace(/[/\\:\!'"`\n\s]+/gi, '_');
    const fileURL = 'qr_codes/' + filename + '.png'
    fs.writeFile(fileURL, pngBuffer, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      return resolve(fileURL);
    });
  })

}

module.exports = function (app) {
  app.post('/api/generate-qr-code', async (req, res) => {
    console.log('Received data:', req.body);
    let imageURL = await createBarcode(req.body.text);
    // res.json({ "todo": "Implement json data" });
    // res.type('png');
    // image/png
    // res.sendFile(path.join(__dirname, "../qr_codes/qrcode.png"));
    res.json({ url: imageURL });
  });
};