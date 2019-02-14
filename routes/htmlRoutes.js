var path = require("path");

module.exports = function (app) {

  // app.get("/script.js", function (req, res) {
  //   console.log('Sending script...');
  //   res.sendFile(path.join(__dirname, "../public/script.js"));
  // });

  // If no matching route is found default to home
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};
