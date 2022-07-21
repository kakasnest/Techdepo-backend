import mongoose from "mongoose";

const {
  env: { URI, NODE_ENV: env, LOCAL_URI },
} = process;

const connect = async () => {
  if (env === "PRODUCTION") mongoose.connect(URI);
  else mongoose.connect(LOCAL_URI);

  mongoose.connection
    .once("open", async () => {
      console.log("Connected to MongoDB");
    })
    .on("error", (err) => {
      console.log(err);
    });
};

export default connect;
