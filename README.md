# Server
This is a server app to handle image uploads from editor js image plugin

## Installation
clone this repository (clone this specific branch for the server)
```bash
git clone --single-branch --branch server https://github.com/Raebits/editorjs-next-example.git
```
install the node_modules
```bash
yarn install
#or
npm i
```

## Directories
All uploaded image will be on `public/tmp` and the processed image will be on `public/upload`

## Endpoints
Upload endpoints will be on `/upload` with method `POST`
Image results will be on `/public/upload/${FILE_NAME}`

## Response
On success file upload the response status will be according to [editorjs-image-spec](https://github.com/editor-js/image#server-format)
  ```json
  success: true,
  file: {
    url : "http://localhost:6969/public/upload/${FILE_NAME}",
    width: 256,
    height: 256,
    extension: 'webp'
      // ... and any additional fields you want to store, such as width, height, color, extension, etc
  }
  ```