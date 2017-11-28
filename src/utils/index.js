
import fs from "fs";
import url from "url" ;


export function writeBase64AndReturnUrl(base64String,name,req) {
    
    let mimeType = base64MimeType(base64String) ;
    let extension = mimeType.split("/")[1] ;

    
    let base64Data = base64String.split(';base64,').pop();

    let appUrl = req.protocol + '://' + req.get('host') ;
    let fileName = name+"."+extension ;

    fs.writeFile(__dirname +"/../uploads/"+fileName, base64Data, { encoding: 'base64' }, function (err) {
        console.log('File created '+err);
    });

    return appUrl + "/uploads/"+fileName ;
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