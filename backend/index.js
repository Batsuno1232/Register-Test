import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import Users from "./models/Users.js";
import authRoutes from './routes/auth.js';
import { register } from "./controllers/auth.js";

/*CONNECTION*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// app.use(express.json()); ใช้งานได้เหมือนกับ bodyparser.json()
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan());
app.use(cors());
// const buildPath = path.join(__dirname,'build/assets');
app.use("/assets", express.static(path.join(__dirname, "build/assets")));

/*FILE STORAGE*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "build/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
const upload = multer({ storage });
/* ROUTE WITH FIELS */
app.post("/auth/register", upload.single("picture"), register);
/*ROUTE*/
app.use("/auth", authRoutes);
/*MONGO DB SETUP*/
const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
    Users.find({}, { firstName: 1, location: 1 }).then(console.log);
  })
  .catch((error) => console.log(`${error} did not connect`));
