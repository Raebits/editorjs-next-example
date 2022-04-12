import { Request, NextFunction, Response } from 'express'
import sharp from 'sharp'
import path from 'path'
import moment from 'moment'

const fileNameMaker = (original: string, extension: string) => {
  const strippedString = original.toString().normalize("NFC").replace(/ /g, '-')
  return `${strippedString}-${moment().format('YYYY-MM-DD')}.${extension}`
}

const uploadController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    console.log(req.file)
    if(req?.file?.path === undefined){
      return res.status(400).json({
        message: 'no image uploaded'
      })
    }
    const newFileName = fileNameMaker(path.parse(req.file.originalname).name, 'webp')
    const result = await sharp(req?.file.path).resize(256, 256, {
      fit: sharp.fit.cover,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFormat('webp')
    .toFile(path.resolve(`./public/upload/${newFileName}`))

    // return res.status(201).json({ message: 'image uploaded', path: `http://localhost:6969/public/upload/${newFileName}` })
    return res.status(200).json({
      success: true,
      file: {
        url : `http://localhost:6969/public/upload/${newFileName}`,
        width: 256,
        height: 256,
        extension: 'webp'
          // ... and any additional fields you want to store, such as width, height, color, extension, etc
      }
    })
  }catch(error){
    console.error(error)
    return res.status(500).json({
      message: 'internal server error'
    })
  }
}

export default uploadController