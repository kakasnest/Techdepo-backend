import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import api from "./routes/api.js";
import connectToMongoDB from "./utils/databaseConnection.js";
import { send } from "./utils/nodemailer.js";
import { welcome } from "./templates/index.js";

try {
  //Database connection setup
  connectToMongoDB();

  //App init
  const app = express();
  const port = 5000;

  //Middlewares
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/api", api);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  // send({
  //   to: "vvzapgmp8z@blondemorkin.com",
  //   subject: "Akarmi",
  //   html: welcome({ username: "Test Béla" }),
  // });

  //App listening
  app.listen(port, () => {
    console.log(`\nServer listening on http://localhost:${port}`);
  });
} catch (err) {
  console.error(err);
}
