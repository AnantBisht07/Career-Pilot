import multer from 'multer';

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");
// this file name will be same (check spelling).
// singleUpload ko attact krdo jaha jaha file upload ki functionality chahiye vha vha