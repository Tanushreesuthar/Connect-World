import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/*configuration middleware*/
const __filename=fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app= express();
//sare middleware invoke kar rahe ahi taki use kar sake aage applications m 
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb" , extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb" , extended:"true"}));
app.use(cors());
app.use("/assets" ,express.static(path.join(__dirname , 'public/assets'))); //set the directory where we will store aur images

/* FILE STORAGE */
//when anyone upload anny file or any photo then it will be uploded here in public/assets destination 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  //that will help us in saving 


  /* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);  //upload.single("picture") this the middleware functionlities that will run before it hits that endpoints register  //basically this function  register are called as controllers  basically this is the logic at the end point
app.post("/posts", verifyToken, upload.single("picture"), createPost);



/* ROUTES */
app.use("/auth", authRoutes); //keep our file organise and clean 
app.use("/users", userRoutes); //koi bhi user p click karo to uksi sari info milni chaiye na hume 
app.use("/posts", postRoutes);

  /* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`)); 