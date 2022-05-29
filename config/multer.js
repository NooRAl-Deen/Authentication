const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, './public/uploads/images')
    },
    filename: (req, file, done) => {
        done(null, "image" + Date.now() + '.' + file.originalname.split('.')[1])
    }
})


const upload = multer({
    storage: storage
})

module.exports = upload;
