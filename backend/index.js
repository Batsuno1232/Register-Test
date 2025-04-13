import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

/*CONNECTION*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.__dirname(__filename);
dotenv.config();

const app = express();

// app.use(express.json()); ใช้งานได้เหมือนกับ bodyparser.json()
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan());
app.use(cors());
const buildPath = path.join(__dirname,'build');
app.use(express.static());

/*FILE STORAGE*/
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"build/assets");
    },
    filename: (req, file, cb) =>{
        cb(null,file.originalname);
    },

});

const upload = multer({storage});