import express from "express";
import "dotenv/config";
import router from "./routes/api.js";
import Mongo_connect from "./utils/db_conn.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";

//Database connection setup
Mongo_connect();

//App init
const app = express();
const port = 5000;

//Middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

//App listening
app.listen(port, () => {
  console.log(`\nServer listening on http://localhost:${port}`);
});
