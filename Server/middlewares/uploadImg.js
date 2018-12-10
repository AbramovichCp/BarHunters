const multer = require('multer');
const moment = require('moment');

//  set root folder
const storage = multer.diskStorage({ 
  destination(req, file, cb){
    cb(null, 'public/images');
  },
  filename(req, file, cb){ 
    function generateFileName(file) {
      const date = moment().format('DDMMYYYY-HHmmss_SSS');
      const fileType = file.mimetype.split('/');
      const fileName = file.originalname.split('.');
      return `${fileName[0]}-${date}.${fileType[1]}`
    } 
    const fileName = generateFileName(file);
    cb(null, fileName);
  }
});

// checking file type 
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// max size photo
const limits = {
  fileSize: 4024 * 3024 * 5
}

module.exports = multer({storage, fileFilter, limits });