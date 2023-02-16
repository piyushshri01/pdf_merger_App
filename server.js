import express from "express"
import { config } from "dotenv";
import path from "path"
import multer from "multer"
const upload = multer({ dest: 'uploads/' })
import {mergePdfs} from "./merge.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({
  path: "./config/config.env",
});

const app = express()
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    // console.log(req.files);
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    await res.redirect(`http://localhost:${process.env.PORT}/static/${d}.pdf`)
    // res.send({data:req.files})
    // req.files is array of `pdfs` files
    // req.body will contain the text fields, if there were any
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})