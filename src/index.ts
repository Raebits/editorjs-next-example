import express, { json, urlencoded } from 'express'
import multer from 'multer'
import cors from 'cors'
import { multerDiskConfig } from './constant'
import { uploadController } from './controller'

const PORT = 6969
const app = express()

const main = async () => {
  try{
    app.use(cors({ origin: '*' }))
    app.use(urlencoded({ extended: true }))
    app.use(json())
    app.use('/test', (req, res, next) => { return res.status(200).json({ message: 'hello world' }) })
    app.use('/public', express.static('public'))
    app.post('/upload', multer({ storage: multerDiskConfig }).single('image') , uploadController)
    app.listen(PORT)
    console.log(`server ready at ${PORT}`)
  }catch(error){
    console.error(error)
  }
}

(main)()