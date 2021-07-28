import * as dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import fileUpload  from "express-fileupload";
import passport from "passport";
import userRouter from '../routes/user.routes';
import clientRouter from '../routes/client.routes';
import commonRouter from '../routes/comman.routes';
import jobRouter from '../routes/job.routes';
require('../routes/passport');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(logger('dev'));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',commonRouter)
app.use('/user',userRouter)
app.use('/client',clientRouter)
app.use('/job',jobRouter)
app.listen(3000, () => {
    console.log(`Listening on port ${"PORT"}`);
});