const  fs   = require('fs-extra');
exports.deletePoster = function  (oldPosterName) {
    const prePathDelete = './public/images' + oldPosterName;
    try {
        fs.unlinkSync(prePathDelete);
      } catch (err) {
          console.log('deleting is failed')
        // handle the error
      }
  }