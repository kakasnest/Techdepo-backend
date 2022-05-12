import express from "express";
import "dotenv/config";
import { api } from "./routes/index.js";
import MongoConnect from "./utils/DBConnection.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

//Database connection setup
MongoConnect();

//App init
const app = express();
const port = 5000;

//Middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/api", api);

//App listening
app.listen(port, () => {
  console.log(`\nServer listening on http://localhost:${port}`);
});
