import DataUriParser from 'datauri/parser.js';   //DataUriParser: This is a class from the datauri package that helps convert files into Data URIs

import path from 'path'; // A built-in Node.js module used to handle and manipulate file paths.

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}


export default getDataUri;


// This utility function converts a file (such as an uploaded image or document) into a Data URI (Base64 encoded string), which is useful for storing files in a database or sending them via APIs without saving them to disk.