const express = require('express')
import * as dotenv from 'dotenv'
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {mergePdfs} = require("./merge")
const app = express()
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    // console.log(req.files);
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    await res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data:req.files})
    // req.files is array of `pdfs` files
    // req.body will contain the text fields, if there were any
})

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})