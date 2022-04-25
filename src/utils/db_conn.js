import mongoose from "mongoose";

const {
  env: { URI },
} = process;

const connect = async () => {
  mongoose.connect(URI);

  mongoose.connection
    .once("open", async () => {
      console.log("Connected to MongoDB");
    })
    .on("error", (err) => {
      console.log(err);
    });
};

export default connect;
