import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes/api.js";

//Database connection setup
const { DB_NAME, DB_PASSWORD, DB_USER, PORT } = process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@webshop.l9zio.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const connectToDB = async () => {
  mongoose.connect(uri);

  mongoose.connection
    .once("open", async () => {
      console.log("Connected to MongoDB");
    })
    .on("error", (err) => {
      console.log(err);
    });
};
connectToDB();

//App setup
const app = express();
const port = PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api", router);
app.listen(port, () => {
  console.log(`\nServer listening on http://localhost:${port}`);
});
