import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

config();
const URI = process.env.db;

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

app.use(
  compression({ threshold: 0 }),
  sirv("static", { dev }),
  sapper.middleware()
);

(async () => {
  mongoose.connection.once("open", () => console.log("Connected to db"));
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app
    .listen(PORT, () => {
      console.log("Server running");
    })
    .on("error", (err) => {
      console.log(`Error: ${err}`);
    });
})();
