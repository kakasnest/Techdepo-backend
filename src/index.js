import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import api from "./routes/api.js";
import connectToMongo from "./utils/databaseConnection.js";

//Database connection setup
connectToMongo();

//App init
const app = express();
const port = 5000;

//Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", api);

//App listening
app.listen(port, () => {
  console.log(`\nServer listening on http://localhost:${port}`);
});

//TODO: Routes -> sort
//TODO: Destructure controllers
//TODO: Add queryparams to Model.find()
