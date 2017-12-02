"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeBase64AndReturnUrl = writeBase64AndReturnUrl;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeBase64AndReturnUrl(base64String, name, req) {

  var mimeType = base64MimeType(base64String);
  var extension = mimeType.split("/")[1];

  var base64Data = base64String.split(';base64,').pop();

  var appUrl = req.protocol + '://' + req.get('host');
  var fileName = name + "." + extension;

  _fs2.default.writeFile(__dirname + "/../uploads/" + fileName, base64Data, { encoding: 'base64' }, function (err) {
    console.log('File created ' + err);
  });

  return appUrl + "/uploads/" + fileName;
}

function base64MimeType(encoded) {
  var result = null;

  if (typeof encoded !== 'string') {
    return result;
  }

  var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}
//# sourceMappingURL=index.js.map