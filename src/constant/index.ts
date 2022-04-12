import { diskStorage } from 'multer'
import path from 'path'

export const multerDiskConfig = diskStorage({
  destination: path.resolve('./public/tmp'),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
})