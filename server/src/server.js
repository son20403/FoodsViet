import express from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routes";
import connectDB from "./config/connectDB"
const cookieParser = require('cookie-parser');

// Somewhere in your server.js or main application file
require('dotenv').config()

const app = express()
const corsOptions = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Cho phép gửi cookies
    optionsSuccessStatus: 204,
    exposedHeaders: ['new-token']
}

app.use(cors(corsOptions));
app.use(cookieParser());
connectDB.connect()

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app)
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});