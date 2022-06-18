import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

import { db } from "./api/config/database.js";
import { router } from "./routes/route.js";
import { viewRouter } from "./routes/viewRoutes.js";
import { Users, Workspace } from "./api/models/userModel.js";

app.set('view engine', 'ejs');
app.use(express.static('public'));

const checkDB = async () => {
    try{
        await db.authenticate();
        console.log('Database Connected...');
        //await Users.sync();
        //await Workspace.sync();
    }catch (error){
        console.error(error);
    }
};
checkDB();

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", router);
app.use("/", viewRouter);

app.listen(port, () => console.log('Server running at port ' + port));