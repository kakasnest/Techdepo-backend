import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import api from "./routes/api.js";
import connectToMongoDB from "./utils/database_related/databaseConnection.js";
import { startJobs } from "./utils/scheduler/scheduler.js";
// import { send } from "./utils/nodemailer.js";
// import { welcome } from "./templates/index.js";

connectToMongoDB();
startJobs();

const app = express();
const port = 5000;
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", api);
app.use((err, req, res, next) => {
  res.status(500).send({ message: "Something broke!" });
});

// send({
//   to: "vvzapgmp8z@blondemorkin.com",
//   subject: "Akarmi",
//   html: welcome({ username: "Test Béla" }),
// });

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
